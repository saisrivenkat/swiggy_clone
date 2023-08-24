const app = require("express");
const router = app.Router();
const {login,register,profile,address,orders} = require("../controllers/userController");

// getting one proile
router.get("/profile",profile);

// register user
router.post("/register",register);
router.get('/users',(req,res)=>res.send("Users"));
//login user
router.post("/login",login);
router.post('/address',address)
router.post('/order',orders)


module.exports = router;
