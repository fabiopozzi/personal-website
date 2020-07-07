const fs = require('fs')
const path = require('path')
// TODO: organizzare costanti

const copyRecursiveSync = (src, dst) => {
    var exists = fs.existsSync(src);
    var stats = exists && fs.lstatSync(src);
    var isDirectory = exists && stats.isDirectory();

    if (isDirectory) { // se il src e' una directory
        fs.mkdirSync(dst); // crea una directory destinazione
        fs.readdirSync(src).forEach(file => {
            const newSrc = path.join(src, file);
            const newDst = path.join(dst, file);
            copyRecursiveSync(newSrc, newDst);
        })
    } else {
        fs.copyFileSync(src, dst);
    }
}

const createFolder = (folderPath) => {
    try {
        // mi baso sulla posizione corrente del file e vado a creare le
        // sottodirectory
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath)
            console.log('creato ' + folderPath)
        } else {
            console.log('directory esistente')
        }
    } catch(e) {
        console.log(e)
    }
}

module.exports = {
    copyRecursiveSync,
    createFolder
}
