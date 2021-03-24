const httpProxy = require('http-proxy');
const { spawn } = require('child_process');
var fs = require('fs');

let config = require('./jsreport.config.json');
const { Log } = require('./logger');

config.httpPort = process.env.Port || 3002

Log.debug('writing back data:', {data: JSON.stringify(config)})
fs.writeFile('jsreport.config.json', JSON.stringify(config), 'utf8', () => {

    const ls = spawn('./jsreport', ['start']);

    ls.stdout.on('data', (data) => {
        Log.debug(data)
    });

    ls.stderr.on('data', (data) => {
        Log.error(data)
    });

    ls.on('close', (code) => {
        Log.info('closed', code)
    });
});

httpProxy.createProxyServer({target:'http://localhost:3002'}).listen(3000);
