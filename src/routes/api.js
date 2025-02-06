const express = require('express');
const router = express.Router();

router.post('/contact', async (req, res) => {
    try {
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
});

module.exports = router;
