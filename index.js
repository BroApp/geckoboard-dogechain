var request = require('request');

// Update and push the current balance every 30 seconds.
var UPDATE_INTERVAL = 30000;

// Our Dogecoin public address.
var DOGECOIN_PUBLIC_ADDRESS = 'DShDeWzfKWP37jAgedeH1ExJEQR93Czxm4';

// Our Geckoboard API key and widget specific key.
var GECKOBOARD_API_KEY = 'YOUR_GECKOBOARD_API_KEY_HERE'
  , GECKOBOARD_WIDGET_KEY = 'YOUR_GECKOBOARD_WIDGET_KEY_HERE';

// Push endpoint for our Geckoboard widgets.
var GECKOBOARD_PUSH_URL =
    'https://push.geckoboard.com/v1/send/' + GECKOBOARD_WIDGET_KEY;

// DogeChain address balance endpoint.
var DOGECHAIN_BALANCE_URL =
    'http://dogechain.info/chain/DogeCoin/q/addressbalance/' + DOGECOIN_PUBLIC_ADDRESS;

function update() {
  console.log('Fetching...');

// Fetch our address balance from DogeChain.
request.get(DOGECHAIN_BALANCE_URL, function(err, res, body) {
    if (err) {
        console.error(err);
    } else {

      // Build a Geckboard push widget payload.
      var payload = {
        api_key: GECKOBOARD_API_KEY,
        data: {
          item: [
            { text: 'Balance', value: Number(body) }
          ]
        }
      };

      // Push our address balance to Geckoboard.
      request.post(GECKOBOARD_PUSH_URL, { json: payload }, function(err, res) {
        if (err) {
          console.error(err);
        } else {
          console.log('Updated.');
        }
      });
    }
  });
}

update();
setInterval(update, UPDATE_INTERVAL);
