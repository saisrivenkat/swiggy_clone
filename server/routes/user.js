const app = require("express");
const router = app.Router();
const {login,register,profile} = require("../controllers/userController");

// getting one proile
router.get("/profile",profile);

// register user
router.post("/",register);
router.get('/users',(req,res)=>res.send("Users"));
//login user
router.post("/login",login);

module.exports = router;
