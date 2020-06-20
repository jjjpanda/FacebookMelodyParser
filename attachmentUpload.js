const request = require('request')
const env = require('dotenv').config();
const pageToken = process.env.pageToken
module.exports = (buffer, callback) => {
    request({
        method: 'post',
        url: "https://graph.facebook.com/v7.0/me/message_attachments?access_token="+pageToken,
        formData: {
          filedata: {
            value: buffer,
            options: {
              filename: 'notes.png',
              contentType: 'image/png',
            },
          },
          message: JSON.stringify({
            "attachment": {
              "type":"image", 
              "payload":{"is_reusable":true}
            }
          })
        }
    }, (error, response, body) => {
        console.log(body)
        if (!error && response.statusCode === 200) {
          
            callback(false, JSON.parse(body).attachment_id)
        } else {
            console.log(error)
            callback(true)
        }
    });
}