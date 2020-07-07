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
  { page: "esempi_cat", template: "esempi_cat.hbs" },
];
const cssDirectory = "./static/css";
const imgDirectory = "./static/img";
const revealDirectory = "./static/reveal";
const trackDirectory = "./track_data"
const gpxDirectory = "./gpx"
const cssDestinationFolder = path.join("content", "css");
const imgDestinationFolder = path.join("content", "img");
const revealDestinationFolder = path.join("content", "reveal");

// copy static files
utils.copyRecursiveSync(cssDirectory, cssDestinationFolder);

utils.copyRecursiveSync(imgDirectory, imgDestinationFolder);

utils.copyRecursiveSync(revealDirectory, revealDestinationFolder);

// TODO: copiare anche la cartella gpx

template.renderList(lista_pagine, view);

const trackList = template.renderTracks(trackDirectory, gpxDirectory);
trackList.sidebar = view.sidebar;
template.renderTemplate('index_bici.hbs', 'bici', trackList);
