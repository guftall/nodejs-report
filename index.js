const express = require('express');
const jsreport = require('jsreport-core')()
const app = express();

jsreport.init().then(() => {

    app.get('/api/report-service', (req, res) => {
        jsreport.render({
            template: {
                content: '<h1>Hello {{foo}}</h1>',
                engine: 'handlebars',
                recipe: 'chrome-pdf'
            },
            data: {
                foo: "world"
            }
        }).then((resp) => {
            // prints pdf with headline Hello world
            res.end(resp.content)
            console.log(resp.content.toString())
        });
    });
}).catch((e) => {
    console.error(e)
})


const server = app.listen(3000);