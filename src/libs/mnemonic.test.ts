import { Mnemonic } from './mnemonic';
import { randomBytes } from 'crypto';
import { invalidFromBase58, invalidFromSeed, mnemonicFixtures } from '../test/fixtures/mnemonic.fixtures';
import { fromBase58, fromSeed } from 'bip32';

export const getRandomValues = (array: Uint8Array) => {
  if (!(array instanceof Uint8Array)) {
    throw new TypeError('expected Uint8Array');
  }
  const bytes = randomBytes(array.length);
  array.set(bytes);
  return array;
};

describe('Mnemonic', () => {
  describe('toEntropy', () => {
    for (const fixture of mnemonicFixtures) {

      it(`should return a correct random entropy with ${fixture.numbOfWords} words`, () => {
        expect(fixture.entropy).toEqual(Mnemonic.toEntropy(fixture.randomValue));
      });
    }
  });

  describe('toMnemonic', () => {
    for (const fixture of mnemonicFixtures) {
      it(`should return ${fixture.numbOfWords} words in the phrase`, () => {
        const phrase = Mnemonic.toMnemonic(fixture.randomValue);
        expect(phrase.split(' ').length).toEqual(fixture.numbOfWords);
      });

      it(`should parse the random value ${fixture.randomValue}, equal to the expected phrase`, () => {
        const phrase = Mnemonic.toMnemonic(fixture.randomValue);
        expect(phrase).toEqual(fixture.phrase);
      });
    }
  });

  describe('toSeed', () => {
    for (const fixture of mnemonicFixtures) {
      it(`can convert phrase ${fixture.phrase} to seed, and equal to expected restored seed`, () => {
        const seed = Mnemonic.toSeed(fixture.phrase);
        const rootKey = fromSeed(seed);
        const restored = fromBase58(fixture.rootKey);

        expect(rootKey.toWIF()).toEqual(restored.toWIF());
      });
    }
  });

  describe('toBip32RootKey', () => {
    for (const fixture of mnemonicFixtures) {
      it(`can convert phrase ${fixture.phrase} to root key, and equal to expected root key`, () => {
        const seed = Mnemonic.toSeed(fixture.phrase);
        const rootKey = Mnemonic.toBip32RootKey(seed);

        expect(rootKey.toBase58()).toEqual(fixture.rootKey);
      });
    }

    invalidFromSeed.forEach(o => {
      it(`should throw proper exception for invalid seed ${o.seed}`, () => {
        try {
          Mnemonic.toBip32RootKey(Buffer.from(o.seed, 'hex'));
        } catch (error) {
          expect(error.message).toEqual(o.exception);
        }
      });
    })
  });

  describe('getDerivationPath', () => {
    it('should return the expected derivation path', () => {
      expect(Mnemonic.getDerivationPath(32, 1, 0, 0)).toEqual('m/32\'/1\'/0\'/0');
    });
  });

  describe('getBip44DerivationPath', () => {
    it('should return the expected derivation path', () => {
      expect(Mnemonic.getBip44DerivationPath(32, 1, 0)).toEqual('m/32\'/1\'/0\'');
    });
  });

  describe('stringToBip32RootKey', () => {
    invalidFromBase58.forEach(o => {
      it(`should throw proper exception for invalid base58 ${o.string}`, () => {
        try {
          Mnemonic.stringToBip32RootKey(o.string);
        } catch (error) {
          expect(error.message).toEqual(o.exception);
        }
      });
    })
  });

  describe('getBip32ExtendedKey', () => {
    it('should return the expected extended key', () => {
      for (const fixture of mnemonicFixtures) {
        const rootKey = fromBase58(fixture.rootKey);
        const extendedKey = Mnemonic.getExtendedKey(fixture.path, rootKey);
        const privateKey = extendedKey?.toBase58();
        const publicKey = extendedKey?.neutered().toBase58();
        expect(privateKey).toEqual(fixture.privateKey);
        expect(publicKey).toEqual(fixture.publicKey);
      }
    });

    it('should throw exception when rootKey is empty', () => {
      expect(() => {
        Mnemonic.getExtendedKey(
          'm/0/2147483647\'/1/2147483646\'/2',
          null as never,
        )
      }).toThrow('A root key is required.');
    });
  });
});
