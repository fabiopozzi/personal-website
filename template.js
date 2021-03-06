const fs = require('fs')
const path = require('path')
const Handlebars = require("handlebars");

const renderTemplate = (templateName, outputName, view) => {
        // render template
        const templateFile = path.join('templates', templateName);
        const outputFile = path.join('content', outputName + '.html');
        var refreshFile = false;

        try {
            fs.accessSync(outputFile, fs.constants.F_OK);
            // if file exists
            const outfileStats = fs.statSync(outputFile);
            const templateStats = fs.statSync(templateFile);
            if (templateStats.mtime > outfileStats.mtime) {
                console.log(templateFile + " must be updated.")
                refreshFile = true;
            }
        } catch (err) {
            console.error(outputFile + ' doesn\'t exists!');
            refreshFile = true;
        }
        // console.log(outputFile + " mtime: " + outfileStats.mtime);
        // console.log(templateFile + " mtime: " + templateStats.mtime);
        if (refreshFile) {
            const templateData = fs.readFileSync(templateFile, 'utf8');

            const template = Handlebars.compile(templateData)
            const pageData = template(view);
            // bisognerebbe controllare che il file non esista gia' prima di fare il render di nuovo
            fs.writeFile(outputFile, pageData, (err) => {
                // throws an error, you could also catch it here
                if (err) throw err;

                console.log('File ' + outputFile + ' saved!');
            })
        }
}

const regPartial = (partialName) => {
    const partialFile = path.join('templates', partialName + '.hbs');
    const partialData = fs.readFileSync(partialFile, 'utf8');
    Handlebars.registerPartial(partialName, partialData);
}

const renderList = (listaPagine, view) => {
    regPartial('head')
    regPartial('headbici')
    regPartial('headreveal')
    regPartial('navbar')
    regPartial('footer')
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
        trackObj.mapbox_key = process.env.MAPBOX_API_KEY;
        trackObj.sidebar = view.sidebar;

        renderTemplate('bici.hbs', trackObj.nome_file, trackObj);
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
