
const express =require ('express')

const router = express.Router()


//Routes
router.get('',(req,res)=>
    {
        // res.send("Hello World");
        res.render('index');
    })
router.get('/about',(req,res)=>
        {
            res.render('index');
            // res.send("Hello World");
          
        })   

router.get('/login',(req,res)=>
{
    res.render('login');
})
module.exports = router;