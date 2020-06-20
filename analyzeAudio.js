const request = require('request');
const https = require('https')
const fs = require('fs')
const stream = require('stream');
const WavDecoder = require("wav-decoder");
const Pitchfinder = require("pitchfinder");
const {YIN, frequencies} = Pitchfinder
console.log(frequencies)
const ffmpeg = require('fluent-ffmpeg');
const { isNull } = require('util');
module.exports = (audioUrl, id, callback) => {
    console.log(audioUrl)

    var file = fs.createWriteStream(`./audio/${id}.mp4`)
    
    var request = https.get(audioUrl, (response) => {
        response.pipe(file)
        ffmpeg()
        .input(`./audio/${id}.mp4`)
        .output(`./audio/${id}.wav`)
        .run();
        const buffer = fs.readFileSync(`./audio/${id}.wav`);
        const decoded = WavDecoder.decode.sync(buffer); // get audio data from file using `wav-decoder`
        const float32Array = decoded.channelData[0]; // get a single channel of sound
        const detectPitch = YIN()
        let fre = detectPitch(float32Array)
        console.log(fre)
        if(fre == null){
            fre = 0;
        }
        callback(fre)
    })
    
    
    
}