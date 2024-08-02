export function fromDb(inputData, getTapStats, getWriteStats) {
    let cardNumber = 1;
    return inputData.map(row => {
        const card = {
            main: {
                id: row.id,
                number: cardNumber++,
                word: row.word,
                transcription: row.transcription,
                translation: row.translation
            }
        };

        if(getTapStats) {
            card.tapStats = {
                repeatStatus: row.tap_status,
                forward: {
                    progress: row.tap_f_progress,
                    record: row.tap_f_record,
                    autorepeat: row.tap_f_autorepeat,
                },
                backward: {
                    progress: row.tap_b_progress,
                    record: row.tap_b_record,
                    autorepeat: row.tap_b_autorepeat,
                }
            };
        }

        if(getWriteStats) {
            card.writeStats = {
                repeatStatus: row.write_status,
                forward: {
                    progress: row.write_f_progress,
                    record: row.write_f_record,
                    autorepeat: row.write_f_autorepeat,
                },
                backward: {
                    progress: row.write_b_progress,
                    record: row.write_b_record,
                    autorepeat: row.write_b_autorepeat,
                }
            };
        }

        return card;
    });
}