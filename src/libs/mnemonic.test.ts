import { Mnemonic } from './mnemonic';
import { randomBytes } from 'crypto';
import { mnemonicFixtures } from '../test/fixtures/mnemonic.fixtures';
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
  });

  describe('getDerivationPath', () => {
    it('should return the expectd derivation path', () => {
      expect(Mnemonic.getDerivationPath(32, 1, 0, 0)).toEqual('m/32\'/1\'/0\'/0');
    });
  });

  describe('getDerivationPath', () => {
    it('should return the expectd derivation path', () => {
      expect(Mnemonic.getBip44DerivationPath(32, 1, 0)).toEqual('m/32\'/1\'/0\'');
    });
  });

});
