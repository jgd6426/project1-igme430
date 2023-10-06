const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handleGet = (request, response) => {
    // route to correct method based on url
    if (parsedUrl.pathname === '/style.css') {
        htmlHandler.getCSS(request, response);
    }
    else {
        htmlHandler.getIndex(request, response);
    }
};

const onRequest = (request, response) => {
    // parse information from the url
    const parsedUrl = url.parse(request.url);

};

// start server
http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1: ${port}`);
});
