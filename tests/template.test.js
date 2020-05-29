const fs = require('fs')
const path = require('path')
const template = require('../template')

it('works on the right files', () => {
    const mocklist = ['file1.gpx', 'file2.gpx'];
    fs.readdirSync = jest.fn().mockReturnValue(mocklist);
    console.log = jest.fn();
    template.renderTracks('/tmp/tracks');
    // The argument of the first call to the function was destFolder
    expect(console.log).toHaveBeenCalledWith(mocklist[0]);
    expect(console.log).toHaveBeenCalledWith(mocklist[1]);
});
