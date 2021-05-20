/* eslint-disable max-classes-per-file */
import { hash, codec } from 'sjcl';
import { closest } from 'fastest-levenshtein';
import { payments } from 'bitcoinjs-lib';
import { mnemonicToSeedSync } from 'bip39';
import { BIP32Interface, fromBase58, fromSeed } from 'bip32';

import { wordListEnglish } from './english-word-list';

// TODO: multisig
export class Mnemonic {
  static getRandomValues(numbOfWords: number) {
    const strength = numbOfWords / 3 * 32;
    const buffer = new Uint8Array(strength / 8);

    return crypto.getRandomValues(buffer);
  }

  static toMnemonic(byteArray: Uint8Array) {
    if (byteArray.length % 4 > 0) {
      throw new Error('Data length in bits should be divisible by 32, but it is not '
        + `(${byteArray.length} bytes = ${byteArray.length * 8} bits).`);
    }
    const data = Mnemonic.byteArrayToWordArray(byteArray);

    const hashedData = hash.sha256.hash(data);
    const hex = codec.hex.fromBits(hashedData);

    const binaryString = Mnemonic.byteArrayToBinaryString(byteArray);
    const c = Mnemonic.zfill(Mnemonic.hexStringToBinaryString(hex), 256);
    const d = c.substring(0, byteArray.length * 8 / 32);
    const b = binaryString + d;

    const result: string[] = [];
    const blen = b.length / 11;
    for (let i = 0; i < blen; i++) {
      const wordIdx = parseInt(b.substring(i * 11, (i + 1) * 11), 2);
      result.push(wordListEnglish[wordIdx]);
    }
    return result.join(' ');
  }

  static toEntropy(byteArray: Uint8Array) {
    let s = '';
    for (let i = 0; i < byteArray.length; i++) {
      let h = byteArray[i].toString(16);
      while (h.length < 2) {
        h = `0${h}`;
      }
      s += h;
    }
    return s;
  }

  static toSeed(phrase: string, passphrase = '') {
    return mnemonicToSeedSync(phrase, passphrase);
  }

  static toBip32RootKey(seed: Buffer) {
    return fromSeed(seed);
  }

  static stringToBip32RootKey(strRootKey: string) {
    return fromBase58(strRootKey);
  }

  static getDerivationPath(
    purpose = 44, coin = 0,
    account = 0, change = 0,
  ) {
    return `m/${purpose}'/${coin}'/${account}'/${change}`;
  }

  static getBip44DerivationPath(
    purpose = 44, coin = 0,
    account = 0,
  ) {
    return `m/${purpose}'/${coin}'/${account}'`;
  }

  // it can be replaced by bitcoin derivatePath
  static getBip32ExtendedKey(derivationPath: string, rootKey: BIP32Interface) {
    if (!rootKey) {
      throw new Error('A root key is required.');
    }
    let extendedKey: BIP32Interface | undefined = rootKey;

    const pathBits = derivationPath.split('/');
    for (const bit of pathBits) {
      const idx = Number(bit.replaceAll('\'', ''));
      if (isNaN(idx)) {
        continue;
      }
      const hardened = bit[bit.length - 1] === '\'';
      const isPrivate = !extendedKey?.isNeutered();
      const invalidPath = hardened && !isPrivate;
      if (invalidPath) {
        extendedKey = undefined;
      } else if (hardened) {
        extendedKey = extendedKey?.deriveHardened(idx);
      } else {
        extendedKey = extendedKey?.derive(idx);
      }
    }
    return extendedKey;
  }

  static getPaymentAddress(index: number, derivationPath: string, rootKey: BIP32Interface) {
    const addressDerivationPath = derivationPath + `/${index}`;
    const extendedKey = Mnemonic.getBip32ExtendedKey(addressDerivationPath, rootKey);
    return { payment: payments.p2pkh({ pubkey: extendedKey?.publicKey }), extendedKey };
  }

