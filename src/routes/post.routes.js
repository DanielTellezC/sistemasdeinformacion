const { Router } = require("express");
const user = require('../models/user');
const passport = require('passport');

const router = Router()

router.get('/', isAuthenticated, (req, res, next) => {
    res.render('index');
});
// Registro de los usuarios
router.get('/signup', (req, res, next)=>{
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

// Inicio de sesión de los usuarios
router.get('/signin', (req, res, next)=>{
    res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin',{
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

// Datos del usuario

router.get('/profile', async (req, res, next) => {
    res.render('profile');
})
// Cerrar sesión
router.get('/logout', function(req, res, next){
    req.logout(function(err){
        if(err) { return next(err); }
        res.redirect('/');
    });
});
// Función que checa si el usuario está autenticado
function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
};

/*
router.get('/posts', getPosts);
router.post('/posts', createPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);
router.get('/posts/:id', getPost);*/

module.exports = router;