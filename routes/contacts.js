const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {check, validationResult} = require("express-validator");

const User = require("../models/Users");
const Contact = require("../models/Contacts");

//@route    GET api/contacts
//@desc     Get all users contacts
//@access    Privat
router.get("/", authMiddleware, async (req, res) => {
    try {
        const contacts = await Contact.find({user: req.user.id}).sort({
            date: -1,
        });
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//@route    POST api/contacts
//@desc     Add new contact
//@access    Privat
router.post(
    "/",
    [authMiddleware, [check("name", "Name is required").not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {name, email, phone, type} = req.body;

        try {
            const newContact = new Contact({
                name,
                phone,
                email,
                type,
                user: req.user.id,
            });

            const contact = await newContact.save();
            res.json(contact);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

//@route    PUT api/contacts:id
//@desc     Update contact
//@access    Privat
router.put("/:id", authMiddleware, async (req, res) => {
    const {name, email, phone, type} = req.body;

    //Build contact object
    const contactFieldObj = {};
    if (name) contactFieldObj.name = name;
    if (email) contactFieldObj.email = email;
    if (phone) contactFieldObj.phone = phone;
    if (type) contactFieldObj.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({msg: "Contact not found"});

        //Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg: "Not authorized"});
        }
        contact = await Contact.findByIdAndUpdate(req.params.id,
            {$set: contactFieldObj},
            {new: true});

        res.json(contact);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//@route    DELETE api/contacts:id
//@desc     Delete contact
//@access    Privat
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({msg: "Contact not found"});

        //Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg: "Not authorized"});
        }

        await Contact.findByIdAndRemove(req.params.id);

        res.json({mag: "Contact has been deleted"});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
