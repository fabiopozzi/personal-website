const fs = require("fs");
const path = require("path");
const utils = require("./utils");
const template = require("./template");
require("dotenv").config();

const view = {
  sidebar: [
    { link: "chi_sono.html", title: "Chi sono" },
    { link: "bici.html", title: "Bici" },
  ],
};

const lista_pagine = [
  { page: "index", template: "index.hbs" },
  { page: "chi_sono", template: "about.hbs" },
  { page: "linux", template: "linux.hbs" },
  { page: "introduzione", template: "introduzione1.hbs" },
  { page: "nuovo_sito", template: "nuovo_sito.hbs" },
  { page: "linux_kernel", template: "linux_kernel.hbs" },
  { page: "doom_emacs", template: "doom_emacs.hbs" },
  { page: "dna_informatico", template: "dna_informatico.hbs" },
];
/*
  { page: "selezione", template: "selezione_iterazione2.hbs" },
  { page: "funzioni", template: "funzioni.hbs" },
*/
const trackDirectory = "./track_data"
const gpxDirectory = "./gpx"

// copy static files
utils.copyRecursiveSync(path.join("static", "css"), path.join("content", "css"));
utils.copyRecursiveSync(path.join("static", "img"), path.join("content", "img"));
utils.copyRecursiveSync(path.join("static", "reveal"), path.join("content", "reveal"));
utils.copyRecursiveSync(gpxDirectory, path.join("content", "gpx"));

template.renderList(lista_pagine, view);

const trackList = template.renderTracks(trackDirectory, gpxDirectory);
trackList.sidebar = view.sidebar;
template.renderTemplate('index_bici.hbs', 'bici', trackList);
