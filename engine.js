const fs = require('fs')
const path = require('path')
const tj = require('@mapbox/togeojson')
const utils = require('./utils')
const template = require('./template')
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

// copy static files
utils.createCSSFolder(destinationFolder)
utils.copyCSSFiles(lista_file, cssDirectory, destinationFolder)

template.renderList(lista_file, object_to_render)
