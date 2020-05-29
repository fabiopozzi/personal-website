const fs = require("fs");
const path = require("path");
const utils = require("./utils");
const template = require("./template");
require("dotenv").config();


const view = {
  sidebar: [
    { link: "about.html", title: "About" },
    { link: "bici.html", title: "Bici" },
  ]
};

const lista_pagine = [
  { page: "index", template: "index.ms" },
  { page: "about", template: "about.ms" },
  { page: "bici", template: "bici.ms" },
  { page: "linux", template: "linux.ms" },
];
const cssDirectory = "./static/css";
const trackDirectory = "./track_data"
const gpxDirectory = "./gpx"
const destinationFolder = path.join("content", "css");

// copy static files
// utils.createCSSFolder(destinationFolder);
// utils.copyCSSFiles(cssDirectory, destinationFolder);

// template.renderList(lista_pagine, view);

template.renderTracks(trackDirectory, gpxDirectory);