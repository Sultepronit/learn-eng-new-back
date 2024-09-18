import express from 'express';
// import { getDbVersion, getWords } from '../db/crud.js';
import 'dotenv/config';
import findOrCreateRecord from '../app/sdkSynth/findOrCreateRecord.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { deleteCard, getCards } from '../controllers/cardsController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/cards', getCards);

router.delete('/cards/:id', deleteCard);

router.post('/cards', async (req, res) => {
    try {
        res.json({ success: true });
        // res.json({ dbid: 1111 });
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
})

router.patch('/words/*', async (req, res) => {
    try {
        // res.json(req.query);
        // setTimeout(() => {
        //     res.json({ id: req.params[0] });
        // }, 5000);
        // res.json({ id: req.params[0] });
        res.json({ success: true });
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
});

router.get('/audio/:filename', async (req, res) => {
    const filename = req.params.filename;

    try {
        const filepath = await findOrCreateRecord(filename);
        // res.setHeader('Content-Type', 'audio/wav');
        res.sendFile(filepath, (err) => {
            if (err) res.status(404).send('File not found!');
        }); 
    } catch (error) {
        res.status(500).send('Error during finding/creating file: ' + error.message);
    }
});

router.get('/audio-temp/:filename', async (req, res) => {
    const filename = req.params.filename;

    try {
        const filepath = await findOrCreateRecord(filename, true);
        // res.setHeader('Content-Type', 'audio/wav');
        res.sendFile(filepath, (err) => {
            if (err) res.status(404).send('File not found!');
        }); 
    } catch (error) {
        res.status(500).send('Error during finding/creating file: ' + error.message);
    }
});

router.get('/scripts/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(
        __dirname,
        `../app/sdkSynth/scripts/${filename}`
    );
    res.sendFile(filepath, (err) => {
        if (err) res.status(404).send('File not found!');
    })
});

router.get('*', (req, res) => {
    res.send(req.params);
    console.log('request!');
    // console.log(req);
    console.log(req.params);
    console.log(req.query);
});

export default router;