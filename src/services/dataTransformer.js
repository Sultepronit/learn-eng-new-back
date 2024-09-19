import dbBlocks from "./dbBlocks.js";

function parseBlock(row, card, block) {
    const { db, js } = block;
    for(let i = 0; i < db.length; i++) {
        card[js[i]] = row[db[i]];
    }
}

export function transformRowToCard(row) {
    // const card = { id: row.id };
    const card = { dbid: row.id };
    if('word' in row) parseBlock(row, card, dbBlocks.articles);
    if('tap_status' in row) parseBlock(row, card, dbBlocks.tap);
    if('write_status' in row) parseBlock(row, card, dbBlocks.write);
    return card;
}

export function transfrmDataFromDb(inputData) {
    return inputData.map((row, index) => {
        const card = transformRowToCard(row);
        // card.number = index + 1;
        return card;       
    });
}

export function transfromCardToRow(card) {
    
}