const fse = require('fs-extra');
const config = require('../config/componenttemplate.js');
const componentname = process.argv[2];
const custumloc = process.argv[3] ? process.argv[3] + '/' : '';
const folder = './src/components/' + custumloc + componentname + '/';
var fileTypes = ['js', 'scss'];
let file = folder + componentname + '.js';
for (let i in fileTypes) {
    let filetype = fileTypes[i];
    file = folder + componentname + '.' + filetype;
    fse.outputFile(file, config[filetype]).then(
        () => {
            console.log('sucessfully created' + file)
            fse.readFile(file, 'utf8')
        }).catch(err => {
        console.error(err)
    })
}