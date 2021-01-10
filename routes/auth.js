const express = require("express");
const router = express.Router();

//@route    GET api/contacts
//@desc     Get logged in user
//@acces    Privat
router.get("/", (req, res) => {
	res.send("Get logged in user");
});

//@route    POST api/auth
//@desc     Auth user and get token
//@acces    Public
router.post("/", (req, res) => {
	res.send("Log in user");
});

module.exports = router;
