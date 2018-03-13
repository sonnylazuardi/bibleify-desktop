# Bibleify Desktop
Simple bible app with dramatized audio built with [Electron](https://electronjs.org/), [React](https://reactjs.org/), [Rematch](https://rematch.gitbooks.io/rematch/#getting-started), & [Clappr](https://github.com/clappr/clappr)

![bibleifyscreen](/images/bibleifyscreen.jpg)

## Downloads

[Click here](https://sonnylab.itch.io/bibleify) to download the latest version.

## Prerequisites

* Git
* Node.js

## Setup Development

1. Clone the repository.
2. Open Git Bash and enter `npm install`.
3. Run this to compile realm electron `./node_modules/.bin/electron-rebuild`.
4. If the app is not running, copy `electron-v1.8_darwin_x64/realm.node` into `node_modules/realm/compiled` modify the following codes in `node_modules/realm/lib/index.js`:
```
switch (getContext()) {
case 'nodejs':
case 'electron':
  // nodeRequire('./submit-analytics')('Run');
  //
  // var binary = nodeRequire('node-pre-gyp');
  // var path = nodeRequire('path');
  // var pkg = path.resolve(path.join(__dirname,'../package.json'));
  // var binding_path = binary.find(pkg);
  //
  // realmConstructor = require_method(binding_path).Realm;
  realmConstructor = require('../compiled/electron-v1.8_darwin_x64/realm.node').Realm;
  break;
```

## Running the Application

In Git Bash, enter `npm run dev`.
