import path from 'path';
import { fileURLToPath } from 'url';
import createRecord from './createRecord.js';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const audioDir = path.join(__dirname, 'records');

const voices = {
    m1: 'en-US-RyanMultilingualNeural',
    f1: 'en-US-JennyNeural',
    m2: 'en-US-ChristopherNeural',
    f2: 'en-US-NancyMultilingualNeural'
};

export default async function findOrCreateRecord(filename) {
    const filepath = path.join(audioDir, filename.replaceAll(' ', '+'));
    // console.log(filepath);
    try {
        await fs.access(filepath);
        console.log('found the file');
    } catch (error) { // no error, just no file
        const [expression, voiceCode] = filename.split(/[_.]/);
        const voice = voices[voiceCode];
        const rate = voiceCode.includes('1') ? 1 : 0.8;
        await createRecord(expression, filepath, voice, rate);  
        console.log('created the file'); 
    }

    return filepath;
}