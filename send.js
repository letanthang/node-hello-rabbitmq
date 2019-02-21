var amqp = require('amqplib/callback_api')
amqp.connect('amqp://rabbit:D66z3qm3ynC3@35.186.149.9', function (err, conn) {
  if (err) {
    console.log('da co loi: ', err);
    return;
  }

  conn.createChannel(function (err, ch) {
    var q = 'hello'
    var msg = 'Hello world 2 from T'
    ch.assertQueue(q, { durable: false })
    ch.sendToQueue(q, new Buffer(msg))
    console.log(`[x] send '${msg}'`)
  })
  setTimeout(function () { conn.close(); process.exit(0) }, 500)
})
