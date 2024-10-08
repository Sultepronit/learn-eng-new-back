import dbBlocks from "./dbBlocks.js";

export default function getColumnsFromBlocks(blocks, excludeId = false) {
    if (blocks.length === 3) return '*';

    let columns = excludeId ? ['number'] : ['id', 'number'];
    if (blocks.includes('articles')) columns.push(...dbBlocks.articles.db);
    if (blocks.includes('tap')) columns.push(...dbBlocks.tap.db);
    if (blocks.includes('write')) columns.push(...dbBlocks.write.db);

    return columns.join(', ');
}