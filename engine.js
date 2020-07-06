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
  { page: "index", template: "index.hbs" },
  { page: "about", template: "about.hbs" },
  { page: "linux", template: "linux.hbs" },
  { page: "nuovo_sito", template: "nuovo_sito.hbs" },
];
const cssDirectory = "./static/css";
const imgDirectory = "./static/img";
const trackDirectory = "./track_data"
const gpxDirectory = "./gpx"
const cssDestinationFolder = path.join("content", "css");
const imgDestinationFolder = path.join("content", "img");

// copy static files
utils.createFolder(cssDestinationFolder);
utils.copyFiles(cssDirectory, cssDestinationFolder);

utils.createFolder(imgDestinationFolder);
utils.copyFiles(imgDirectory, imgDestinationFolder);

// TODO: copiare anche la cartella gpx

template.renderList(lista_pagine, view);

const trackList = template.renderTracks(trackDirectory, gpxDirectory);
trackList.sidebar = view.sidebar;
template.renderTemplate('index_bici.hbs', 'bici', trackList);
