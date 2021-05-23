export interface IMnemonicFixture {
  numbOfWords: number,
  randomValue: Uint8Array,
  entropy: string,
  phrase: string,
  rootKey: string,
  path: string,
  privateKey: string,
  publicKey: string,
}

export const mnemonicFixtures: IMnemonicFixture[] = [{
  numbOfWords: 3,
  randomValue: new Uint8Array([20, 192, 89, 194]),
  entropy: '14c059c2',
  phrase: 'below actress idle',
  rootKey: 'xprv9s21ZrQH143K2dhCiVWPd1oHtEnroC7QorgTr3WSQfodbYWew9aR9PqTbWRxo6r9bUaDngww9PYitjwHkb6feZN4Z2XpirMTxHeLb11we2g',
  path: 'm/0',
  privateKey: 'xprv9vmvKoPvDsDkrWLpBXf44y7Wa6i6PAQ2QW9jdASD6p2TvFiEKaKzs3uauSWnxDyHcxoP7yYmaeYvEUjFzqXHkJ9NkLvqLDvPbwv8si31tQC',
  publicKey: 'xpub69mGjJvp4En44zRHHZC4S74F88Yand7smj5LRYqpf9ZSo43Ns7eFQrE4khzJsh9ZB3Y8owi15F2vyEwDa76VkdAZHhqSrvVFETxoJ7Zv4ZG',
}, {
  numbOfWords: 6,
  randomValue: new Uint8Array([190, 59, 235, 40, 60, 157, 129, 250]),
  entropy: 'be3beb283c9d81fa',
  phrase: 'sail tent skate junior submit wonder',
  rootKey: 'xprv9s21ZrQH143K3DaWR6XjwfpZ34ihfTbW4pK66uF7NG1ARNnx57eNbtF7AvqifpE7dTQTT8ScHrqjNgRCSdvmopZxH2HzLhzvtJFvHkVH2Dq',
  path: 'm/0/2147483647\'',
  privateKey: 'xprv9w3RemEmYcSdFEU6N55SuJwsS3wHLFqrUYpn3a8BDdthXgeJrYTBPr9neNYyyPDgmivExSsHwtxUedBJaew1uKSpZF34SCkqzPB3ywJFezm',
  publicKey: 'xpub6A2n4GmfNyzvTiYZU6cTGStbz5mmjiZhqmkNqxXnmyRgQUyTQ5mRweUGVdEhhxWm8ZWuUnGGwpsHMFSZCBJHdZyVTjZ82HE2yZmhpPMwssE',
}, {
  numbOfWords: 9,
  randomValue: new Uint8Array([144, 18, 200, 71, 190, 15, 102, 223, 5, 125, 187, 134]),
  entropy: '9012c847be0f66df057dbb86',
  phrase: 'mosquito north ball lab wait hurdle bicycle resist man',
  rootKey: 'xprv9s21ZrQH143K2UCLkQtfM3kiatrMKzGmqwHhLYHjGE2puhsmVHaBdat2TqKGiUrtYn72NqgAY4Um9Bx6vp8QhsLcbZggmbSv2pQcQUh3VNM',
  path: 'm/0/2147483647\'/1',
  privateKey: 'xprv9zEoZ9gSSvYmGiHGNpWWtcpAGtxxsF9qvJ2mP6CWQVz9nEUV32i5UAunviJTsCbRtZTmt8mPrDM6J7haHTBK1WySeKUHZhxjavc21Gsr5cx',
  publicKey: 'xpub6DE9xfDLHJ74VCMjUr3XFkktpvoTGhshHWxNBUc7xqX8f2odaa2L1yEGmzTCtei9zEyatAz4RFshnzxWRN9TGnefPbHZakzXR1YhAwQ4hzy',
}, {
  numbOfWords: 12,
  randomValue: new Uint8Array([104, 185, 48, 131, 146, 175, 129, 16, 156, 15, 216, 171, 214, 154, 253, 17]),
  entropy: '68b9308392af81109c0fd8abd69afd11',
  phrase: 'hamster sister can census way marriage ice wild profit regular satisfy car',
  rootKey: 'xprv9s21ZrQH143K2zFc1VCvCXp5h4wjEcrcXv8JSVma1Mhb9bSq1PkieArQys5Uv1ZuZSWnzQ6JtaGqes7itVpYY5VPPriPcvBWp6H26Qhsrqv',
  path: 'm/0/2147483647\'/1/2147483646\'',
  privateKey: 'xprvA22mFVTxKzSniz3T1Xww6iD2JcZKQ9a4SSFEU6Fi8K8Nodk8vHyz9tyetEXsBcs4sgveuQ2s7XGrDpGRfK4X5MWRfQRJE5QWapHtQqAcbEY',
  publicKey: 'xpub6F27ezzrAN15wU7v7ZUwTr9krePoocHuofAqGUfKgefMgS5HTqJEhhJ8jUVrxwM24AgyrXc7RSqjiqoBjSLdFzhPTEak45KqfapUBQieea7',
}, {
  numbOfWords: 15,
  randomValue: new Uint8Array([98, 197, 64, 183, 173, 153, 26, 191, 212, 12, 54, 105, 135, 46, 72, 164, 166, 31, 54, 236]),
  entropy: '62c540b7ad991abfd40c3669872e48a4a61f36ec',
  phrase: 'glare claw combine forest museum garment expand man hat defense mutual enable giggle opinion ready',
  rootKey: 'xprv9s21ZrQH143K32nXfG43vcF7sfikWX9k2sHReAoMKdDzXwGatB59VoFWoGc7Si3Z3q7URpE5NnYnKoGhjowKZpxCMte325jnR2kGnDUgxM2',
  path: 'm/0/2147483647\'/1/2147483646\'/2',
  privateKey: 'xprvA3miCVR9inQhLoxrRZjAd3QuJSPc3VxsJ6cbyTJLsmDD8Fgwi6zWqQg99xGB2Ev7m8vSqD2vvt2TUXAW5FmqmDLX4194NBemz4XFiHuFmn4',
  publicKey: 'xpub6Gm4bzx3Z9xzZJ3KXbGAzBMdrUE6SxgifKYCmqhxS6kC1426FeJmPCzd1EdJ8LSDsrus85kRsmDEERwSBgJGTCz5w5iq2E3NgK1f5ozxG4B',
}, {
  numbOfWords: 18,
  randomValue: new Uint8Array([239, 61, 135, 228, 103, 61, 131, 109, 117, 130, 154, 167, 106, 239, 108, 224, 94, 128, 230, 33, 124, 116, 209, 242]),
  entropy: 'ef3d87e4673d836d75829aa76aef6ce05e80e6217c74d1f2',
  phrase: 'upset umbrella weekend solar subway repeat stock fashion polar first swamp scheme trend indoor magnet model spin north',
  rootKey: 'xprv9s21ZrQH143K3Jp6oaPzSwHfywBy1bp5WLZVtZhMhhG1b3nJru44qQMuJmVYspGzh1FrLq2PkFM51WF67AvEorxcrjye83qWN5SxxUCVgQ6',
  path: 'm/44\'/0\'/0\'/0/0\'',
  privateKey: 'xprvA3DgtqcRMiLwFB8eyW5MATv6bhvaZQa8fuaojRWNaApRD6bpqSpzkgRmnXDgoiNSVcfLt1nXhef23SWaTogHssht5uG5PHod55nXXXZvmg3',
  publicKey: 'xpub6GD3JM9KC5uETfD85XcMXbrq9jm4xsHz38WQXouz8WMQ5tvyNz9FJUkFdoVj4cAWFNgk2Se8SpUukDqy3RsaGP1ocfWB1repZW3yvFryjV9',
}, {
  numbOfWords: 21,
  randomValue: new Uint8Array([245, 229, 115, 131, 172, 1, 34, 156, 220, 183, 246, 180, 213, 156, 172, 200, 237, 117, 17, 12, 194, 96, 254, 131, 163, 198, 158, 215]),
  entropy: 'f5e57383ac01229cdcb7f6b4d59cacc8ed75110cc260fe83a3c69ed7',
  phrase: 'vote clog thought fix banana example index yard regular provide clinic mushroom struggle mass credit equal write brown vast diet keep',
  rootKey: 'xprv9s21ZrQH143K4TEqg7idEqy3JjY25YQ1BGJ3CinsTom5eXRKXxwLYpv1mJGfc2s3T3NP9dUuFjkKvPYaKLHXqK7ytnzZynEzqLmPj3WUVvo',
  path: 'm/44\'/0\'/0\'/0/1\'',
  privateKey: 'xprvA2hxYqi9bBYT9xa4oWpD5rUsj4bLhJJWmqGyT1KawFKhGP5kadFcZiPUeBop1b7AirwAgChpk3zkcJtEJyadD6UxcdXMKPMZVqijDAX6B7N',
  publicKey: 'xpub6FhJxMF3RZ6kNSeXuYMDSzRcH6Rq6m2N94CaFPjCVarg9BQu8AZs7WhxVVMnWaEVeZXpmcsteGG7Rx5sKeVaJYzVwmHnhCBpuGEqgt2cz3U',
}, {
  numbOfWords: 24,
  randomValue: new Uint8Array([57, 113, 138, 226, 242, 89, 220, 90, 243, 226, 247, 79, 170, 90, 78, 226, 205, 177, 79, 37, 254, 197, 168, 228, 236, 18, 121, 97, 150, 210, 214, 0]),
  entropy: '39718ae2f259dc5af3e2f74faa5a4ee2cdb14f25fec5a8e4ec12796196d2d600',
  phrase: 'defense middle reward tool oven coin sort galaxy exile fan neck sheriff swallow pole obey suffer pottery cherry afraid version bonus harvest fix acid',
  rootKey: 'xprv9s21ZrQH143K3LhZYc9ENSkewbAPWn8Qt8mSoxvJ8eu21KTFFvk7PuZjhPr34FfWU8vfytuEg8wCoFmkYU8xtCe3EGnmERjyhjCWf8rDmku',
  path: 'm/44\'/0\'/0\'/10/1\'',
  privateKey: 'xprvA3gPZPvadtQYpiLN7499BigZTHy79a5oAeorJzwAK1S6imEpfxPTSb5tnCX4k9U6JSyYLt8dnyzS5U8XqsKsLLaZ4Dao4a5Ys7bx264kfeC',
  publicKey: 'xpub6GfjxuTUUFxr3CQqD5g9YrdJ1KobZ2oeXsjT7PLmsLy5bZZyDVhhzPQNdSqaxiHgsgZntxAPjjv1fZDZXU5QhFZ6EweRF7jUXQhsV7VUSwT',
}];

