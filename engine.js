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
  { page: "introduzione", template: "introduzione1.hbs" },
  { page: "selezione", template: "selezione_iterazione2.hbs" },
  { page: "nuovo_sito", template: "nuovo_sito.hbs" },
  { page: "linux_kernel", template: "linux_kernel.hbs" },
];
const trackDirectory = "./track_data"
const gpxDirectory = "./gpx"

// copy static files
utils.copyRecursiveSync(path.join("static", "css"), path.join("content", "css"));
utils.copyRecursiveSync(path.join("static", "img"), path.join("content", "img"));
utils.copyRecursiveSync(path.join("static", "reveal"), path.join("content", "reveal"));
utils.copyRecursiveSync(gpxDirectory, path.join("content", "gpx"));

// TODO: copiare anche la cartella gpx

template.renderList(lista_pagine, view);

const trackList = template.renderTracks(trackDirectory, gpxDirectory);
trackList.sidebar = view.sidebar;
template.renderTemplate('index_bici.hbs', 'bici', trackList);
