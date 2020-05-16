const fs = require('fs')
const Mustache = require('mustache')

const object_to_render = {
    sidebar: [
        { "link": "about.html", "title": "About" },
        { "link": "bici.html", "title": "Bici" }
    ]
}

// lista dei file
// iterare su tutti i file della lista
// se esiste il template
// apri e leggi il template
// fai render dell'oggetto
// scrivi il file
const data = fs.readFileSync('template.ms', 'utf8')
const output = Mustache.render(data, object_to_render)

fs.writeFile('template.html', output, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    console.log('File saved!');
})
