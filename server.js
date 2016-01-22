var express = require('express'),
    app = express();

require('rpg-node-mvc').bootstrap(app,function(){
    var config = require(require('rpg-node-mvc').paths('appConfig'));
    app.listen(config.port);
    console.log('aplicação iniciada em http://localhost:'+config.port);
});