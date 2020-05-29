const fs = require('fs')
const path = require('path')
const Mustache = require('mustache')
const tj = require("@mapbox/togeojson");
// node doesn't have xml parsing or a dom. use xmldom
const DOMParser = require("xmldom").DOMParser;

const renderTemplate = (templateName, outputName, view) => {
        // render template
        const templateFile = path.join('templates', templateName);
        const outputFile = path.join('content', outputName + '.html');
        const templateData = fs.readFileSync(templateFile, 'utf8');

        const pageData = Mustache.render(templateData, view);
        fs.writeFile(outputFile, pageData, (err) => {
            // throws an error, you could also catch it here
            if (err) throw err;

            console.log('File ' + outputFile + ' saved!');
        })
}

const renderList = (listaPagine, view) => {
    listaPagine.forEach(item => {
        renderTemplate(item.template, item.page, view);
    })
}

const loadTrackFiles = (trackDirectory) => {
    var trackArray = [];

    // ottengo lista tracce
    const listaTracce = fs.readdirSync(trackDirectory);
    listaTracce.forEach(traccia => {
        // read json file with track metadata
        const inputFile = path.join(trackDirectory, traccia)
        var trackObj = JSON.parse(fs.readFileSync(inputFile, "utf8"));
        trackArray.push(trackObj);
    });

    return trackArray;
}

const renderTracks = (trackDirectory, gpxDirectory) => {
    const view = {
      sidebar: [
        { link: "about.html", title: "About" },
        { link: "bici.html", title: "Bici" },
      ]
    };

    const trackArray = loadTrackFiles(trackDirectory);

    trackArray.forEach(trackObj => {
        // read and convert gpx data
        const gpxFile = path.join(gpxDirectory, trackObj.nome_file + '.gpx')
        var gpxString = fs.readFileSync(gpxFile, "utf8");
        var gpxData = new DOMParser().parseFromString(gpxString);
        var geoData = JSON.stringify(tj.gpx(gpxData));

        // add geoJSON data and mapbox data
        trackObj.gpx = geoData;
        trackObj.mapbox_key = process.env.MAPBOX_API_KEY;
        trackObj.sidebar = view.sidebar;

        renderTemplate('bici.ms', trackObj.nome_file, trackObj);
    })

    let trackList = {
      listaTracce: []
    };
    trackArray.forEach(trackObj => {
        trackList.listaTracce.push({link: trackObj.nome_file + '.html', title: trackObj.nome});
    });
    return trackList;
}

module.exports = {
    loadTrackFiles,
    renderTemplate,
    renderList,
    renderTracks
}