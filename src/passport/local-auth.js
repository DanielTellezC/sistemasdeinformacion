const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const users = await User.findById(id);
    done(null, users);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},async (req, email, password, done) => {

    const user = await User.findOne({email:email});

    if(user){
        return done(null, false, req.flash('signupMensaje', 'El usuario ya se encuentra registrado'));
    }else{
        const user = new User();
        user.name = req.body.name;
        user.phonenumber = req.body.phonenumber;
        user.email = email;
        user.sucursal = req.body.sucursal;
        user.puesto = req.body.puesto;
        user.password = user.encryptPassword(password);
        await user.save();
        done (null, user);
    }
}));


////////////////

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},async (req, email, password, done) => {
    
    const user = await User.findOne({email:email});

    if(!user){
        return done(null, false, req.flash('signinMensaje', 'Usuario no encontrado'));
    }
    if(!user.comparePassword(password)){   
        return done(null, false, req.flash('signinMensaje', 'Clave incorrecta'));
    }
    done(null, user);
}));

