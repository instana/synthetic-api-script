const fs = require('fs');

const { executeScriptAPI } = require('./lib/executeScript');

// executeScriptAPI(fs.readFileSync('./examples/http-get.js'));

module.exports = {
  executeScript: executeScriptAPI
};
