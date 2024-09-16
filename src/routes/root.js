import express from 'express';
import { getDbVersion, getWords } from '../db/crud.js';
import 'dotenv/config';
import findOrCreateRecord from '../app/sdkSynth/findOrCreateRecord.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

async function getData(clientVersion) {
    const dbVersion = await getDbVersion();
    console.log(clientVersion, dbVersion);

    const toBeUpdated = {};
    let blocksCount = 0;
    for(const field in dbVersion) {
        // console.log(field);
        // console.log(dbVersion[field], Number(clientVersion[field]));
        if(dbVersion[field] !== Number(clientVersion[field])) {
            toBeUpdated[field] = dbVersion[field];
            blocksCount++;
        }
    }

    console.log(blocksCount, toBeUpdated);

    // if(!blocksCount) return { status: 'up-to-date' };
    // if(!blocksCount) return { toBeUpdated };
    if(!blocksCount) return {};

    const data = await getWords(
        !!toBeUpdated.articles, !!toBeUpdated.tap, !!toBeUpdated.write
    );

    // return data;
    return {
        dbVersion: toBeUpdated,
        ...(blocksCount === 3 ? { totalUpdate: true } : null ),
        data
    };
}

// get all the words
router.get('/words', async (req, res) => {
    try {    
        res.json(await getData(req.query));
        console.log('sended all the words!')
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
});

router.post('/words', async (req, res) => {
    try {
        res.json({ success: true });
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
        res.json({ id: req.params[0] });
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
});

// send all the cards after deleting one
router.delete('/words/:id', async (req, res) => {
    try {    
        res.json(await getWords(true, true));
        console.log('sended all the words!')
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