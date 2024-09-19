import { getDbVersion, selectCards } from "../db/crud.js";
import { transfrmDataFromDb } from "./dataTransformer.js";
import dbBlocks from "./dbBlocks.js";

function prepareColumns(blocks) {
    if (blocks.length === 3) return '*';

    let columns = [];
    if (blocks.includes('articles')) columns.push(...dbBlocks.articles.db);
    if (blocks.includes('tap')) columns.push(...dbBlocks.tap.db);
    if (blocks.includes('write')) columns.push(...dbBlocks.write.db);

    return 'id, ' + columns.join(', ');
}

export default async function getAndPrepareCards(clientVersion) {
    const dbVersion = await getDbVersion();

    const toBeUpdated = {};
    for(const field in dbVersion) {
        if(dbVersion[field] !== Number(clientVersion[field])) {
            toBeUpdated[field] = dbVersion[field];
        }
    }

    const blocks = Object.keys(toBeUpdated);

    if(!blocks.length) return {};

    const rawData = await selectCards(prepareColumns(blocks));
    const data = transfrmDataFromDb(rawData);

    return {
        dbVersion: toBeUpdated,
        ...(blocks.length === 3 ? { totalUpdate: true } : null),
        data
    };
}