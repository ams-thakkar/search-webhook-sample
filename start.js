'use strict';

const express = require('express');
const bodyParser = require('body-parser');
var http = require('http');

const apiRoute = express();


//var url = 'http://services.att.com/search/v1/global-search?app-id=testing&start=0&row=1&fl=title&fq=_lw_data_source_s:globalsearch-catalog&facet=false&hl=false&q=';

function getResponse(url, callback){
    http.get(url, function(res) {
    	var data = '';
        res.on('data', function (chunk) {
        	data += chunk;
             });
        res.on('end', function(){
        	callback(JSON.parse(data));
        	});
        res.on('error', function (e) {
            console.error(e);
        	});
        });
	}


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

apiRoute.use(bodyParser.urlencoded({
    extended: true
}));

apiRoute.use(bodyParser.json());

apiRoute.post('/find', function(req, res) {
    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.apiAiText ? req.body.result.parameters.apiAiText : "Could not quite understand what you just said."
	//var speech = 'galaxy';
	var url = 'http://services.att.com/search/v1/global-search?app-id=testing&start=0&row=1&fl=title&fq=_lw_data_source_s:globalsearch-catalog&facet=false&hl=false&sort=defaultMarketingSequence%20asc&q='+speech;

    console.log('you entered - ',url);
    
   	getResponse(url, function(results){
    	console.log('results: ',results.response.docs[0].title[0]);
    });
    
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'webhook-nodejs-sample'
    });
});



apiRoute.listen((process.env.PORT || 8180), function() {
	console.log("Server is up and listening...");
});
