const app = require("express");
const router = app.Router();
const {login,register,profile} = require("../controllers/userController");

// getting one proile
router.get("/profile",profile);

// register user
router.post("/",register);

//login user
router.get("/",login);

module.exports = router;
