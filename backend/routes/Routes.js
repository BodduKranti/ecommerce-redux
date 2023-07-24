const router = require('express').Router();
const { singUpcontroller, loginUser, textController } = require('../Controller/signUpcontroller');
const { requireSignin, isAdmin } = require('../middleWare/authMiddleware');

//Routing for main page section
router.post("/signup", singUpcontroller)

router.post("/login", loginUser)

//Test Route
router.get("/test", requireSignin, isAdmin, textController)


module.exports = router;