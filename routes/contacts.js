const express = require("express");
const router = express.Router();

//@route    GET api/contacts
//@desc     Get all users contacts
//@acces    Privat
router.get("/", (req, res) => {
	res.send("Get all contacts");
});

//@route    POST api/contacts
//@desc     Add new contact
//@acces    Privat
router.post("/", (req, res) => {
	res.send("Add contact");
});

//@route    PUT api/contacts:id
//@desc     Update contact
//@acces    Privat
router.put("/:id", (req, res) => {
	res.send("Update contact");
});

//@route    DELETE api/contacts:id
//@desc     Delete contact
//@acces    Privat
router.delete("/:id", (req, res) => {
	res.send("Delete contact");
});

module.exports = router;
