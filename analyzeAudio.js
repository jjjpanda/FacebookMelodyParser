const analyze = require("./analyze")

const request = require('request');
const Pitchfinder = require("pitchfinder");
const detectPitch = Pitchfinder.YIN();
module.exports = (audioUrl, callback) => {

    request({
        method: 'get',
        url: audioUrl,
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
          console.log("AUDIO:", body)
          let analyzedAudio
          callback(analyzedAudio)
      } else {
          
      }
  })

    
}