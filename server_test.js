var express = require('express'),
    expressSession = require('express-session'),
    app = express();

app.use(expressSession({
    secret:'secret',
    resave:true,
    saveUninitialized:true,
    cookie:{
        httpOnly:false,
        expires:false
    }
}));

app.all('/',function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    var session = req.session;
    if(session.count){
        session.count++;
    }
    else{
        session.count = 1;
    }
    console.log('count:',session.count);
    console.log('id:',req.sessionID);
    res.end(JSON.stringify({count:session.count}));
});

app.listen(9090);
console.log('server is running at http://localhost:9090');