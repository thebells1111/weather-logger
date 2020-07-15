const mongodb = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

startup();

function startup() {
  mongodb.connect(
    process.env.DATABASE,
    { useNewUrlParser: true, useUnifiedTopology: true },
    async function (err, client) {
      if (err) {
        return console.dir(err);
      }
      new Promise((resolve, reject) => {
        client
          .db()
          .collection('sov')
          .insertOne(job, (err, result) => {
            if (err) {
              console.log('Error: ' + err);
            } else {
              console.log('avgTemps Updated!');
              client.close();
            }
          });
      });
    }
  );
}

// process.on('SIGINT', function () {
//   client.close(function () {
//     console.log('Mongoose disconnected on app termination');
//     process.exit(0);
//   });
// });
