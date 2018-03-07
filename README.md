# JSON Editor with Electron

Create, open, edit, and save local JSON files in a GUI.

This uses the [JSON Editor](https://github.com/josdejong/jsoneditor) in an [Electron](http://electron.atom.io/) application.  It provides 3 buttons for file interactions - New, Open, and Save.

![screenshot of running application](images/RunningApplication.png)

## Prerequisites

* Git
* Node.js

## Setup

1. Clone the repository.
2. Open Git Bash and enter `npm install`.

## Running the Application

In Git Bash, enter `npm start`.

## Branches

The master branch contains a generic JSON editor for any *.json file.

The ig-tablewire branch is specific to certain files that Infragistics uses internally for help documentation.  If you want to use this branch, simply open Git Bash and enter `git checkout ig-tablewire` before running `npm start`.