const request = require('request');
const env = require('dotenv').config();
const pageToken = process.env.pageToken
module.exports = (webhook_event, message, callback) => {
    request({
        method: 'post',
        url: "https://graph.facebook.com/v7.0/me/messages?access_token="+pageToken,
        body: JSON.stringify({
          messaging_type: "RESPONSE",
          recipient: {
            id: webhook_event.sender.id
          },
          message
        }),
        headers: {
          "Content-Type": `application/json`,
        },
    }, (error, response, body) => {
        callback()
        if (!error && response.statusCode === 200) {
            console.log(error, body)
        } else {
            console.log(error, body)
        }

    });
}