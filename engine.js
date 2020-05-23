const fs = require("fs");
const path = require("path");
const tj = require("@mapbox/togeojson");
const utils = require("./utils");
const template = require("./template");
require("dotenv").config();

// node doesn't have xml parsing or a dom. use xmldom
DOMParser = require("xmldom").DOMParser;

var gpx_file = new DOMParser().parseFromString(
  fs.readFileSync("giro.gpx", "utf8")
);
var converted = tj.gpx(gpx_file);

const view = {
  sidebar: [
    { link: "about.html", title: "About" },
    { link: "bici.html", title: "Bici" },
  ],
  gpx: JSON.stringify(converted),
  mapbox_key: process.env.MAPBOX_API_KEY,
};

const lista_pagine = [
  { page: "index", template: "index.ms" },
  { page: "about", template: "about.ms" },
  { page: "bici", template: "bici.ms" },
  { page: "linux", template: "linux.ms" },
];
const cssDirectory = "./static/css";
const destinationFolder = path.join("content", "css");

// copy static files
utils.createCSSFolder(destinationFolder);
utils.copyCSSFiles(cssDirectory, destinationFolder);

template.renderList(lista_pagine, view);
