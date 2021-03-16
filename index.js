const express = require('express');
const { spawn } = require('child_process');

const app = express();

app.get('/api/report-service', (req, res) => {
    const jsReport = spawn('./jsreport',
        ['render',
            `--out=${Date.now()}.pdf`,
            '--template.engine=none',
            '--template.recipe=chrome-pdf',
            '--template.content=daily-report-template.html']);

    jsReport.stdout.on('data', (data) => {
        console.log(data);
    });

    jsReport.stderr.on('data', (data) => {
        console.log(data);
    });

    jsReport.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
    res.send('ok')
});


const server = app.listen(3000);