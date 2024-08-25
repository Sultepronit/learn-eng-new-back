import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { audioDir } from "./findOrCreateRecord.js";

export default async function createRecord(text, filepath, voice, rate) {
    console.time('creating file');
    return new Promise((resolve, reject) => {
        // const filePath = `${audioDir}/${filename}.wav`;

        const key = process.env.SPEECH_KEY;
        const region = process.env.SPEECH_REGION;
        const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
        speechConfig.speechSynthesisVoiceName = voice;
        const audioConfig = sdk.AudioConfig.fromAudioFileOutput(filepath);
        const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

        const ssmlText = `
        <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
            <voice name="${voice}">
                <prosody rate="${rate}" volume="150">
                    ${text}
                </prosody>
            </voice>
        </speak>`;
        
        synthesizer.speakSsmlAsync(ssmlText,
            result => {
                if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                    resolve('Success!');
                    console.timeEnd('creating file');
                } else {
                    reject(result.errorDetails);
                }
                synthesizer.close();
            },
            error => {
                synthesizer.close();
                reject(error);
            }
        );
    });
}