export const invalidFromBase58 = [
  {
    exception: 'Invalid checksum',
    string: 'xprvQQQQQQQQQQQQQQQQCviVfJSKyQ1mDYahRjijr5idH2WwLsEd4Hsb2Tyh8RfQMuPh7f7RtyzTtdrbdqqsunu5Mm3wDvUAKRHSC34sJ7in334'
  },
  {
    exception: 'Invalid buffer length',
    string: 'HAsbc6CgKmTYEQg2CTz7m5STEPAB'
  },
  {
    exception: 'Invalid parent fingerprint',
    string: 'xprv9tnJFvAXAXPfPnMTKfwpwnkty7MzJwELVgp4NTBquaKXy4RndyfJJCJJf7zNaVpBpzrwVRutZNLRCVLEcZHcvuCNG3zGbGBcZn57FbNnmSP'
  },
  {
    exception: 'Invalid private key',
    string: 'xprv9s21ZrQH143K3yLysFvsu3n1dMwhNusmNHr7xArzAeCc7MQYqDBBStmqnZq6WLi668siBBNs3SjiyaexduHu9sXT9ixTsqptL67ADqcaBdm'
  },
  {
    exception: 'Invalid index',
    string: 'xprv9s21ZrQYdgnodnKW4Drm1Qg7poU6Gf2WUDsjPxvYiK7iLBMrsjbnF1wsZZQgmXNeMSG3s7jmHk1b3JrzhG5w8mwXGxqFxfrweico7k8DtxR'
  },
  {
    exception: 'Invalid network version',
    string: '8FH81Rao5EgGmdScoN66TJAHsQP7phEMeyMTku9NBJd7hXgaj3HTvSNjqJjoqBpxdbuushwPEM5otvxXt2p9dcw33AqNKzZEPMqGHmz7Dpayi6Vb'
  },
  {
    exception: 'Invalid network version',
    string: 'Ltpv73XYpw28ZyVe2zEVyiFnxUZxoKLGQNdZ8NxUi1WcqjNmMBgtLbh3KimGSnPHCoLv1RmvxHs4dnKmo1oXQ8dXuDu8uroxrbVxZPA1gXboYvx'
  },
  {
    exception: 'Invalid buffer length',
    string: '9XpNiB4DberdMn4jZiMhNGtuZUd7xUrCEGw4MG967zsVNvUKBEC9XLrmVmFasanWGp15zXfTNw4vW4KdvUAynEwyKjdho9QdLMPA2H5uyt'
  },
  {
    exception: 'Invalid buffer length',
    string: '7JJikZQ2NUXjSAnAF2SjFYE3KXbnnVxzRBNddFE1DjbDEHVGEJzYC7zqSgPoauBJS3cWmZwsER94oYSFrW9vZ4Ch5FtGeifdzmtS3FGYDB1vxFZsYKgMc'
  },
  {
    exception: 'Invalid parent fingerprint',
    string: 'xpub67tVq9SuNQCfm2PXBqjGRAtNZ935kx2uHJaURePth4JBpMfEy6jum7Euj7FTpbs7fnjhfZcNEktCucWHcJf74dbKLKNSTZCQozdDVwvkJhs'
  },
  {
    exception: 'Invalid index',
    string: 'xpub661MyMwTWkfYZq6BEh3ywGVXFvNj5hhzmWMhFBHSqmub31B1LZ9wbJ3DEYXZ8bHXGqnHKfepTud5a2XxGdnnePzZa2m2DyzTnFGBUXtaf9M'
  },
  {
    exception: 'Point is not on the curve',
    string: 'xpub661MyMwAqRbcFtXgS5sYJABqqG9YLmC4Q1Rdap9gSE8NqtwybGhePY2gYymDsxxRe3WWeZQ7TadaLSdKUffezzczTCpB8j3JP96UwE2n6w1'
  }
];

export const invalidFromSeed = [{
  exception: 'Seed should be at least 128 bits',
  seed: 'aaaa'
},
{
  exception: 'Seed should be at most 512 bits',
  seed: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
}];

export const extendedKeys = [{

}];
