const express = require("express");


const router = express.Router()


const { usersCount } = require("../controllers/user");


// route
router.get('/user', (req ,res) => {
    res.json({
        data: "hey!!!!! user"
    })
} );

router.get("/users/total", usersCount);



module.exports = router;