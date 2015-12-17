var passport = require('passport'),
    bodyParser = require('body-parser'),
    jsonParser = bodyParser.json(),
    bcrypt = require('bcrypt'),
    crypto = require('crypto');

module.exports = {
    __constructor:function(){
        var self = this;
        self.name = 'users';
        self.modelName = 'User';
    },
    methods: {
        /**
         * @Method("setup");
         * @RequestMethod("GET");
         */
        setup: function (req, res, next) {
            var self = this;
            self.User.save({
                username: 'phydokz@hotmail.com',
                password: '123teste',
                role: 'admin',
                'profile.email': 'phydokz@hotmail.com',
                'profile.fullname': "Pablo Henrick Diniz",
                'profile.birthdate': Date.now()
            }, function (err) {
                if (err) {
                    res.end(JSON.stringify(err));
                }
                else {
                    res.end(JSON.stringify({success: true}));
                }
            });
        },
        /**
         * @Method("add");
         * @RequestMethod("POST");
         * @Uri("/");
         */
        add: function (req, res, next) {
            var self = this;
            self.User.save(req.body, function (err) {
                if (err) {
                    res.end(JSON.stringify(err));
                }
                else {
                    res.end(JSON.stringify({success: true}));
                }
            });
        },
        /**
         * @Method("delete");
         * @RequestMethod("GET");
         * @RequestMethod("DELETE");
         * @Uri("/delete");
         * @allow("admin");
         */
        delete: function (req, res, next) {
            var self = this;
            self.User.remove({}, function (err) {
                if (err) {
                    res.end(JSON.stringify(err));
                }
                else {
                    res.end(JSON.stringify({success: true}));
                }
            });
        },
        /**
         * @Method("list");
         * @RequestMethod("GET");
         * @allow("admin");
         */
        list: function (req, res, next) {
            var self = this;
            self.User.find({role: 'admin'}, function (err, result) {
                if (err) {
                    res.end(JSON.stringify([]));
                }
                else {
                    res.end(JSON.stringify(result));
                }
            });

        },
        /**
         * @Method("login");
         * @RequestMethod("POST");
         */
        login: [jsonParser,function(req,res,next){
            var self = this;

            var callback = function(data){
                res.end(JSON.stringify(data));
            };

            self.User.findOne({username:req.body.username},function(err,doc){
                if(err || !doc){
                    callback({
                        success:false,
                        error:'Usuário ou senha inválidos'
                    });
                }
                else{
                    bcrypt.compare(req.body.password,doc.password,function(err,res){
                        if(err || !res){
                            callback({
                                success:false
                            });
                        }
                        else{
                            doc.generateAccessToken(function(accessToken){
                                callback({
                                    success:true,
                                    auth:{
                                        userId:doc._id,
                                        role:doc.role,
                                        accessToken:accessToken
                                    }
                                });
                            });
                        }
                    });
                }
            });

        }],
        /**
         * @Method("logout");
         * @RequestMethod("GET");
         */
        logout:function(req,res,next){
            req.session.destroy();
            res.send(JSON.stringify({success:true}));
        }
    }
};

