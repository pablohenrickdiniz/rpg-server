module.exports = function(passport){
    var LocalStrategy = require('passport-local').Strategy;
    var node_mvc =  require('node-mvc');
    var ModelRegistry = node_mvc.ModelRegistry;
    var User = ModelRegistry.get('User');

    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                if (!user.checkPassword(password)) { return done(null, false); }
                return done(null, user);
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.serialize());
    });

    passport.deserializeUser(function(user, done) {
        user = JSON.parse(user);
        done(null, user);
    });
};
