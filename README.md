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
script-cli examples/example1.js
```
**NOTE:** use `script-cli` if it is installed globally, use `npx script-cli` if it is installed locallly.

### Run bundle script

Specify script folder and entry file.
```shell
script-cli -d <dir> <script-entry-file>
```

Example
```shell
script-cli -d examples/bundle-example1 index.js
```

### Convert a script to string

The converted string can be used in HTTPScript test [payload](https://instana.github.io/openapi/#section/Synthetic-Test-Properties:)

```shell
script-cli -s <script-file-path>
```

Example
```shell
script-cli -s examples/http-get.js
```

Result example
```json
{
  "syntheticType":"HTTPScript",
  "script":"var assert = require(\"assert\");\n\nconst requestURL = 'https://httpbin.org/get';\n\n$http.get(requestURL, {\n strictSSL: false, // false for self signed certificate\n },\n function (err, response, body) {\n if (err) throw err;\n assert.equal(response.statusCode, 200, \"Expected a 200 OK response\");\n console.info('Request URL %s, statusCode: %d', requestURL, response.statusCode);\n }\n);\n"
}
```

### Zip and convert bundle scripts to string encoded with base64

The converted string can be used in HTTPScript test [payload](https://instana.github.io/openapi/#section/Synthetic-Test-Properties:).  

```shell
script-cli -z <bundle-script-folder> <entry-script>
```

**Note:** `bundle-script-folder` can not include its parent folder, do not use `examples/bundle-example1`, use `bundle-example1` instead.


If all test files are inside a folder, such as `bundle-example1`, its entry file should be relative path from the folder, it is `bundle-example1/index.js`. Its directory tree is as below:

```
bundle-example1
├── index.js
└── lib
    ├── request1.js
    └── request2.js

# convert it to base64
cd examples
script-cli -z bundle-example1 bundle-example1/index.js
```

Result is
``` json
{
  "syntheticType": "HTTPScript",
  "scripts": {
    "scriptFile": "bundle-example1/index.js",
    "bundle": "UEsDBBQAAAgAAAuAhlYAAAAAAAAAAAAAAAAQAAAAYnVuZGxlLWV4YW1wbGUxL1BLAwQUAAAICAA1YYZWh5XzwKAAAABQAQAAGAAAAGJ1bmRsZS1leGFtcGxlMS9pbmRleC5qc32OywrCMBBF9/mKLAqJICl2qUgRV4LYjT/Q1JEGpgkmUx9/bxosqGh3d+aew0zjbCDu4dJDoAVfp2g8SKFyNDofGzFbseadLf6yxcCyUZRxGIshs6wm8kb3BEEFIClaQHRizsXNeTwlebjkEJSxZycF1howAll4WGqBTPN6ZgopVdqVytYd/Oa5dcThbgItJ9UvF+z1k1f7ars57qpDZJ9QSwMEFAAACAAAZVx/VgAAAAAAAAAAAAAAABQAAABidW5kbGUtZXhhbXBsZTEvbGliL1BLAwQUAAAICABzYoZWD+ffAOIAAABzAQAAHwAAAGJ1bmRsZS1leGFtcGxlMS9saWIvcmVxdWVzdDEuanNtUDFuwzAM3PUKDg0kA4KcdLTRqejUoW9wbTpx4ZiuSKEpivy9lO00SzUIxPF4d2RLEws0zBgFniDiZxoiOrsitqiNaRdKiuNBCfYkMnNVlhN1+MGB4rG0tenT1MpA0yKALAdXwI8BeMj0cERxed4rAnDjOozR6wDPaoAe3qn7XqfyG3rIhALkFOkLtKy3Ts5DI4Zh6snZzTDnq3bsgaWRxM+aroIdW78Ev9uEe7+4Ca67BhVqRvcP0cPjfu/BvlxmbAU7aDIAb69/qnbTuuqv5dWYM3VJM+Jlpii8XTYfpja/UEsDBBQAAAgIAINihlZ2ffoi4wAAAHQBAAAfAAAAYnVuZGxlLWV4YW1wbGUxL2xpYi9yZXF1ZXN0Mi5qc21QMW7DMAzc9QoOLSQDghJ4jNGp6NShb3AkujFgm65IwSmK/L2S7TRLNQjU8e54oqeJBVpmjAIvEPEr9RGN3hBdNUr5lZLiUGeCvojMfDoclmVx/Xl0nkbdqC5NXnqaVgNkqU0FPwrgqdDdJ4opepsRgDvXYIw2C3jOA9DCmcL3piqn76AQKpBLpAVy2eydkocGdP3UkdH7wJLvBM9sgaWVxK8UML+Dtmvyxxz36Fd3x+2zLju1g/mHaKE+Hi3ot+uMXjBAWwD4eP9z1bvXLd+5vCk1Ukg5JF5nisL7astmGvULUEsBAhQDFAAACAAAC4CGVgAAAAAAAAAAAAAAABAAAAAAAAAAAAAQAO1BAAAAAGJ1bmRsZS1leGFtcGxlMS9QSwECFAMUAAAICAA1YYZWh5XzwKAAAABQAQAAGAAAAAAAAAAAAAAApIEuAAAAYnVuZGxlLWV4YW1wbGUxL2luZGV4LmpzUEsBAhQDFAAACAAAZVx/VgAAAAAAAAAAAAAAABQAAAAAAAAAAAAQAO1BBAEAAGJ1bmRsZS1leGFtcGxlMS9saWIvUEsBAhQDFAAACAgAc2KGVg/n3wDiAAAAcwEAAB8AAAAAAAAAAAAAAKSBNgEAAGJ1bmRsZS1leGFtcGxlMS9saWIvcmVxdWVzdDEuanNQSwECFAMUAAAICACDYoZWdn36IuMAAAB0AQAAHwAAAAAAAAAAAAAApIFVAgAAYnVuZGxlLWV4YW1wbGUxL2xpYi9yZXF1ZXN0Mi5qc1BLBQYAAAAABQAFAGABAAB1AwAAAAA="
  }
}
```


If all files are not within a folder, change directory to `bundle-example1`, its directory tree is as below:
```
├── index.js
└── lib
    ├── request1.js
    └── request2.js

