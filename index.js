const express = require('express');
const { spawn } = require('child_process');

const jsReport = spawn('./jsreport',
    ['report',
        `--out=${Date.now()}.pdf`,
        '--template.name=daily-report-template.html']);

jsReport.stdout.on('data', (data) => {
    console.log(data);
});

jsReport.stderr.on('data', (data) => {
    console.log(data);
});

jsReport.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});

const app = express();

app.get('/api/report-service', (req, res) => {
    const jsReport = spawn('./jsreport',
        ['report',
            `--out=${Date.now()}.pdf`,
            '--template.name=daily-report-template.html']);

    jsReport.stdout.on('data', (data) => {
        console.log(data);
    });

    jsReport.stderr.on('data', (data) => {
        console.log(data);
    });

    jsReport.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
});


// const server = app.listen(3000);