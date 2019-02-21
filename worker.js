var amqp = require('amqplib/callback_api')
amqp.connect('amqp://rabbit:D66z3qm3ynC3@35.186.149.9', function (err, conn) {
  if (err) {
    console.log('da co loi: ', err);
    return;
  }

  conn.createChannel(function (err, ch) {
    var q = 'task_queue1'

    ch.assertQueue(q, { durable: true })
    ch.prefetch(1)
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function (msg) {
      var secs = msg.content.toString().split('.').length - 1
      secs = secs > 0 ? secs : 0
      console.log("[x] Received %s", msg.content.toString())
      setTimeout(function () {
        console.log("[x] Done")
        ch.ack(msg)
      }, secs * 1000)
    }, { noAck: false })
  })
})