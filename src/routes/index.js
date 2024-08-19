import express from 'express';
import { getWords } from '../db/crud.js';

const router = express.Router();

// get all the words
router.get('/words', async (req, res) => {
    try {    
        res.json(await getWords(true, true));
        console.log('sended all the words!')
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
});

router.patch('/words/*', async (req, res) => {
    try {
        // res.json(req.query);
        // setTimeout(() => {
        //     res.json({ id: req.params[0] });
        // }, 5000);
        res.json({ id: req.params[0] });
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
});

router.get('*', (req, res) => {
    res.send(req.params);
    console.log('request!');
    // console.log(req);
    console.log(req.params);
    console.log(req.query);
});

export default router;