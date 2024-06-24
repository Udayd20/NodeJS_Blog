const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Routes
router.get('', async (req, res) => {
    try {
        const locals = {
            title: "NodeJs Blog",
            description: "Simple blog created with Nodejs, express and mongodb"
        };
        let perPage = 25;
        let page = req.query.page || 1;

        const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute:`/`
        });
    } catch (error) {
        console.log(error);
    }
    // res.send("Hello World");
});

router.get('/post/:id', async (req, res) => {
    try {
        let slug = req.params.id;

        const data = await Post.findById({ _id: slug });

        const locals = {
            title: data.title,
            description: "Simple Blog Created with NodeJs, Express and MongoDb"
           
        };
        res.render('post', { locals, data, currentRoute:`/post/${slug}` });
    } catch (error) {
        console.log(error);
    }
});

router.post('/search', async (req, res) => {
    try {
        const locals = {
            title: "Search",
            description: "Simple blog created with NodeJS, Express and MongoDb"
        };
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
                { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
            ]
        });
        res.render("search", {
            data,
            locals
        });
    } catch (error) {
        console.log(error);
    }
});

router.get('/about', (req, res) => {
    res.render('about',{ currentRoute:`/about`});
    // res.send("Hello World");
});

router.get('/contact', (req, res) => {
    res.render('contact',{ currentRoute:`/contact`});
    
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;
