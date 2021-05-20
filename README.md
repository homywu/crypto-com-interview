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
