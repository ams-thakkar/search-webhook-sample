'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const apiRoute = express();

apiRoute.use(bodyParser.urlencoded({
    extended: true
}));

apiRoute.use(bodyParser.json());

apiRoute.post('/find', function(req, res) {
    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.apiAiText ? req.body.result.parameters.apiAiText : "Could not quite understand what you just said."
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'webhook-nodejs-sample'
    });
});



apiRoute.listen((process.env.PORT || 8280), function() {
	console.log("Server is up and listening...");
});
