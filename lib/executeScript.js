const fs = require("fs");
const path = require("path");
const { NodeVM, VMScript } = require("vm2");
const uuid = require("uuid");

/**
 * @param  {number} length
 */
function generateTestID(length) {
  let result = "";
  const charSet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = charSet.length;
  let counter = 0;
  while (counter < length) {
    result += charSet.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

/**
 * @param  {string} msg
 */
function helperMsg(msg) {
  console.log(`${msg} is called`);
}

const defaultOptions = {
  testID: generateTestID(20),
  locationID: generateTestID(20),
  testName: "defaultTestName" + generateTestID(5),
  taskID: uuid.v1(),
};

const $env = {
  MONITOR_ID: defaultOptions.locationID,
  LOCATION: defaultOptions.locationID,
  pop: defaultOptions.locationID, // Used to access the location label, which is the first part in the controller.location variable.
  TEST_ID: defaultOptions.testID,
  id: defaultOptions.testID, // Used to access the identifier of Synthetic test that is executed.
  TEST_NAME: defaultOptions.testName,
  testName: defaultOptions.testName, // Used to access the test label of Synthetic test that is executed.
  TIME_ZONE: "GMT",
  timeZone: "GMT", // Used to access timezone of the PoP that runs the Synthetic test.
  JOB_ID: defaultOptions.taskID,
  taskId: defaultOptions.taskID, // Used to access the identifier of playback job/task, and it is also the result ID.
  testType: "HTTPScript", // Used to access the test type.
  description: "this is an api script test",
  labels: {},
};

const rootPath = path.resolve("../");

/**
 * @param  {string} scriptStr
 * @param  {string} scriptPath
 * @param  {string} bundlePath
 * @param  {Object} options
 */
function executeScript(scriptStr, scriptPath, bundlePath, options) {
  const vm2Global = {
    $http: require("request"),
    $got: require('got'),
    $env: $env,
    $synthetic: $env,
    $network: {
      setProxy: () => {
        helperMsg("setProxy");
      }, // Used to set a proxy server to be used for all requests (HTTP, HTTPS).
      setProxyForHttp: () => {
        helperMsg("setProxyForHttp");
      }, // Used to set a proxy server to be used for only HTTP requests.
      setProxyForHttps: () => {
        helperMsg("setProxyForHttps");
      }, // Used to set a proxy server to be used for only HTTPs requests.
      clearProxy: () => {
        helperMsg("clearProxy");
      }, // Used to remove the proxy configuration.
      getProxy: () => {
        helperMsg("getProxy");
      },
    },
    $util: {
      secrets: {
        setURLSecretsRegExps: () => {
          helperMsg("setURLSecretsRegExps");
        },
      },
      insights: {
        set: () => {
          helperMsg("$util.insights.set");
        },
        get: () => {
          helperMsg("$util.insights.get");
        },
      },
    },
    $attributes: {
      set: () => {
        helperMsg("$attributes.set");
      },
      get: () => {
        helperMsg("$attributes.get");
      },
    },
    $secure: options?.secure ? options?.secure : {},
  };

  let rootPaths = [`${__dirname}/..`];
  if (bundlePath) {
    rootPaths.push(bundlePath);
  }

  const vm2Options = {
    console: "inherit",
    eval: true,
    sandbox: vm2Global,
    require: {
      context: "sandbox",
      external: true,
      root: rootPaths,
      builtin: ["*"],
      mock: {
        "@babel/core": require("@babel/core"),
        consoleplusplus: require("consoleplusplus"),
        uuid: require("uuid"),
        ssh2: require("ssh2"),
        got: require("got"),
        "graceful-fs": require("graceful-fs"),
        "performance-now": require("performance-now"),
        urllib: require("urllib"),
        unzipper: require("unzipper"),
      },
      resolve: (moduleName) => {
        return path.resolve(rootPath, "node_modules", moduleName);
      },
    },
    strict: true,
  };

  let file = `${__dirname}/../examples/myscript.js`;
  if (scriptPath) file = scriptPath;
  const script = new VMScript(`(function(){${scriptStr}})()`, file);

  const vm2 = new NodeVM(vm2Options);
  vm2.run(script);
}

/**
 * @param  {String} scriptStr
 * @param  {Object} options
 */
function executeScriptAPI(scriptStr, options) {
  executeScript(scriptStr, path.resolve("./myscript.js"), null, options);
}

module.exports = {
  executeScript,
  executeScriptAPI,
};
