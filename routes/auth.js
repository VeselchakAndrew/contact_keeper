const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth");

const User = require("../models/Users");

//@route    GET api/auth
//@desc     Get logged in user
//@access    Privat

router.get("/", authMiddleware, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

//@route    POST api/auth
//@desc     Auth user and get token
//@access    Public
router.post(
    "/",
    [
        check("email", "Please use a valid email").isEmail(),
        check("password", "Password is required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {email, password} = req.body;

        try {
            let user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({msg: "Invalid email"});
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({msg: "Invalid password"});
            }
            const payload = {
                user: {
                    id: user.id,
                },
            };
            jwt.sign(
                payload,
                config.get("jwtSecret"),
                {
                    expiresIn: 3600,
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({token});
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;
