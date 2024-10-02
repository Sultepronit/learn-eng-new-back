import { selectCards } from "../db/crud.js";
import { transfrmDataFromDb } from "./dataTransformer.js";
import getColumnsFromBlocks from "./getColumnsFromBlocks.js";
import { checkClientVersion } from "./versionHandlers.js";

// do we need it here, or just move to the controller?
export default async function getAndPrepareCards(clientVersion) {
    const toBeUpdated = await checkClientVersion(clientVersion);
    const blocks = Object.keys(toBeUpdated);

    if(!blocks.length) return {};

    // const rawData = await selectCards(prepareColumns(blocks));
    const rawData = await selectCards(getColumnsFromBlocks(blocks));
    const data = transfrmDataFromDb(rawData);

    return {
        version: toBeUpdated,
        ...(blocks.length === 3 ? { totalUpdate: true } : null),
        data
    };
}