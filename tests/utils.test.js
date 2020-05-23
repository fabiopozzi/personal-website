const fs = require('fs')
const path = require('path')
const utils = require('../utils')

const destFolder = path.join('TestContent','css')

it('tries to create folder if doesn\'t exists', () => {
    fs.existsSync = jest.fn().mockReturnValue(false);
    fs.mkdirSync = jest.fn();
    utils.createCSSFolder(destFolder)
    // The argument of the first call to the function was destFolder
    expect(fs.mkdirSync).toHaveBeenCalledWith(destFolder);
});

it('prints a message if folder exists', () => {
    fs.mkdirSync = jest.fn();
    fs.existsSync = jest.fn().mockReturnValue(true);
    console.log = jest.fn()
    utils.createCSSFolder(destFolder)
    // The argument of the first call to the function was destFolder
    expect(console.log).toHaveBeenCalledWith('directory esistente')
});
