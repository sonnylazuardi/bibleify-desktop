# Bibleify Desktop
Simple bible app with dramatized audio built with [Electron](https://electronjs.org/), [React](https://reactjs.org/), [Rematch](https://rematch.gitbooks.io/rematch/#getting-started), [Realm](https://github.com/realm/realm-js) & [Clappr](https://github.com/clappr/clappr)

![bibleifyscreen](/images/bibleifyscreen.jpg)

## Downloads

[Click here](https://sonnylab.itch.io/bibleify) to download the latest version.

## About Bibleify

Bibleify is a simple & fast bible app with dramatized audio. The design is modern, distraction-free, and easy-to-use.

The application is free and Open Source, its original purpose was for me to listen to the Words of God. This app provides well-designed bible text and high quality audio that can help me to understand bible better.

To support this project you can give star 🌟 to this github repo below or give donation 😊The donation will be used to implement new features like integration with the mobile app, bible reading plan, etc.

Bibleify is made in Singapore with lots of ❤️​by Sonny Lazuardi​​ & the amazing community.​

## Features

- Easy & quick navigation
- Blazing fast search
- High quality dramatized bible audio
- Offline bible reading

## Roadmap

- Integration with Bibleify Mobile (https://github.com/sonnylazuardi/bibleify-mobile)
- Bookmark
- History
- Bible Reading Plan

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
