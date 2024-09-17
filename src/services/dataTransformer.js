import dbBlocks from "./dbBlocks.js";

function parseBlock(row, card, block) {
    const { db, js } = block;
    for(let i = 0; i < db.length; i++) {
        card[js[i]] = row[db[i]];
    }
}

function transformRowFromDb(row) {
    const card = { id: row.id };
    if(row.word) parseBlock(row, card, dbBlocks.articles);
    if(row.tap_status) parseBlock(row, card, dbBlocks.tap);
    if(row.write_status) parseBlock(row, card, dbBlocks.write);
    return card;
}

export function transfrmDataFromDb(inputData) {
    return inputData.map((row, index) => {
        const card = transformRowFromDb(row);
        card.number = index + 1;
        return card;       
    });
}

// export function fromDb(inputData, articles, tap, write) {
//     return inputData.map((row, index) => {
//         const card = {
//             id: row.id
//         };

//         if (articles) {
//             card.number = index + 1;
//             card.word = row.word;
//             card.transcription = row.transcription;
//             card.translation = row.translation;
//             card.example = row.example;
//         }

//         if (tap) {
//             card.tapStatus = row.tap_status;
//             card.tapFProgress = row.tap_f_progress;
//             card.tapFRecord = row.tap_f_record;
//             card.tapFAutorepeat = row.tap_f_autorepeat;
//             card.tapBProgress = row.tap_b_progress;
//             card.tapBRecord = row.tap_b_record;
//             card.tapBAutorepeat = row.tap_b_autorepeat;
//         }

//         if (write) {
//             card.writeStatus = row.write_status;
//             card.writeFProgress = row.write_f_progress;
//             card.writeFRecord = row.write_f_record;
//             card.writeFAutorepeat = row.write_f_autorepeat;
//             card.writeBProgress = row.write_b_progress;
//             card.writeBRecord = row.write_b_record;
//             card.writeBAutorepeat = row.write_b_autorepeat;
//         }

//         return card;
//     });
// }