const fs = require('fs')
const path = require('path')
const Mustache = require('mustache')
const tj = require('@mapbox/togeojson')
const utils = require('./utils')
require('dotenv').config()

// node doesn't have xml parsing or a dom. use xmldom
DOMParser = require('xmldom').DOMParser;

var gpx_file = new DOMParser().parseFromString(fs.readFileSync('giro.gpx', 'utf8'));
var converted = tj.gpx(gpx_file);

const object_to_render = {
    sidebar: [
        { "link": "about.html", "title": "About" },
        { "link": "bici.html", "title": "Bici" }
    ],
    gpx: JSON.stringify(converted),
    mapbox_key: process.env.MAPBOX_API_KEY
}

// lista dei file
const lista_file = [ 'index', 'about', 'bici', 'linux' ]
const cssDirectory = './static/css'
const destinationFolder = path.join('content','css')

utils.createCSSFolder(destinationFolder)
utils.copyCSSFiles(lista_file, cssDirectory, destinationFolder)
// copy static files
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
