const request = require('request');
const https = require('https')
const fs = require('fs')
const stream = require('stream');
const WavDecoder = require("wav-decoder");
const Pitchfinder = require("pitchfinder");
const {AMDF} = Pitchfinder
const frequencies = Pitchfinder.default.frequencies
const ffmpeg = require('fluent-ffmpeg');
module.exports = (audioUrl, id, callback) => {
    console.log(audioUrl)

    var file = fs.createWriteStream(`./audio/${id}.mp4`)
    
    file.on('finish', () => {
        ffmpeg()
        .input(`./audio/${id}.mp4`)
        .output(`./audio/${id}.wav`)
        .on('end', () => {
            const buffer = fs.readFileSync(`./audio/${id}.wav`);
            const decoded = WavDecoder.decode.sync(buffer); // get audio data from file using `wav-decoder`
            const float32Array = decoded.channelData[0]; // get a single channel of sound
            const detectPitch = AMDF({
                minFrequency: "80",
                maxFrequency: "1500"
            })
            let detectedFreq = frequencies(detectPitch, float32Array, {
                tempo: 130,
                quantization: 4
            })
            console.log(detectedFreq)
            callback(detectedFreq)
        })
        .run();
        
    })

    var request = https.get(audioUrl, (response) => {
        response.pipe(file)
    })
    
    
    
}