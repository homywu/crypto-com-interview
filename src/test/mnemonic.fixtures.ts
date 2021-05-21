export interface IMnemonicFixture {
  numbOfWords: number,
  randomValue: Uint8Array,
  entropy: string,
  phrase: string,
}

export const mnemonicFixtures: IMnemonicFixture[] = [{
  numbOfWords: 3,
  randomValue: new Uint8Array([20, 192, 89, 194]),
  entropy: '14c059c2',
  phrase: 'below actress idle',
}, {
  numbOfWords: 6,
  randomValue: new Uint8Array([190, 59, 235, 40, 60, 157, 129, 250]),
  entropy: 'be3beb283c9d81fa',
  phrase: 'sail tent skate junior submit wonder',
}, {
  numbOfWords: 9,
  randomValue: new Uint8Array([144, 18, 200, 71, 190, 15, 102, 223, 5, 125, 187, 134]),
  entropy: '9012c847be0f66df057dbb86',
  phrase: 'mosquito north ball lab wait hurdle bicycle resist man',
}, {
  numbOfWords: 12,
  randomValue: new Uint8Array([104, 185, 48, 131, 146, 175, 129, 16, 156, 15, 216, 171, 214, 154, 253, 17]),
  entropy: '68b9308392af81109c0fd8abd69afd11',
  phrase: 'hamster sister can census way marriage ice wild profit regular satisfy car',
}, {
  numbOfWords: 15,
  randomValue: new Uint8Array([98, 197, 64, 183, 173, 153, 26, 191, 212, 12, 54, 105, 135, 46, 72, 164, 166, 31, 54, 236]),
  entropy: '62c540b7ad991abfd40c3669872e48a4a61f36ec',
  phrase: 'glare claw combine forest museum garment expand man hat defense mutual enable giggle opinion ready',
}, {
  numbOfWords: 18,
  randomValue: new Uint8Array([239, 61, 135, 228, 103, 61, 131, 109, 117, 130, 154, 167, 106, 239, 108, 224, 94, 128, 230, 33, 124, 116, 209, 242]),
  entropy: 'ef3d87e4673d836d75829aa76aef6ce05e80e6217c74d1f2',
  phrase: 'upset umbrella weekend solar subway repeat stock fashion polar first swamp scheme trend indoor magnet model spin north',
}, {
  numbOfWords: 21,
  randomValue: new Uint8Array([245, 229, 115, 131, 172, 1, 34, 156, 220, 183, 246, 180, 213, 156, 172, 200, 237, 117, 17, 12, 194, 96, 254, 131, 163, 198, 158, 215]),
  entropy: 'f5e57383ac01229cdcb7f6b4d59cacc8ed75110cc260fe83a3c69ed7',
  phrase: 'vote clog thought fix banana example index yard regular provide clinic mushroom struggle mass credit equal write brown vast diet keep',
}, {
  numbOfWords: 24,
  randomValue: new Uint8Array([57, 113, 138, 226, 242, 89, 220, 90, 243, 226, 247, 79, 170, 90, 78, 226, 205, 177, 79, 37, 254, 197, 168, 228, 236, 18, 121, 97, 150, 210, 214, 0]),
  entropy: '39718ae2f259dc5af3e2f74faa5a4ee2cdb14f25fec5a8e4ec12796196d2d600',
  phrase: 'defense middle reward tool oven coin sort galaxy exile fan neck sheriff swallow pole obey suffer pottery cherry afraid version bonus harvest fix acid',
}];