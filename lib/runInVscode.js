"use strict";
const fs = require('fs');
const { executeScript } = require("./executeScript");

let options = {
    // mock $secure
    // secure: {
    //     username: 'mock username',
    //     password: 'mock password'
    // }
}

// modify scriptPath to run different scripts under examples
const scriptPath = `${__dirname}/../examples/got-get.js`;
executeScript(fs.readFileSync(scriptPath), scriptPath, null, options);
