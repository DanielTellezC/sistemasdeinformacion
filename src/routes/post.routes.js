const { Router } = require("express");
const user = require('../models/user');
const passport = require('passport');
const articulo = require('../models/inventario')
const sucursal = require('../models/sucursal');

const router = Router()

router.get('/', (req, res, next) => {
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

router.get('/profile', isAuthenticated, async (req, res, next) => {
    res.render('profile');
})

/* Editar la información del usuario */
router.get("/edit_profile/:id", isAuthenticated, async(req, res, next) =>{
    const User = await user.findById(req.params.id).lean();
    res.render("edit_profile", { User });
    
});
router.post("/edit_profile/:id", isAuthenticated, async(req, res, next) =>{
    const { id } = req.params;
    console.log('Esta es lo que arroja', req.body);
    await user.findByIdAndUpdate(id, req.body);
    res.redirect('/profile');
});
// Vista del inventario y agregar un producto
router.get("/inventario", isAuthenticated, async (req, res, next) =>{
    const Articulo = await articulo.find();
    res.render("inventario", {Articulo});
});

router.post("/agregar-articulo", isAuthenticated, async(req, res, next) => {
    const articulonuevo = articulo(req.body);
    const user = req.user.id;
    articulonuevo.cuenta = user;
    const save_articulo = await articulonuevo.save();
    console.log(save_articulo);
    res.redirect('agregar-articulo');
});

router.get('/borrar-articulo/:id', isAuthenticated, async(req,res,next) =>{
    const { id } = req.params;
    console.log('Este es el que se borra:', req.body);
    await articulo.findByIdAndDelete(id, req.body);
    res.redirect('/inventario');
});
router.get("/edit-articulo/:id", isAuthenticated, async (req, res, next) => {
    const Sucursal = await sucursal.find();
    const Articulo = await articulo.findById(req.params.id).lean();
    res.render("edit-articulo", { Articulo, Sucursal});
});

router.post("/edit-articulo/:id", async(req, res, next) =>{
    const { id } = req.params;
    console.log("id: aticislo: ",id);
    console.log('Esta es lo que arroja', req.body);
    await articulo.findByIdAndUpdate(id, req.body);
    res.redirect('/inventario');
});

//agregar producto al inventario
router.get("/agregar-articulo", isAuthenticated, async(req, res, next) =>{
    const Sucursal = await sucursal.find();
    res.render("agregar-articulo", { Sucursal })
});

// Sucursales

router.get("/sucursal", async(req, res, next) => {
    const Sucursal = await sucursal.find();
    res.render('sucursal', { Sucursal });
});

router.get("/agregar-sucursal", (req,res,next) => {
    res.render("agregar-sucursal");
});

router.post("/agregar-sucursal", isAuthenticated, async(req, res, next) => {
    const Sucursalnueva = sucursal(req.body);
    const save_sucursal = await Sucursalnueva.save();
    console.log(save_sucursal);
    res.redirect('sucursal');
});

router.get('/borrar-sucursal/:id', isAuthenticated, async(req,res,next) =>{
    const { id } = req.params;
    console.log('Este es el que se borra:', req.body);
    await sucursal.findByIdAndDelete(id, req.body);
    res.redirect('/sucursal');
});

router.get("/editar-sucursal/:id", isAuthenticated, async (req, res, next) => {
    const Sucursal = await sucursal.findById(req.params.id).lean();
    res.render("editar-sucursal", { Sucursal });
});

router.post("/editar-sucursal/:id", async(req, res, next) =>{
    const { id } = req.params;
    console.log("id: aticislo: ",id);
    console.log('Esta es lo que arroja', req.body);
    await sucursal.findByIdAndUpdate(id, req.body);
    res.redirect('/sucursal');
});
// usuarios registrados
router.get('/usuarios', isAuthenticated, async(req, res, next) => {
    const User = await user.find();
    res.render("usuarios", { User })
});

router.get('/editar-usuario/:id', isAuthenticated, async(req, res, next) => {
    const User = await user.findById(req.params.id).lean();
    res.render("editar-usuario", { User });
});
router.post("/editar-usuario/:id", isAuthenticated, async(req, res, next) =>{
    const { id } = req.params;
    console.log('Esta es lo que arroja', req.body);
    await user.findByIdAndUpdate(id, req.body);
    res.redirect('/usuarios');
});
router.get("/guias", isAuthenticated, async(req, res, next) => {
    const Sucursal = await sucursal.find();
    res.render("guias", { Sucursal});
});
// Cerrar sesión
router.get('/logout', isAuthenticated, function(req, res, next){
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


module.exports = router;