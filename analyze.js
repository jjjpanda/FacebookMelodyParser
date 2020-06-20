const respondTo = require("./respondTo");
const analyzeAudio = require('./analyzeAudio.js')
module.exports = (webhook_event) => {
    console.log(webhook_event);
    //console.log(`./jsons/${webhook_event.message.mid}.json`)
    //fs.writeFileSync(`./jsons/${webhook_event.message.mid}.json`, JSON.stringify(webhook_event), 'utf8')
    
    if(webhook_event.message != undefined && webhook_event.message.attachments.length == 1){
        if(webhook_event.message.attachments[0].type == 'audio' && webhook_event.message.attachments[0].payload != undefined){
            analyzeAudio(webhook_event.message.attachments[0].payload.url, webhook_event.message.mid, (analyzedAudio) => {
                respondTo(webhook_event, analyzedAudio)
            })
        }
    }
    
}