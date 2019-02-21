var amqp = require('amqplib/callback_api')
amqp.connect('amqp://rabbit:D66z3qm3ynC3@35.186.149.9', function (err, conn) {
  if (err) {
    console.log('da co loi: ', err);
    return;
  }

  conn.createChannel(function (err, ch) {
    var ex = 'logs'
    var msg = process.argv.slice(2).join(' ') || 'Hello World!'
    ch.assertExchange(ex, 'fanout', { durable: false })
    ch.publish(ex, '', new Buffer(msg))
    console.log(`[x] send '${msg}'`)
  })
  setTimeout(function () { conn.close(); process.exit(0) }, 500)
})
