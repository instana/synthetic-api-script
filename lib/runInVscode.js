"use strict";
const fs = require('fs');
const { executeScript } = require("./executeScript");

// modify scriptPath to run different scripts under examples
const scriptPath = `${__dirname}/../examples/http-get.js`;
executeScript(fs.readFileSync(scriptPath), scriptPath);
