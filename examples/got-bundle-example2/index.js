const sendHTTP = require('./sendRequest');

console.debug("This is an example of bundle script test");

(async function(){
    await sendHTTP();
})()
