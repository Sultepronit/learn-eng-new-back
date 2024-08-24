import path from 'path';
import { fileURLToPath } from 'url';
import createRecord from './synthPromise.js';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const audioDir = path.join(__dirname, 'records');

export default async function findOrCreateRecord(expression) {
    const voices = [
        ['en-US-RyanMultilingualNeural', 'm1'],
        ['en-US-JennyNeural', 'f1']
    ];
    const voiceIndex = 0;
    // const code = 'f1';
    const filename = `${expression}_${voices[voiceIndex][1]}.wav`;
    const filepath = path.join(audioDir, filename);
    console.log(filepath);
    try {
        await fs.access(filepath);
        console.log('found the file');
    } catch (error) {
        await createRecord(expression, voices[voiceIndex][0], voices[voiceIndex][1]);  
        console.log('created the file'); 
    }

    

    return filepath;
}