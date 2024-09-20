import { getDbVersion } from "../db/crud.js";

export async function checkClientVersion(clientVersion) {
    const dbVersion = await getDbVersion();

    const toBeUpdated = {};
    for(const field in dbVersion) {
        if(dbVersion[field] !== Number(clientVersion[field])) {
            toBeUpdated[field] = dbVersion[field];
        }
    }

    return toBeUpdated; 
}

export async function filterVersionToSend(blocksUpdated) {
    const dbVersion = await getDbVersion();

    const filtered = {};
    for(const field in blocksUpdated) {
        if(blocksUpdated[field]) {
            filtered[field] = dbVersion[field];
        }
    }

    return filtered;
}