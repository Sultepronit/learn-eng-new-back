import express from 'express';
import { getWords } from '../db/crud.js';
import 'dotenv/config';
import findOrCreateRecord from '../app/sdkSynth/findOrCreateRecord.js';

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

router.get('/audio/:filename', async (req, res) => {
    const filename = req.params.filename;

    try {
        const filepath = await findOrCreateRecord(filename);
        res.setHeader('Content-Type', 'audio/wav');
        res.sendFile(filepath, (err) => {
            if (err) res.status(404).send('File not found!');
        }); 
    } catch (error) {
        res.status(500).send('Error during finding/creating file: ' + error.message);
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