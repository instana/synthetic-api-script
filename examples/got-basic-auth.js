const assert = require('assert');

(async function(){
    const auth = Buffer.from(`${$secure.username}:${$secure.password}`).toString('base64');
    console.debug('auth is', auth);
    let gotResponse = await $got.get('https://examples.com', {
      https:{ rejectUnauthorized: false },
      headers: {
        Authorization: `Basic ${auth}`
      }}
    );

    assert.ok(gotResponse.statusCode == 200, "GET status is " + gotResponse.statusCode + ", it should be 200");
})();
