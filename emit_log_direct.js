var amqp = require('amqplib/callback_api')
amqp.connect('amqp://rabbit:D66z3qm3ynC3@35.186.149.9', function (err, conn) {
  if (err) {
    console.log('da co loi: ', err);
    return;
  }

  conn.createChannel(function (err, ch) {
    var ex = 'direct_logs'
    var args = process.argv.slice(2)
    var msg = args.join(' ') || 'Hello World!'
    var severity = (args.length > 0) ? args[0] : 'info'
    console.log('args', 'severity', args, severity)
    ch.assertExchange(ex, 'direct', { durable: false })
    ch.publish(ex, severity, new Buffer(msg))
    console.log(`[x] send '${msg}'`)
  })
  setTimeout(function () { conn.close(); process.exit(0) }, 500)
})
