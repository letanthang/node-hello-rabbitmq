var amqp = require('amqplib/callback_api')
amqp.connect('amqp://rabbit:D66z3qm3ynC3@35.186.149.9', function (err, conn) {
  if (err) {
    console.log('da co loi: ', err);
    return;
  }

  conn.createChannel(function (err, ch) {
    var ex = 'logs'

    ch.assertExchange(ex, 'fanout', { durable: false })
    ch.assertQueue('', { exclusive: true }, function (err, q) {
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      ch.bindQueue(q.queue, ex, '')
      ch.consume(q.queue, function (msg) {
        console.log("[x] Received %s", msg.content.toString())
      }, { noAck: true })
    })


  })
})