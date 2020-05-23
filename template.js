const fs = require('fs')
const path = require('path')
const Mustache = require('mustache')

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

module.exports = {
    renderList
}