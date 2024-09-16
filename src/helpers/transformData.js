export function fromDb(inputData, getTapStats, getWriteStats) {
    // let index = 0;
    return inputData.map((row, index) => {
        const card = {
            id: row.id,
            number: index + 1,
            word: row.word,
            transcription: row.transcription,
            translation: row.translation,
            example: row.example
            // article: {
            //     word: row.word,
            //     transcription: row.transcription,
            //     translation: row.translation,
            //     example: row.example
            // }
        };

        if(getTapStats) {
            card.tapStatus = row.tap_status;
            card.tapFProgress = row.tap_f_progress;
            card.tapFRecord = row.tap_f_record;
            card.tapFAutorepeat = row.tap_f_autorepeat;
            card.tapBProgress = row.tap_b_progress;
            card.tapBRecord = row.tap_b_record;
            card.tapBAutorepeat = row.tap_b_autorepeat;
            // card.tapStats = {
            //     repeatStatus: row.tap_status,
            //     forward: {
            //         progress: row.tap_f_progress,
            //         record: row.tap_f_record,
            //         autorepeat: row.tap_f_autorepeat,
            //     },
            //     backward: {
            //         progress: row.tap_b_progress,
            //         record: row.tap_b_record,
            //         autorepeat: row.tap_b_autorepeat,
            //     }
            // };
        }

        if(getWriteStats) {
            card.writeStatus = row.write_status;
            card.writeFProgress = row.write_f_progress;
            card.writeFRecord = row.write_f_record;
            card.writeFAutorepeat = row.write_f_autorepeat;
            card.writeBProgress = row.write_b_progress;
            card.writeBRecord = row.write_b_record;
            card.writeBAutorepeat = row.write_b_autorepeat;
            // card.writeStats = {
            //     repeatStatus: row.write_status,
            //     forward: {
            //         progress: row.write_f_progress,
            //         record: row.write_f_record,
            //         autorepeat: row.write_f_autorepeat,
            //     },
            //     backward: {
            //         progress: row.write_b_progress,
            //         record: row.write_b_record,
            //         autorepeat: row.write_b_autorepeat,
            //     }
            // };
        }

        return card;
    });
}