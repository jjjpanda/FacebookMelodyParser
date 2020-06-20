const teoria  = require('teoria')
module.exports = (frequencyArray) => {
    let noteArray = [];
    for( const freq of frequencyArray ){
        if(freq != null){
            noteArray.push(teoria.note.fromFrequency(freq).note)
        }
        else {
            noteArray.push("-")
        }
    }
    return noteArray
}