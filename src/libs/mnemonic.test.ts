import { Mnemonic } from './mnemonic';
import { randomBytes } from 'crypto';
import { mnemonicFixtures } from '../test/mnemonic.fixtures';

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

      it('should equal to the expected phrase', () => {
        const phrase = Mnemonic.toMnemonic(fixture.randomValue);
        expect(phrase).toEqual(fixture.phrase);
      });
    }
  });
});
