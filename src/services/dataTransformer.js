import dbBlocks from "./dbBlocks.js";

function parseBlockToCard(row, card, block) {
    const { db, js } = block;
    for(let i = 0; i < db.length; i++) {
        card[js[i]] = row[db[i]];
    }
}

export function transformRowToCard(row) {
    const card = { dbid: row.id };
    if('word' in row) parseBlockToCard(row, card, dbBlocks.articles);
    if('tap_f_progress' in row) parseBlockToCard(row, card, dbBlocks.tap);
    if('write_status' in row) parseBlockToCard(row, card, dbBlocks.write);
    return card;
}

export function transfrmDataFromDb(inputData) {
    return inputData.map((row) => {
        const card = transformRowToCard(row);
        return card;       
    });
}

function parseBlockToRow(row, card, block) {
    let isRepresented = false;
    const { db, js } = block;
    for(let i = 0; i < js.length; i++) {
        if(!card[js[i]] && card[js[i]] !== '') continue;
        row[db[i]] = card[js[i]];
        isRepresented = true;
    }

    return isRepresented;
}

export function transfromCardToRow(card) {
    const row = {};

    const blocksPresent = {
        articles: parseBlockToRow(row, card, dbBlocks.articles),
        tap: parseBlockToRow(row, card, dbBlocks.tap),
        write: parseBlockToRow(row, card, dbBlocks.write)
    }; 

    return { row, blocksPresent };
}