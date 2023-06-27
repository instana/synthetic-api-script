# synthetic-api-script <a href="https://www.npmjs.com/package/@instana/synthetic-api-script"><img alt="npm (scoped)" src="https://img.shields.io/npm/v/@instana/synthetic-api-script?color=0db4b33"></a>

---
Run and debug Instana synthetic api script in local, see [Instana API Script reference](https://www.ibm.com/docs/en/instana-observability/current?topic=beta-using-api-scripts) for script syntax.

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
Example
```shell
script-cli examples/got-example1.js
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
    "bundle": "UEsDBBQAAAgAAKR22lYAAAAAAAAAAAAAAAAUAAAAZ290LWJ1bmRsZS1leGFtcGxlMS9QSwMEFAAACAgAynXaVgqQVDa5AAAAdgEAABwAAABnb3QtYnVuZGxlLWV4YW1wbGUxL2luZGV4Lmpzfc5LCsIwEADQfU6RRSEpSIpdKiLiShC78QJpnNJATLCZWkW8u0mx+EE7q8zkzUc565E2cGrB45Qu+qdugDORGV1mww9L50S92/yvzaMlXPqrVbRqrULtLE9vhIYY5vFgYi47qV8zY/We8pSQRCI2umwRvPCAnNVgjGMTyjrXmEO/It7jDAhtK8eZkSWYAJKwF2tArZ4nj5Gl6GtLYeURfntqHVK4aI+z0davXrDnTy+2xXq13xS7YB9QSwMEFAAACAAAOHXaVgAAAAAAAAAAAAAAABgAAABnb3QtYnVuZGxlLWV4YW1wbGUxL2xpYi9QSwMEFAAACAgATHbaVs3kSXgsAQAAKQIAACMAAABnb3QtYnVuZGxlLWV4YW1wbGUxL2xpYi9yZXF1ZXN0MS5qc21SzW7CMAy+5ymsCdRUKindsWinaacd9gwhNZApNF3srEgT776klCHEcorsz9+PE+N7YtBEGBheIOBXtAFlcakU5UYIM0FicE0CFAfmgdq6HsdRbbXtojL+WBcJt4u9Yev7iQSJG1nCjwBY7D2rPbLMFGUqKD5gL69wGZCGJIFlBgNkOe9Q2X7nZTFzZfl2SRUQa4706jtsYUlFNfmq4Mqhbv1kHaZziaISkXbyH2AFz+t1BcXbaUDD2IHOBfh4/2Od1nAhq2tgD4QIJmCHPVvtkq1ICGSCHXhlnIWVmdqkPintQyk1T99nWxCaGFANyeHoQ9e0Kc9Dsbwp3yV5AFbw9K1dxOYp3R66QAcfXQdbhGk+x5jhWeFcirMQR9/FZA9Pgw9M83/IT7kRv1BLAwQUAAAICABNdtpW9lkDkc8AAAA+AQAAIwAAAGdvdC1idW5kbGUtZXhhbXBsZTEvbGliL3JlcXVlc3QyLmpzbZCxbsMwDER3fQWHFlIAQQk8xuhUZMrQb1BlJhVgi65IwSmK/nskJ0iWjjwe3vEYKLGAZ8Ys8AYZv0vMaPRN0ZteqbBaSh67atBfIjPvt9tlWVz8nFygSffK808KcCopSKS0YpClMxv4VQAjSpV4riCsDL/4KPByJnFnFNPINQegBdGILqYTGX1ntOA9vLIFFi+F32nAOg/arifZB9g99yvt1sBVih/NPyYL3W5nQR8uMwbBAXwT4OP4ILb2f0pNNJR6FV5mysL3J7V2vboCUEsBAhQDFAAACAAApHbaVgAAAAAAAAAAAAAAABQAAAAAAAAAAAAQAO1BAAAAAGdvdC1idW5kbGUtZXhhbXBsZTEvUEsBAhQDFAAACAgAynXaVgqQVDa5AAAAdgEAABwAAAAAAAAAAAAAAKSBMgAAAGdvdC1idW5kbGUtZXhhbXBsZTEvaW5kZXguanNQSwECFAMUAAAIAAA4ddpWAAAAAAAAAAAAAAAAGAAAAAAAAAAAABAA7UElAQAAZ290LWJ1bmRsZS1leGFtcGxlMS9saWIvUEsBAhQDFAAACAgATHbaVs3kSXgsAQAAKQIAACMAAAAAAAAAAAAAAKSBWwEAAGdvdC1idW5kbGUtZXhhbXBsZTEvbGliL3JlcXVlc3QxLmpzUEsBAhQDFAAACAgATXbaVvZZA5HPAAAAPgEAACMAAAAAAAAAAAAAAKSByAIAAGdvdC1idW5kbGUtZXhhbXBsZTEvbGliL3JlcXVlc3QyLmpzUEsFBgAAAAAFAAUAdAEAANgDAAAAAA=="
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
    "bundle": "UEsDBBQAAAgIAMp12lYKkFQ2uQAAAHYBAAAIAAAAaW5kZXguanN9zksKwjAQANB9TpFFISlIil0qIuJKELvxAmmc0kBMsJlaRby7SbH4QTurzOTNRznrkTZwasHjlC76p26AM5EZXWbDD0vnRL3b/K/NoyVc+qtVtGqtQu0sT2+Ehhjm8WBiLjupXzNj9Z7ylJBEIja6bBG88ICc1WCMYxPKOteYQ78i3uMMCG0rx5mRJZgAkrAXa0CtniePkaXoa0th5RF+e2odUrhoj7PR1q9esOdPL7bFerXfFLtgH1BLAwQUAAAIAAA4ddpWAAAAAAAAAAAAAAAABAAAAGxpYi9QSwMEFAAACAgATHbaVs3kSXgsAQAAKQIAAA8AAABsaWIvcmVxdWVzdDEuanNtUs1uwjAMvucprAnUVCop3bFop2mnHfYMITWQKTRd7KxIE+++pJQhxHKK7M/fjxPje2LQRBgYXiDgV7QBZXGpFOVGCDNBYnBNAhQH5oHauh7HUW217aIy/lgXCbeLvWHr+4kEiRtZwo8AWOw9qz2yzBRlKig+YC+vcBmQhiSBZQYDZDnvUNl+52Uxc2X5dkkVEGuO9Oo7bGFJRTX5quDKoW79ZB2mc4miEpF28h9gBc/rdQXF22lAw9iBzgX4eP9jndZwIatrYA+ECCZghz1b7ZKtSAhkgh14ZZyFlZnapD4p7UMpNU/fZ1sQmhhQDcnh6EPXtCnPQ7G8Kd8leQBW8PStXcTmKd0eukAHH10HW4RpPseY4VnhXIqzEEffxWQPT4MPTPN/yE+5Eb9QSwMEFAAACAgATXbaVvZZA5HPAAAAPgEAAA8AAABsaWIvcmVxdWVzdDIuanNtkLFuwzAMRHd9BYcWUgBBCTzG6FRkytBvUGUmFWCLrkjBKYr+eyQnSJaOPB7e8RgosYBnxizwBhm/S8xo9E3Rm16psFpKHrtq0F8iM++322VZXPycXKBJ98rzTwpwKilIpLRikKUzG/hVACNKlXiuIKwMv/go8HImcWcU08g1B6AF0YguphMZfWe04D28sgUWL4XfacA6D9quJ9kH2D33K+3WwFWKH80/JgvdbmdBHy4zBsEBfBPg4/ggtvZ/Sk00lHoVXmbKwvcntXa9ugJQSwECFAMUAAAICADKddpWCpBUNrkAAAB2AQAACAAAAAAAAAAAAAAApIEAAAAAaW5kZXguanNQSwECFAMUAAAIAAA4ddpWAAAAAAAAAAAAAAAABAAAAAAAAAAAABAA7UHfAAAAbGliL1BLAQIUAxQAAAgIAEx22lbN5El4LAEAACkCAAAPAAAAAAAAAAAAAACkgQEBAABsaWIvcmVxdWVzdDEuanNQSwECFAMUAAAICABNdtpW9lkDkc8AAAA+AQAADwAAAAAAAAAAAAAApIFaAgAAbGliL3JlcXVlc3QyLmpzUEsFBgAAAAAEAAQA4gAAAFYDAAAAAA=="
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

### Run and debug
Go to Run and Debug view, then click button `Run Synthetic Script` to run and debug the selected script.  
You can also set breakpoints and debug your script step by step.