  static byteArrayToWordArray(data: Uint8Array) {
    const wordArray = [];
    for (let i = 0; i < data.length / 4; i++) {
      let wordSlot = 0;
      wordSlot += data[i * 4 + 0] << 8 * 3;
      wordSlot += data[i * 4 + 1] << 8 * 2;
      wordSlot += data[i * 4 + 2] << 8 * 1;
      wordSlot += data[i * 4 + 3] << 8 * 0;
      wordArray.push(wordSlot);
    }
    return wordArray;
  }

  static byteArrayToBinaryString(data: Uint8Array) {
    let bin = '';
    for (let i = 0; i < data.length; i++) {
      bin += Mnemonic.zfill(data[i].toString(2), 8);
    }
    return bin;
  }

  static hexStringToBinaryString(hex: string) {
    let binaryString = '';
    for (let i = 0; i < hex.length; i++) {
      binaryString += Mnemonic.zfill(parseInt(hex[i], 16).toString(2), 4);
    }
    return binaryString;
  }

  static binaryStringToWordArray(binaryStr: string) {
    const binaryLen = binaryStr.length / 32;
    const binaryArray = [];
    for (let i = 0; i < binaryLen; i++) {
      const valueStr = binaryStr.substring(0, 32);
      const value = parseInt(valueStr, 2);
      binaryArray.push(value);
      binaryStr = binaryStr.slice(32);
    }
    return binaryArray;
  }

  static zfill(source: string, length: number) {
    source = source.toString();
    while (source.length < length) {
      source = `0${source}`;
    }
    return source;
  }

  static validatePhrase(joinedWords: string) {
    // Preprocess the joinedWords
    joinedWords = joinedWords.normalize('NFKD');
    const splitWords = joinedWords.split(' ');
    // Detect blank phrase
    if (splitWords.length === 0) {
      return 'Blank mnemonic';
    }

    // Check words, if invalid return potential words
    for (const word of splitWords) {
      if (wordListEnglish.indexOf(word) === -1) {
        console.log(`Finding closest match to ${word}`);
        const nearestWord = closest(word, wordListEnglish);
        throw new Error(`${word} not in wordlist, did you mean ${nearestWord}?`);
      }
    }

    // Check the wordsArray are valid, a specific handle for japanese in real world, the japanese delimiter should be \u3000
    if (splitWords.length === 0 || splitWords.length % 3 > 0) {
      throw new Error(`the number of words in mnemonic is invalid, check here [${joinedWords}].`);
    }

    // revert the generate process to validate
    const binaryStrArray: string[] = [];
    for (const word of splitWords) {
      const wordIdx = wordListEnglish.indexOf(word);
      if (wordIdx === -1) {
        throw new Error(`the word [${word}] is not in the word list`);
      }
      const binaryStr = Mnemonic.zfill(wordIdx.toString(2), 11);
      binaryStrArray.push(binaryStr);
    }

    const joinedBinary = binaryStrArray.join('');
    const binaryLength = joinedBinary.length;
    const binaryStr = joinedBinary.substring(0, binaryLength / 33 * 32);
    const binaryChecksumStr = joinedBinary.substring(binaryLength - binaryLength / 33, binaryLength);
    const binaryArray = Mnemonic.binaryStringToWordArray(binaryStr);
    const hashedBinary = hash.sha256.hash(binaryArray);
    const hexBinary = codec.hex.fromBits(hashedBinary);
    const ndBstr = Mnemonic.zfill(Mnemonic.hexStringToBinaryString(hexBinary), 256);
    const nh = ndBstr.substring(0, binaryLength / 33);

    if (binaryChecksumStr !== nh) {
      throw new Error(`the mnemonic is invalid, binaryChecksumStr [${binaryChecksumStr}], nh [${nh}]`);
    }
  }

  static validateDerivationPath(derivationPath: string, rootKey?: BIP32Interface) {
    if (!rootKey) {
      throw new Error('root key cannot be empty.');
    }
    if (derivationPath.includes('\'') && rootKey.isNeutered()) {
      throw new Error('Hardened derivation path is invalid with xpub key');
    }
  }

}
