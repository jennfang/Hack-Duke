'use strict';

var envvar = require('envvar');
var express = require('express');
var plaid = require('plaid');

var APP_PORT = envvar.number('APP_PORT', 8000);

var PLAID_CLIENT_ID = envvar.string('PLAID_CLIENT_ID', '563e666cbb7f38241cca3b4a');
var PLAID_SECRET = envvar.string('PLAID_SECRET', 'cc8080224e80dc53aa9d02480e0dea');

var plaidClient =
  new plaid.Client(PLAID_CLIENT_ID, PLAID_SECRET, plaid.environments.tartan);

// Configure Express
var app = express();
app.use(express.static('public'));
app.set('view engine', 'jade');

// AJAX endpoint that first exchanges a public_token from the Plaid Link
// module for a Plaid access token and then uses that access_token to
// retrieve account data and balances for a user.
//
// Input: a public_token
// Output: an error or an array of accounts
app.get('/transactions', function(req, res, next) {
  var public_token = req.query.public_token;

  plaidClient.exchangeToken(public_token, function(err, tokenResponse) {
    if (err != null) {
      res.json({error: 'Unable to exchange public_token'});
    } else {
      // The exchange was successful - this access_token can now be used to
      // safely pull account and routing numbers or transaction data for the
      // user from the Plaid API using your private client_id and secret.
      var access_token = tokenResponse.access_token;

      plaidClient.getConnectUser(access_token, function(err, connectResponse) {
        if (err != null) {
          res.json({error: 'Unable to pull accounts from the Plaid API'});
        }
        else {
          // Reads transaction data from the pulled account and processes it to
          // be sent to the client.
          var totalAmount = 0, totalLeftover = 0;
          // Loops through every transaction on the account
          for (var i = 0; i < connectResponse.transactions.length; i++) {
            var thisTxn = connectResponse.transactions[i];
            if (thisTxn.amount <= 0 || !withinOneMonth(thisTxn.date)) {
              connectResponse.transactions.splice(i,1);
              i--;
            }
            else {
              thisTxn.leftover = Math.round((Math.ceil(thisTxn.amount)-thisTxn.amount)*100)/100;
              totalAmount += thisTxn.amount;
              totalLeftover += thisTxn.leftover;
            }
          }
          totalAmount = Math.round(totalAmount*100)/100;
          totalLeftover = Math.round(totalLeftover*100)/100;
          res.render('data', {  totalAmount: totalAmount,
                                totalLeftover: totalLeftover,
                                numTxns: connectResponse.transactions.length,
                                transactions: connectResponse.transactions  });
        }
      });
    }
  });
});

var server = app.listen(APP_PORT, function () {
  console.log('plaid-link-demo server listening on port ' + String(APP_PORT));
});


// Takes string from transactions.date property and returns true if
// the transaction occurred less than 1 month ago. Returns false otherwise.
function withinOneMonth(date) {
  // d1 contains current date, d2 contains parameter date
  var d1 = new Date();
  var d2 = new Date(date);
  
  // Change d1 to contain the date of exactly 1 month ago
  d1.setMonth( d1.getMonth()-1 );
  if (d1.getMonth() == -1 )
    d1.setMonth() = 11;

  return d2 >= d1;
}