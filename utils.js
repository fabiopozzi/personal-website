const fs = require('fs')
const path = require('path')
// TODO: organizzare costanti

const copyFiles = (sourceDir, destDir) => {
    try {
        const fileList = fs.readdirSync(sourceDir)
        fileList.forEach(item => {
            const sourceFile = path.join(sourceDir, item)
            const destFile = path.join(destDir, item)
            fs.copyFileSync(sourceFile, destFile)
            console.log('copiato ' + item)
        })
    } catch(e) {
        console.log(e)
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
    copyFiles,
    createFolder
}
