var passport = require('passport');
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
                username: 'phydokz',
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
         * @Uri("/");
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
        login: [passport.authenticate('local'),function(req,res,next){
            res.end(JSON.stringify(req.session.passport.user));
        }]
    }
};

