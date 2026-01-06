const request1 = require('./lib/request1');
const request2 = require('./lib/request2');

(async function(){
    request1();
    await request2();
})()

$attributes.set('hello', 'world');

console.info('label', $synthetic);
console.info('label', $synthetic?.label?.name);
console.info('label not exist:', $synthetic?.label?.name);

console.info('env:', $synthetic.LOCATION);
