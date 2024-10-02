import { selectCards } from "../db/crud.js";
import { getRandomizedPart } from "../helpers/randomizingUtils.js";
import { transfrmDataFromDb } from "../services/dataTransformer.js";
import getColumnsFromBlocks from "../services/getColumnsFromBlocks.js";
import { checkClientVersion } from "../services/versionHandlers.js";

export default async function createTapSession(req, res) {
    try {
        const toBeUpdated = await checkClientVersion(req.query);
        delete toBeUpdated.write;
        const blocks = Object.keys(toBeUpdated);
        const columns = getColumnsFromBlocks(blocks);

        const learnList = await selectCards(columns, 'WHERE repeat_status = 0');

        const allToConfirm = await selectCards(columns, 'WHERE repeat_status = 1');
        const confirmDivisor = 5;
        const confirmNumber = Math.round(allToConfirm.length / confirmDivisor);
        const confirmList = getRandomizedPart(allToConfirm, confirmNumber);

        const maxToRepeat = 1200;
        const allToRepeat = await selectCards(
            columns,
            `WHERE repeat_status BETWEEN 2 and ${maxToRepeat}`
        );
        const repeatNumber = 15;
        const repeatList = getRandomizedPart(allToRepeat, repeatNumber);

        const content = transfrmDataFromDb(
            getRandomizedPart([...learnList, ...confirmList, ...repeatList])
        );

        res.json({
            learnNumber: learnList.length,
            confirmNumber,
            repeatNumber,
            content
        });
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
}