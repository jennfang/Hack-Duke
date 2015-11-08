#CHANGE FOR CHANGE PROJECT

Inspiration: 
We got the idea from Acorns, an app which invests spare change to help the user save money over time

What it does: 
Change for Change rounds up each purchase with a linked credit card to the nearest dollar. This amount will be donated to charity of the user's choice.

How we built it: 
We utilized the Plaid API, and the website was created using JavaScript, Jade, HTML, and CSS.

Challenges we ran into: 
Learning how to use the Plaid API was initially difficult. It took a significant amount of adjusting before we were able to make use of the bank data.

Accomplishments that we're proud of: 
None of us have experience with JavaScript, Jade, HTML, or CSS. The fact that we were able to learn these and build something cool in the span of 24 hours is a big accomplishment.

What we learned: 
We learned many new languages as well as how to develop on the front and back end.

What's next for Change for Change: 
Next we plan to connect Change for Change to actual bank accounts and set up the withdrawal process to make donations actually happen. Once we implement this, donating to charities will be much more frequent and convenient for users. With that, Change for Change will make progress towards combating inequality.

[Below is what we used from the plaid API]

Check out Plaid code samples and community-contributed resources to kickstart your Plaid Link integration!

## Client Libraries

Link provides a drop-in HTML snippet for the client-side integration but does requires a server-side handler to coordinate exchanging a Link `public_token` for a Plaid `access_token` via the [`/exchange_token` endpoint][10].

The `/exchange_token` endpoint is integrated into each of our client libraries. Check out some examples:

- [plaid-node][6]
- [plaid-go][7]
- [plaid-ruby][8]
- [plaid-python][9]
- [plaid-java][12]

## Sum App

We built [Sum][1] to demonstrate a sample Link client and server-side integration using our [client libraries](#client-libraries). Check out the source code in the language of your choice:
- [node.js][3]
- [go][4]
- [ruby][11]
- python (coming soon!)

Each implementation has a complete README with instructions for running the app locally!

## Community Resources

- [Ember component][5], by [@jasonkriss](https://github.com/jasonkriss)
- [Example Angular/Ionic app][13], by [@pbernasconi](https://github.com/pbernasconi)
- [Angular component][14], by [@csbarnes](https://github.com/csbarnes)

[1]: https://link-demo.plaid.com
[2]: https://plaid.com/docs/#resources
[3]: https://github.com/plaid/link/tree/master/examples/node
[4]: https://github.com/plaid/link/tree/master/examples/go
[5]: https://github.com/jasonkriss/ember-plaid
[6]: https://github.com/plaid/plaid-node#examples
[7]: https://github.com/plaid/plaid-go#exchange-a-plaid-link-public_token-for-an-access_token
[8]: https://github.com/plaid/plaid-ruby#exchanging-a-link-public_token-for-a-plaid-access_token
[9]: https://github.com/plaid/plaid-python#exchange
[10]: https://github.com/plaid/link#exchange_token-endpoint
[11]: https://github.com/plaid/link/tree/master/examples/ruby
[12]: https://github.com/plaid/plaid-java#exchange-a-plaid-link-public_token-for-an-api-access_token
[13]: https://github.com/pbernasconi/plaid-link-ionic-example
[14]: https://github.com/csbarnes/angular-plaid-link
