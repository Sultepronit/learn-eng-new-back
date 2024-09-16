export function fromDb(inputData, articles, tap, write) {
    return inputData.map((row, index) => {
        const card = {
            id: row.id
        };

        if (articles) {
            card.number = index + 1;
            card.word = row.word;
            card.transcription = row.transcription;
            card.translation = row.translation;
            card.example = row.example;
        }

        if (tap) {
            card.tapStatus = row.tap_status;
            card.tapFProgress = row.tap_f_progress;
            card.tapFRecord = row.tap_f_record;
            card.tapFAutorepeat = row.tap_f_autorepeat;
            card.tapBProgress = row.tap_b_progress;
            card.tapBRecord = row.tap_b_record;
            card.tapBAutorepeat = row.tap_b_autorepeat;
        }

        if (write) {
            card.writeStatus = row.write_status;
            card.writeFProgress = row.write_f_progress;
            card.writeFRecord = row.write_f_record;
            card.writeFAutorepeat = row.write_f_autorepeat;
            card.writeBProgress = row.write_b_progress;
            card.writeBRecord = row.write_b_record;
            card.writeBAutorepeat = row.write_b_autorepeat;
        }

        return card;
    });
}