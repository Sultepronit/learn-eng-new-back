import { getDbVersion, selectCards } from "../db/crud.js";
import { transfrmDataFromDb } from "./dataTransformer.js";
import dbBlocks from "./dbBlocks.js";
import { checkClientVersion } from "./versionHandlers.js";

function prepareColumns(blocks) {
    if (blocks.length === 3) return '*';

    let columns = [];
    if (blocks.includes('articles')) columns.push(...dbBlocks.articles.db);
    if (blocks.includes('tap')) columns.push(...dbBlocks.tap.db);
    if (blocks.includes('write')) columns.push(...dbBlocks.write.db);

    return 'id, number, ' + columns.join(', ');
}

export default async function getAndPrepareCards(clientVersion) {
    const toBeUpdated = await checkClientVersion(clientVersion);

    const blocks = Object.keys(toBeUpdated);

    if(!blocks.length) return {};

    const rawData = await selectCards(prepareColumns(blocks));
    const data = transfrmDataFromDb(rawData);

    return {
        version: toBeUpdated,
        ...(blocks.length === 3 ? { totalUpdate: true } : null),
        data
    };
}