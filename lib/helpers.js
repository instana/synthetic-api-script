const fs = require("fs");

const AdmZip = require("adm-zip");

/**
 * @param  {string} fileName
 * @param  {string} rootPath
 */
function file2String(fileName, rootPath) {
  let result = {
    syntheticType: "HTTPScript",
    script: "",
  };
  let data = fs.readFileSync(rootPath);
  result.script = data.toString();
  return JSON.stringify(result);
}

/**
 * @param  {string} name
 */
function isFolder(name) {
  return fs.lstatSync(name).isDirectory();
}

/**
 * @param  {string} folderName
 */
function zipFolder(folderName) {
  let dirName = folderName.trim();
  let zip = new AdmZip();
  if (dirName.startsWith('./'))
    dirName = dirName.slice(2);
  if (dirName.endsWith('/'))
    zip.addFile(dirName);
  else
    zip.addFile(dirName + '/');

  // add folder
  zip.addLocalFolder(dirName, dirName);
  // zip.writeZip('./bundle-test.zip');
  return zip.toBuffer();
}


function zipStar(){
  let zip = new AdmZip();
  // convert bundle test without a folder to zip
  zip.addLocalFolder('.')
  // zip.writeZip('./bundle-no-folder.zip');
  return zip.toBuffer();
}

/**
 * @param  {buffer} data
 */
function base64Content(folderName, entryName = 'index.js') {
  let base64String = '';
  if(folderName === '.') {
    base64String = zipStar().toString('base64');
  }
  else if(!isFolder(folderName)) throw new Error(`${folderName} is not a folder`);
  else if (isFolder(folderName)) {
    base64String= zipFolder(folderName).toString('base64');
  }else{
    throw new Error('unknown type ' + folderName)
  }

  const result = {
    syntheticType: "HTTPScript",
    scripts:{
      scriptFile: entryName,
      bundle: base64String
    }
  };
  return JSON.stringify(result);
}

module.exports = {
  base64Content,
  file2String,
  isFolder,
};
