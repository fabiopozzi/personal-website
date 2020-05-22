const fs = require('fs')
const path = require('path')
const utils = require('../utils')

it('calls mkdirSync with the right argument', () => {
    const destFolder = path.join('TestContent','css')
    fs.mkdirSync = jest.fn();
    utils.createCSSFolder(destFolder)
    // The argument of the first call to the function was destFolder
    expect(fs.mkdirSync).toHaveBeenCalledWith(destFolder);
});
