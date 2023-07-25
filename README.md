# synthetic-api-script <a href="https://www.npmjs.com/package/@instana/synthetic-api-script"><img alt="npm (scoped)" src="https://img.shields.io/npm/v/@instana/synthetic-api-script?color=0db4b33"></a>

---
Run and debug Instana synthetic api script in local, see [Instana API Script reference](https://www.ibm.com/docs/en/instana-observability/current?topic=beta-using-api-scripts) for script syntax.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Using script-cli](#using-script-cli)
  - [Get examples](#get-examples)
  - [Run a single script](#run-a-single-script)
  - [Run bundle script](#run-bundle-script)
  - [Convert a script to string](#convert-a-script-to-string)
  - [Zip and convert bundle scripts to string encoded with base64](#zip-and-convert-bundle-scripts-to-string-encoded-with-base64)
- [Run script with VSCode](#run-script-with-vscode)
  - [Download code](#download-code)
  - [Install required modules](#install-required-modules)
  - [Select a script to run](#select-a-script-to-run)
  - [Specify Credential file](#specify-credential-file)
  - [Run and debug](#run-and-debug)


## Installation
Using npm:
```
# install the package in global mode 
npm install -g @instana/synthetic-api-script
# or install the package locally
npm install @instana/synthetic-api-script
```

Using yarn:
```
yarn add @instana/synthetic-api-script
```

Update to latest version:
```
npm update -g @instana/synthetic-api-script
```

## Usage
```
Usage:
  Run synthetic api script in local

Commands
  script-cli [options] <script-file>

Options
  -d <directory> directory for bundle scripts
  -s convert script to string
  -z <bundle-script-folder> <entry-script> zip the bundle scripts folder and convert to string encoded with base64
  -c secure.json specify credentials in API script
  -h, --help show help
  -v, --version show version
```

## Using script-cli

### Get examples
```
git clone https://github.com/instana/synthetic-api-script.git
cd synthetic-api-script
```

### Run a single script
Syntax
```shell
script-cli <script_name>
```
Example 1, run a single script
```shell
script-cli examples/got-example1.js
```

Example 2, run a single API script with credentials
```shell
script-cli -c creds.json got-credentials-test.js
```
**NOTE:** use `script-cli` if it is installed globally, use `npx script-cli` if it is installed locallly.

### Run bundle script

Specify script folder and entry file.
```shell
script-cli -d <dir> <script-entry-file>
```

Example
```shell
script-cli -d examples/got-bundle-example1 index.js

# specify credentials using -c cred.json
script-cli -c cred.json -d examples/got-bundle-example1 index.js
```

### Convert a script to string

The converted string can be used in HTTPScript test [payload](https://instana.github.io/openapi/#section/Synthetic-Test-Properties:)

```shell
script-cli -s <script-file-path>
```

Example
```shell
script-cli -s examples/got-get.js
```

Result example
```json
{
  "syntheticType":"HTTPScript",
  "script":"var assert = require('assert');\n\n(async function() {\n  var options = {\n    url: 'https://httpbin.org/get',\n    https:{\n      rejectUnauthorized: false\n    }\n  };\n\n  let response = await $got.get(options);\n  assert.equal(response.statusCode, 200, 'Expected a 200 OK response');\n  console.log('Request URL %s, statusCode: %d', response.url, response.statusCode);\n})();\n"
}
```

### Zip and convert bundle scripts to string encoded with base64

The converted string can be used in HTTPScript test [payload](https://instana.github.io/openapi/#section/Synthetic-Test-Properties:).  

```shell
script-cli -z <bundle-script-folder> <entry-script>
```

**Note:** `bundle-script-folder` can not include its parent folder, do not use `examples/got-bundle-example1`, use `got-bundle-example1` instead.


If all test files are inside a folder, such as `got-bundle-example1`, its entry file should be relative path from the folder, it is `got-bundle-example1/index.js`. Its directory tree is as below:

```
got-bundle-example1
├── index.js
└── lib
    ├── request1.js
    └── request2.js

# convert it to base64
cd examples
script-cli -z got-bundle-example1 got-bundle-example1/index.js
```

Result is
``` json
{
  "syntheticType": "HTTPScript",
  "scripts": {
    "scriptFile": "got-bundle-example1/index.js",
    "bundle": "UEsDBBQAAAgAAHKG61YAAAAAAAAAAAAAAAAUAAAAZ290LWJ1bmRsZS1leGFtcGxlMS9QSwMEFAAACAgAQXbrVgqQVDa5AAAAdgEAABwAAABnb3QtYnVuZGxlLWV4YW1wbGUxL2luZGV4Lmpzfc5LCsIwEADQfU6RRSEpSIpdKiLiShC78QJpnNJATLCZWkW8u0mx+EE7q8zkzUc565E2cGrB45Qu+qdugDORGV1mww9L50S92/yvzaMlXPqrVbRqrULtLE9vhIYY5vFgYi47qV8zY/We8pSQRCI2umwRvPCAnNVgjGMTyjrXmEO/It7jDAhtK8eZkSWYAJKwF2tArZ4nj5Gl6GtLYeURfntqHVK4aI+z0davXrDnTy+2xXq13xS7YB9QSwMEFAAACAAAQXbrVgAAAAAAAAAAAAAAABgAAABnb3QtYnVuZGxlLWV4YW1wbGUxL2xpYi9QSwMEFAAACAgAiYTrVlJas+srAQAAJQIAACMAAABnb3QtYnVuZGxlLWV4YW1wbGUxL2xpYi9yZXF1ZXN0MS5qc21SzW7CMAy+9yksBEoqlRR2LNpp2mmHPUNIDBSFpoudFWni3ZeUMgRaTpH9+ftxYnxHDJoIA8MrBPyKbUAprhVRborCjJAY3DoBxIG5p6auh2FQW93aqIw/1SLhdrEz3PpuJEHitSzhpwCY7z2rPbLMFGUqKD5gJ29wGZD6JIFlBgNkOe9Qtd3OSzFxZflmQRUQa4705i02sCBRjb4quHGoez9Zh/Fco6hEpJ38B1jBy2pVgXg/92gYLehcgM+PP9ZxDVeyugb2QIhgAlrsuNUu2YqEQCa0PS+Na2FpxjapI6V9KKWm6cdsc0ITA6o+ORx8sE2K81wr77oPOZ5xFcy+tYu4nqXbcxPo4KOzsEUYp3OECZ35L2VxKYqTtzFZw3PvA9P0F/IzbopfUEsDBBQAAAgIAEF261b2WQORzwAAAD4BAAAjAAAAZ290LWJ1bmRsZS1leGFtcGxlMS9saWIvcmVxdWVzdDIuanNtkLFuwzAMRHd9BYcWUgBBCTzG6FRkytBvUGUmFWCLrkjBKYr+eyQnSJaOPB7e8RgosYBnxizwBhm/S8xo9E3Rm16psFpKHrtq0F8iM++322VZXPycXKBJ98rzTwpwKilIpLRikKUzG/hVACNKlXiuIKwMv/go8HImcWcU08g1B6AF0YguphMZfWe04D28sgUWL4XfacA6D9quJ9kH2D33K+3WwFWKH80/JgvdbmdBHy4zBsEBfBPg4/ggtvZ/Sk00lHoVXmbKwvcntXa9ugJQSwECFAMUAAAIAAByhutWAAAAAAAAAAAAAAAAFAAAAAAAAAAAABAA7UEAAAAAZ290LWJ1bmRsZS1leGFtcGxlMS9QSwECFAMUAAAICABBdutWCpBUNrkAAAB2AQAAHAAAAAAAAAAAAAAApIEyAAAAZ290LWJ1bmRsZS1leGFtcGxlMS9pbmRleC5qc1BLAQIUAxQAAAgAAEF261YAAAAAAAAAAAAAAAAYAAAAAAAAAAAAEADtQSUBAABnb3QtYnVuZGxlLWV4YW1wbGUxL2xpYi9QSwECFAMUAAAICACJhOtWUlqz6ysBAAAlAgAAIwAAAAAAAAAAAAAApIFbAQAAZ290LWJ1bmRsZS1leGFtcGxlMS9saWIvcmVxdWVzdDEuanNQSwECFAMUAAAICABBdutW9lkDkc8AAAA+AQAAIwAAAAAAAAAAAAAApIHHAgAAZ290LWJ1bmRsZS1leGFtcGxlMS9saWIvcmVxdWVzdDIuanNQSwUGAAAAAAUABQB0AQAA1wMAAAAA"
  }
}
```


If all files are not within a folder, change directory to `got-bundle-example1`, its directory tree is as below:
```
├── index.js
└── lib
    ├── request1.js
    └── request2.js

# convert to base64
cd got-bundle-example1
script-cli -z . index.js
```

Result is:
``` json
{
  "syntheticType": "HTTPScript",
  "scripts": {
    "scriptFile": "index.js",
    "bundle": "UEsDBBQAAAgIAEF261YKkFQ2uQAAAHYBAAAIAAAAaW5kZXguanN9zksKwjAQANB9TpFFISlIil0qIuJKELvxAmmc0kBMsJlaRby7SbH4QTurzOTNRznrkTZwasHjlC76p26AM5EZXWbDD0vnRL3b/K/NoyVc+qtVtGqtQu0sT2+Ehhjm8WBiLjupXzNj9Z7ylJBEIja6bBG88ICc1WCMYxPKOteYQ78i3uMMCG0rx5mRJZgAkrAXa0CtniePkaXoa0th5RF+e2odUrhoj7PR1q9esOdPL7bFerXfFLtgH1BLAwQUAAAIAABBdutWAAAAAAAAAAAAAAAABAAAAGxpYi9QSwMEFAAACAgAiYTrVlJas+srAQAAJQIAAA8AAABsaWIvcmVxdWVzdDEuanNtUs1uwjAMvvcpLARKKpUUdizaadpphz1DSAwUhaaLnRVp4t2XlDIEWk6R/fn7cWJ8RwyaCAPDKwT8im1AKa4VUW6KwoyQGNw6AcSBuaemrodhUFvd2qiMP9Ui4XaxM9z6biRB4rUs4acAmO89qz2yzBRlKig+YCdvcBmQ+iSBZQYDZDnvULXdzksxcWX5ZkEVEGuO9OYtNrAgUY2+KrhxqHs/WYfxXKOoRKSd/AdYwctqVYF4P/doGC3oXIDPjz/WcQ1XsroG9kCIYAJa7LjVLtmKhEAmtD0vjWthacY2qSOlfSilpunHbHNCEwOqPjkcfLBNivNcK++6DzmecRXMvrWLuJ6l23MT6OCjs7BFGKdzhAmd+S9lcSmKk7cxWcNz7wPT9BfyM26KX1BLAwQUAAAICABBdutW9lkDkc8AAAA+AQAADwAAAGxpYi9yZXF1ZXN0Mi5qc22QsW7DMAxEd30FhxZSAEEJPMboVGTK0G9QZSYVYIuuSMEpiv57JCdIlo48Ht7xGCixgGfGLPAGGb9LzGj0TdGbXqmwWkoeu2rQXyIz77fbZVlc/JxcoEn3yvNPCnAqKUiktGKQpTMb+FUAI0qVeK4grAy/+CjwciZxZxTTyDUHoAXRiC6mExl9Z7TgPbyyBRYvhd9pwDoP2q4n2QfYPfcr7dbAVYofzT8mC91uZ0EfLjMGwQF8E+Dj+CC29n9KTTSUehVeZsrC9ye1dr26AlBLAQIUAxQAAAgIAEF261YKkFQ2uQAAAHYBAAAIAAAAAAAAAAAAAACkgQAAAABpbmRleC5qc1BLAQIUAxQAAAgAAEF261YAAAAAAAAAAAAAAAAEAAAAAAAAAAAAEADtQd8AAABsaWIvUEsBAhQDFAAACAgAiYTrVlJas+srAQAAJQIAAA8AAAAAAAAAAAAAAKSBAQEAAGxpYi9yZXF1ZXN0MS5qc1BLAQIUAxQAAAgIAEF261b2WQORzwAAAD4BAAAPAAAAAAAAAAAAAACkgVkCAABsaWIvcmVxdWVzdDIuanNQSwUGAAAAAAQABADiAAAAVQMAAAAA"
  }
}
```

# Run script with VSCode

### Download code
```shell
git clone https://github.com/instana/synthetic-api-script.git
```

### Install required modules
```shell
cd synthetic-api-script
npm install
```

### Select a script to run
Edit file `lib/runInVscode.js` and modify variable `scriptPath` to run your script, e.g, run `got-get.js` script, scriptPath is as below:
```
const scriptPath = `${__dirname}/../examples/got-get.js`;
```

### Specify Credential file
Edit file `lib/runInVscode.js` and modify variable `credFile` as below to specify the credential json path.
```
const credFile = ${__dirname}/../examples/creds.json;
```
### Run and debug
Go to Run and Debug view, then click button `Run Synthetic Script` to run and debug the selected script.  
You can also set breakpoints and debug your script step by step.
