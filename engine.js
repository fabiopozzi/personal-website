const fs = require('fs')
const Mustache = require('mustache')

const object_to_render = {
    testo: "dai cazzo!"
}

const data = fs.readFileSync('template.ms', 'utf8')
const output = Mustache.render(data, object_to_render)

fs.writeFile('template.html', output, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    console.log('File saved!');
})
