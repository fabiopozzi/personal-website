const fs = require('fs')
const path = require('path')
const Mustache = require('mustache')
const tj = require('@mapbox/togeojson'),
// node doesn't have xml parsing or a dom. use xmldom
DOMParser = require('xmldom').DOMParser;

var gpx_file = new DOMParser().parseFromString(fs.readFileSync('giro.gpx', 'utf8'));
var converted = tj.gpx(gpx_file);

const object_to_render = {
    sidebar: [
        { "link": "about.html", "title": "About" },
        { "link": "bici.html", "title": "Bici" }
    ],
    gpx: JSON.stringify(converted)
}

// lista dei file
const lista_file = [ 'index', 'about', 'bici', 'linux' ]

lista_file.forEach( item => {
    const input_file = path.join('templates', item + '.ms')
    const output_file = path.join('content', item + '.html')

    const data = fs.readFileSync(input_file, 'utf8')
    const output = Mustache.render(data, object_to_render)
    fs.writeFile(output_file, output, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;

        console.log('File ' + output_file + ' saved!');
    })
})

