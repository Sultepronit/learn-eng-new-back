import express from 'express';
import db from '../db/database.js';

const router = express.Router();

// get all the words
router.get('/words', (req, res) => {
    db.all('SELECT * FROM main_data', (err, rows) => {
        if(err) {
            res.status(400).json({ 'error': err.message });
            return;
        }

        res.json(rows);
    });
});

export default router;