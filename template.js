const fs = require('fs')
const path = require('path')
const Mustache = require('mustache')
const tj = require("@mapbox/togeojson");
// node doesn't have xml parsing or a dom. use xmldom
const DOMParser = require("xmldom").DOMParser;

const renderList = (listaPagine, view) => {
    listaPagine.forEach(item => {
        const input_file = path.join('templates', item.template)
        const output_file = path.join('content', item.page + '.html')

        const data = fs.readFileSync(input_file, 'utf8')
        const output = Mustache.render(data, view)
        fs.writeFile(output_file, output, (err) => {
            // throws an error, you could also catch it here
            if (err) throw err;

            console.log('File ' + output_file + ' saved!');
        })
    })
}

const renderTracks = (trackDirectory, gpxDirectory) => {
    const view = {
      sidebar: [
        { link: "about.html", title: "About" },
        { link: "bici.html", title: "Bici" },
      ]
    };

    // ottengo lista tracce
    const listaTracce = fs.readdirSync(trackDirectory);

    listaTracce.forEach(traccia => {
        // read json file with track metadata
        const inputFile = path.join(trackDirectory, traccia)
        var trackObj = JSON.parse(fs.readFileSync(inputFile, "utf8"));

        // read and convert gpx data
        const gpxFile = path.join(gpxDirectory, trackObj.nome_file + '.gpx')
        var gpxString = fs.readFileSync(gpxFile, "utf8");
        var gpxData = new DOMParser().parseFromString(gpxString);
        var geoData = JSON.stringify(tj.gpx(gpxData));

        // add geoJSON data and mapbox data
        trackObj.gpx = geoData;
        trackObj.mapbox_key = process.env.MAPBOX_API_KEY;
        trackObj.sidebar = view.sidebar;

        // render template
        // TODO: refactor into function
        const templateFile = path.join('templates', 'bici.ms');
        const outputFile = path.join('content', trackObj.nome_file + '.html');
        const templateData = fs.readFileSync(templateFile, 'utf8');
        const pageData = Mustache.render(templateData, trackObj);
        fs.writeFile(outputFile, pageData, (err) => {
            // throws an error, you could also catch it here
            if (err) throw err;

            console.log('File ' + outputFile + ' saved!');
        })
    })
}

module.exports = {
    renderList,
    renderTracks
}