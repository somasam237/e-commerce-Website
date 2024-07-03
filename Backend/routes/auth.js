const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');

// to Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        //i need a user variable
        const user = new User({ username, email, password: await bcrypt.hash(password, 10) });
        await user.save();
        res.status(201).send('User registered');// this statement is Ai generated, i am not sure here got to check that again
    } catch (error) {
        res.status(400).send(error.message);
    }
});
/*
// Connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
});*/

module.exports = router;
