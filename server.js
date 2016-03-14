#!/usr/bin/env node
express = require('express');
sys     = require('util');
http = require('http');
mongoose = require('mongoose');
bodyParser = require('body-parser');

// wordfreq=require("word-frequency-analyzer");
// console.log(wordfreq);
// console.log(wordfreq.analyzeDocumentWithOptions("hello I i  love china shouldn't throw an exception if on args is ui ss s defined",100,{caseSensitivityEnabled: false, filterStopWords: true}));
app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 



app.use(function(req, res, next){
	req.getUrl = function() {
		return req.protocol + "://" + req.get('host');
	}
	return next();
});
mongoose.connect('mongodb://localhost/testwee');

server = http.createServer(app)
server.listen(8083);
console.log("server started at : 8083");

var io  = require('socket.io').listen(server);
var socketEvent = require('./socket')(io);

// var translate = require('./translate')

// var text = "Desde 1983 Nuestro grupo cuenta con una trayectoria de más de 30 años en el mundo empresarial e intereses en múltiples áreas de negocio, así como una apuesta importante que supera los 70 millones de euros de inversión. En este tiempo, nuestro objetivo principal ha sido crear un holding de empresas sólido, con proyección y recorrido en los diferentes mercados en los que nos situamos, llegando a consolidar con garantías nuestro grupo empresarial. Nuestras áreas de negocio se diversifican en diferentes sectores como energías renovables, construcción de obra pública y civil, planta de áridos y alimentación. La oportunidad nace de la evolución de nuestra división alimentaria cuyo objetivo es ofrecer un modelo de negocio diferenciador, basado en el cuidado y la salud de la persona con una alimentación sana y equilibrada. Nuestra proyección es internacional y contamos con uno de los planes de compensación más evolucionado del mercado. Basado en estos principios y una dilatada experiencia en nuestro sector (Network Marketing), hemos conseguido crear una propuesta que reúna todos los factores, para posicionarse como referente en nuestro sector. Cómo te llamas?";

// translate({
//     text: text,
//     source: 'es',
//     target: 'en'
// }, function(translation) {
//     console.log(translation);
// });