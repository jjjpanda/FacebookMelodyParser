'use strict';
const env = require('dotenv').config();

// Imports dependencies and set up http server
const
express = require('express'),
bodyParser = require('body-parser'),
request = require('request'),
fs = require('fs'),
path = require('path'),
app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

const pageToken = process.env.pageToken
const dir = "./jsons"
if (!fs.existsSync(path.join("./", dir))){
    fs.mkdirSync(path.join("./", dir));
}

// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {  
 
    let body = req.body;
  
    // Checks this is an event from a page subscription
    if (body.object === 'page') {
  
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach(function(entry) {
  
        // Gets the message. entry.messaging is an array, but 
        // will only ever contain one message, so we get index 0
        let webhook_event = entry.messaging[0];
        console.log(webhook_event);
        fs.writeFileSync(`./jsons/${webhook_event.timestamp}_${webhook_event.sender.id}.json`, webhook_event, 'utf8')
        request({
          method: 'post',
          url: "https://graph.facebook.com/v7.0/me/messages?access_token="+pageToken,
          body: JSON.stringify({
            messaging_type: "RESPONSE",
            recipient: {
              id: webhook_event.sender.id
            },
            message: {
              "text": "Hi. I'm not a finished AI yet. 😎 Leave me alone."
            }
          }),
          headers: {
            "Content-Type": `application/json`,
          },
        }, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            
          } else {
            
          }
        });
      })
      
      // Returns a '200 OK' response to all requests
      res.status(200).send('EVENT_RECEIVED');
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  
  });

  // Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = process.env.token
      
    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
      
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
    
      // Checks the mode and token sent is correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        
        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);      
      }
    }
  });