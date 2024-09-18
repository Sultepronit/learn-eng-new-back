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
    if('tap_status' in row) parseBlock(row, card, dbBlocks.tap);
    if('write_status' in row) parseBlock(row, card, dbBlocks.write);
    return card;
}

export function transfrmDataFromDb(inputData) {
    return inputData.map((row, index) => {
        const card = transformRowFromDb(row);
        // card.number = index + 1;
        return card;       
    });
}