# convert to base64
cd bundle-example1
script-cli -z . index.js
```

Result is:
``` json
{
  "syntheticType": "HTTPScript",
  "scripts": {
    "scriptFile": "index.js",
    "bundle": "UEsDBBQAAAgIAPyDmVaHlfPAoAAAAFABAAAIAAAAaW5kZXguanN9jssKwjAQRff5iiwKiSApdqlIEVeC2I0/0NSRBqYJJlMff28aLKhod3fmnsNM42wg7uHSQ6AFX6doPEihcjQ6HxsxW7HmnS3+ssXAslGUcRiLIbOsJvJG9wRBBSApWkB0Ys7FzXk8JXm45BCUsWcnBdYaMAJZeFhqgUzzemYKKVXalcrWHfzmuXXE4W4CLSfVLxfs9ZNX+2q7Oe6qQ2SfUEsDBBQAAAgAAONEzlYAAAAAAAAAAAAAAAAEAAAAbGliL1BLAwQUAAAICADjRM5WIIaXfzkBAABQAgAADwAAAGxpYi9yZXF1ZXN0MS5qc21SzW7CMAy+9yksBEorhZTu2Gqnaacd9gwlNVDUNV3sDKaJd5/TlqEJcogi+/P3k8S6nhhqIvQMz+DxM7QeUzVVVFYliR0hwXeFANSBeaAyz3vX4JGM8/tcVcku9JZb148ESFykGfwkAMsIN3vkNM5rqQBcsSl6r2WABhFADVvXfE9TcbU7iIAM+ODdCeRYzZ3ox3Vo2n7nUjULRn/lijQQ1xzoRdyVsCKlR+M3GXPrZ1fCKasRorpLHwA1PG02GtTreUDL2EAdC/D+9sc63tNElufADggRrMcGe27rTmwFQiDr24HXtmthbcc2mSPJpRljHmZbEtrg0Qzi8OR8U5SS566Y3ZT/JbkDalh81V3AYiGnuy7QwYWugS3COB9jzPBJ4SK75LwkyYdrgpjE8+A80/xt4qtXyS9QSwMEFAAACAgA/IOZVnZ9+iLjAAAAdAEAAA8AAABsaWIvcmVxdWVzdDIuanNtUDFuwzAM3PUKDi0kA4ISeIzRqejUoW9wJLoxYJuuSMEpivy9ku00SzUI1PHueKKniQVaZowCLxDxK/URjd4QXTVK+ZWS4lBngr6IzHw6HJZlcf15dJ5G3aguTV56mlYDZKlNBT8K4KnQ3SeKKXqbEYA712CMNgt4zgPQwpnC96Yqp++gECqQS6QFctnsnZKHBnT91JHR+8CS7wTPbIGllcSvFDC/g7Zr8scc9+hXd8ftsy47tYP5h2ihPh4t6LfrjF4wQFsA+Hj/c9W71y3fubwpNVJIOSReZ4rC+2rLZhr1C1BLAQIUAxQAAAgIAPyDmVaHlfPAoAAAAFABAAAIAAAAAAAAAAAAAACkgQAAAABpbmRleC5qc1BLAQIUAxQAAAgAAONEzlYAAAAAAAAAAAAAAAAEAAAAAAAAAAAAEADtQcYAAABsaWIvUEsBAhQDFAAACAgA40TOViCGl385AQAAUAIAAA8AAAAAAAAAAAAAAKSB6AAAAGxpYi9yZXF1ZXN0MS5qc1BLAQIUAxQAAAgIAPyDmVZ2ffoi4wAAAHQBAAAPAAAAAAAAAAAAAACkgU4CAABsaWIvcmVxdWVzdDIuanNQSwUGAAAAAAQABADiAAAAXgMAAAAA"
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
Edit file `lib/runInVscode.js` and modify variable `scriptPath` to run your script, e.g, run `http-get.js` script, scriptPath is as below:
```
const scriptPath = `${__dirname}/../examples/http-get.js`;
```

### Run and debug
Go to Run and Debug view, then click button `Run Synthetic Script` to run and debug the selected script.  
You can also set breakpoints and debug your script step by step.
