"use strict";
const fs = require('fs');
const { executeScript } = require("./executeScript");

const credFile = `${__dirname}/../examples/creds.json`;

let options = {credFile: credFile}
// modify scriptPath to run different scripts under examples
const scriptPath = `${__dirname}/../examples/got-get.js`;

executeScript(fs.readFileSync(scriptPath), scriptPath, null, options);
