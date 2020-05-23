const fs = require('fs')
const path = require('path')
const Mustache = require('mustache')

const renderList = (listaFile, object_to_render) => {

    // TODO: fare in modo che possa usare lo stesso template per piu' pagine.
    // Quindi serve una struttura che associ ad ogni pagina/filename il template da
    // usare
    listaFile.forEach(item => {
        const input_file = path.join('templates', item + '.ms')
        const output_file = path.join('content', item + '.html')

        const data = fs.readFileSync(input_file, 'utf8')
        const output = Mustache.render(data, object_to_render)
        fs.writeFile(output_file, output, (err) => {
            // throws an error, you could also catch it here
            if (err) throw err;

            console.log('File ' + output_file + ' saved!');
        })
    })
}

module.exports = {
    renderList
}