const { spawn } = require('child_process');
var fs = require('fs');

let config = require('./jsreport.config.json');
const { Log } = require('./logger');

config.httpPort = process.env.Port || 3002

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


const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
