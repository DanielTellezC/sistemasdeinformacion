const { Router } = require("express");

const router = Router()

router.get('/', (req, res, next) => {
    res.send("hola perro")
});

router.get('/signin', async (req, res, next) =>{
    res.render('signin');
});

/*
router.get('/posts', getPosts);
router.post('/posts', createPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);
router.get('/posts/:id', getPost);*/

module.exports = router;