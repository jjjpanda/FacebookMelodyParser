    
const Jimp = require('jimp');
const teoria = require('teoria')

function scale(array, factor) {
	let scaled = [];

	for(const row of array) {
		let x = [];

		for(const item of row)
			x = x.concat(Array(factor).fill(item));

		scaled = scaled.concat(Array(factor).fill(x));
	}

	return scaled;
}

module.exports = (noteArray, callback) => {

    noteArray = noteArray.slice(noteArray.findIndex(n => n != "-"))
    let notesImage = [
        [0xFFFFFFFF],
        [0x000000FF],
        [0xFFFFFFFF],
        [0x000000FF],
        [0xFFFFFFFF],
        [0x000000FF],
        [0xFFFFFFFF],
        [0xFFFFFFFF],
        [0x000000FF],
        [0xFFFFFFFF],
        [0x000000FF],
        [0xFFFFFFFF]
    ]
    for(const note of noteArray){
        for(let key of notesImage){
            key.push(0xAAAAAAFF)
        }  
        if(note != "-"){
            //console.log(note.name() + note.accidental())
            switch(note.name() + note.accidental()){
                case "c":
                    notesImage[11] [notesImage[0].length-1] = 0x09AA77FF
                    break;
                case "c#":
                case "db":
                    notesImage[10] [notesImage[0].length-1] = 0x09AA77FF
                    break;
                case "d":
                    notesImage[9] [notesImage[0].length-1] = 0x09AA77FF
                    break;
                case "d#":
                case "eb":
                    notesImage[8] [notesImage[0].length-1] = 0x09AA77FF
                    break;
                case "e":
                    notesImage[7] [notesImage[0].length-1] = 0x09AA77FF
                    break;
                case "f":
                    notesImage[6] [notesImage[0].length-1] = 0x09AA77FF
                    break;
                case "f#":
                case "gb":
                    notesImage[5] [notesImage[0].length-1] = 0x09AA77FF
                    break;
                case "g":
                    notesImage[4] [notesImage[0].length-1] = 0x09AA77FF
                    break;
                case "g#":
                case "ab":
                    notesImage[3] [notesImage[0].length-1] = 0x09AA77FF
                    break;
                case "a":
                    notesImage[2] [notesImage[0].length-1] = 0x09AA77FF
                    break;
                case "a#":
                case "bb":
                    notesImage[1] [notesImage[0].length-1] = 0x09AA77FF
                    break;
                case "b":
                    notesImage[0] [notesImage[0].length-1] = 0x09AA77FF
                    break;
                default: 
                    
            }
        }
    }

    notesImage = scale(notesImage, 100);

    let image = new Jimp(notesImage[0].length, notesImage.length, (err, image) => {
        if (err) throw err;

        notesImage.forEach((row, y) => {
            row.forEach((color, x) => {
                image.setPixelColor(color, x, y);
            });
        });

        /* image.write('test.png', (err) => {
            if (err) throw err;
        }); */
        image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
            if (err) throw err;
            callback(buffer)
        })
    });
}