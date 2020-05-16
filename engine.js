const fs = require('fs')
const Mustache = require('mustache')

const object_to_render = {
    sidebar: [
        { "link": "about.html", "title": "About" },
        { "link": "bici.html", "title": "Bici" }
    ]
}

// lista dei file
const lista_file = [ 'index', 'about' ]

lista_file.forEach( item => {
    const input_file = item + '.ms'
    const output_file = item + '.html'

    const data = fs.readFileSync(input_file, 'utf8')
    const output = Mustache.render(data, object_to_render)
    fs.writeFile(output_file, output, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;

        console.log('File ' + output_file + ' saved!');
    })
})
