import express from 'express';
import { getWords } from '../db/crud.js';

const router = express.Router();

// get all the words
router.get('/words', async (req, res) => {
    try {    
        res.json(await getWords(true, true));
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
});

export default router;