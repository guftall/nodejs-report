const { spawn } = require('child_process');
var fs = require('fs');

let config = require('./jsreport.config.json')

config.httpPort = process.env.Port

fs.writeFile('jsreport.config.json', JSON.stringify(config), 'utf8', () => {

    const ls = spawn('./jsreport', ['start']);

    ls.stdout.on('data', (data) => {
        console.log(data);
    });

    ls.stderr.on('data', (data) => {
        console.log(data);
    });

    ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
});
