const fs = require('fs')
const path = require('path')
const template = require('../template')

let trackDir;
const trackData = {
    nome: "Varzi - Voghera",
    tempo: "02:43",
    distanza: 39.4,
    media: 14.5,
    salita: 150,
    discesa: 470,
    nome_file: "varzi_voghera",
};

beforeAll(() => {
    // create temporary directory
    trackDir = fs.mkdtempSync('/tmp/prova_');
    trackName = path.join(trackDir, 'test.json')
    fs.writeFileSync(trackName, JSON.stringify(trackData), (err) => {
        if (err) throw err;
    });
});

/*
it('works on the right files', () => {
    const mocklist = ['file1.gpx', 'file2.gpx'];
    fs.readdirSync = jest.fn().mockReturnValue(mocklist);
    console.log = jest.fn();
    template.renderTracks('/tmp/tracks');
    // The argument of the first call to the function was destFolder
    expect(console.log).toHaveBeenCalledWith(mocklist[0]);
    expect(console.log).toHaveBeenCalledWith(mocklist[1]);
});
*/
it('loads JSON data correctly', () => {
    let data = template.loadTrackFiles(trackDir);
    const trackArray = [trackData];

    expect(data).toEqual(trackArray);
});