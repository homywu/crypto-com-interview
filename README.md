# Crypto.com interview (built by react)

The site deployed to [AWS S3 + CloudFront](https://d1p37yk9w71ory.cloudfront.net/index.html) for your preview, please check the docs as below:

## The libraries are used in this project

**bitcoinjs-lib** - The javascript implementation of bitcoin library, use for getting derivation path
**bip39** - The javascript version of bip39, use it for getting the seed from mnemonic words.
**bip32** - The javascript version of bip32, use it for getting the root key / calculate the extended key (BIP32 priv / pub keys, Account priv / pub keys), and derived addresses.

**sjcl** - Stanford Javascript Crypto Library, mainly for sha256 hash
**fastest-levenshtein** use for pick the closest word when having a typo in the phrase

**react-js** - A UI library
**redux-toolkit** - Redux state management for react, redux toolkit is a set of tools which maintains the states better.

## What I learnt from this exercise?

The exercise was trying to use a single secret to create any amount of key pairs for transaction. so the steps as follows:

* Generate an entropy (128 / 256 bits)
* Convert entropy to seed and also the recover phrase (the words combination) - Proposed in BIP39
* Convert the seed to HDWallet, HDWallet to generate the individual keys
* Use the keys to convert to addresses (Propose in BIP32 / BIP44)

The features are implemented in the current codebase.

## (Bonus) multi-sig

Apologies for not implement the bonus feature with the limited time, what I learn from the feature is that, without multi-sig, people can use a single key to corresponds with the address, or if you lost the key, you will never get the coins back.

In order to improve the security and prevent a single key lost, P2SH allows multi keys associates with the multisig address, and you need at least n of m keys in order to move the coins.

In bitcoinjs lib, [multi-sig](https://github.com/bitcoinjs/bitcoinjs-lib/blob/239711bf4ef00651af92049bcdf88b12252b945c/test/integration/addresses.spec.ts#L73) has been implemented for my reference.

## Is it safe for users to use?

The library is completely runnable without network, doesn't save data in cookies or any tmp storages

## Does it follow any practices?

Code implemented in Typescript which check code quality by eslint with typescript recommendation rules.

## Are there any test cases coverage?

Apologies for not having tests as this moment, since I was focus on understand and build the code as good as I can, normally, I will separate the codes in libs folder to an npm package, and have the testing without mixin the front-end logics.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
