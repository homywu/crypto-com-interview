import * as sjcl from 'sjcl';
import { wordListEnglish } from './english-word-list';

export class Mnemonic {
  static toMnemonic(byteArray: Uint8Array) {
    if (byteArray.length % 4 > 0) {
      throw 'Data length in bits should be divisible by 32, but it is not (' + byteArray.length + ' bytes = ' + byteArray.length * 8 + ' bits).'
    }
    const data = Mnemonic.byteArrayToWordArray(byteArray);

    const hash = sjcl.hash.sha256.hash(data);
    const hex = sjcl.codec.hex.fromBits(hash);

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
    for (var i = 0; i < byteArray.length; i++) {
      var h = byteArray[i].toString(16);
      while (h.length < 2) {
        h = '0' + h;
      }
      s = s + h;
    }
    return s;
  }

  static byteArrayToWordArray(data: Uint8Array) {
    var wordArray = [];
    for (var i = 0; i < data.length / 4; i++) {
      let v = 0;
      v += data[i * 4 + 0] << 8 * 3;
      v += data[i * 4 + 1] << 8 * 2;
      v += data[i * 4 + 2] << 8 * 1;
      v += data[i * 4 + 3] << 8 * 0;
      wordArray.push(v);
    }
    return wordArray;
  }

  static byteArrayToBinaryString(data: Uint8Array) {
    var bin = '';
    for (var i = 0; i < data.length; i++) {
      bin += Mnemonic.zfill(data[i].toString(2), 8);
    }
    return bin;
  }

  static hexStringToBinaryString(hex: string) {
    let binaryString = '';
    for (var i = 0; i < hex.length; i++) {
      binaryString += Mnemonic.zfill(parseInt(hex[i], 16).toString(2), 4);
    }
    return binaryString;
  }

  static zfill(source: string, length: number) {
    source = source.toString();
    while (source.length < length) {
      source = '0' + source;
    }
    return source;
  }
}