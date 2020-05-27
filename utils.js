const fs = require('fs')
const path = require('path')
// TODO: organizzare costanti

const copyCSSFiles = (cssDirectory, destinationFolder) => {
    // CSS
    try {
        const fileList = fs.readdirSync(cssDirectory)
        fileList.forEach(item => {
            const sourceFile = path.join(cssDirectory, item)
            const destFile = path.join(destinationFolder, item)
            fs.copyFileSync(sourceFile, destFile)
            console.log('copiato ' + item)
        })
    } catch(e) {
        console.log(e)
    }
}

const createCSSFolder = (destinationFolder) => {
    try {
        // mi baso sulla posizione corrente del file e vado a creare le
        // sottodirectory
        if (!fs.existsSync(destinationFolder)) {
            fs.mkdirSync(destinationFolder)
            console.log('creato ' + destinationFolder)
        } else {
            console.log('directory esistente')
        }
    } catch(e) {
        console.log(e)
    }
}

module.exports = {
    copyCSSFiles,
    createCSSFolder
}
