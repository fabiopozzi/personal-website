const fs = require("fs");
const path = require("path");
const utils = require("./utils");
const template = require("./template");
require("dotenv").config();

const view = {
  sidebar: [
    { link: "about.html", title: "About" },
    { link: "bici.html", title: "Bici" },
  ],
};

const lista_pagine = [
  { page: "index", template: "index.mustache" },
  { page: "about", template: "about.mustache" },
  { page: "linux", template: "linux.mustache" },
];
const cssDirectory = "./static/css";
const imgDirectory = "./static/img";
const trackDirectory = "./track_data"
const gpxDirectory = "./gpx"
const cssDestinationFolder = path.join("content", "css");
const imgDestinationFolder = path.join("content", "img");

// copy static files
utils.createCSSFolder(cssDestinationFolder);
utils.copyCSSFiles(cssDirectory, cssDestinationFolder);

utils.createCSSFolder(imgDestinationFolder);
utils.copyCSSFiles(imgDirectory, imgDestinationFolder);

template.renderList(lista_pagine, view);

const trackList = template.renderTracks(trackDirectory, gpxDirectory);
trackList.sidebar = view.sidebar;
template.renderTemplate('index_bici.mustache', 'bici', trackList);