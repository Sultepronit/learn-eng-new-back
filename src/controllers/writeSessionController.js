import { getConstsAndVars, selectCards, updateSessionVar } from "../db/crud.js";
import { getRandomizedPart } from "../helpers/randomizingUtils.js";
import { transfrmDataFromDb } from "../services/dataTransformer.js";
import getColumnsFromBlocks from "../services/getColumnsFromBlocks.js";
import { checkClientVersion } from "../services/versionHandlers.js";

export default async function createWriteSession(req, res) {
    try {
        const toBeUpdated = await checkClientVersion(req.query);
        delete toBeUpdated.tap;
        const blocks = Object.keys(toBeUpdated);
        // const columns = getColumnsFromBlocks(['articles', 'write']);
        const columns = getColumnsFromBlocks(blocks, (blocks.length < 2));

        const sessionLength = 50;

        const constsAndVars = await getConstsAndVars('write');
        console.log(constsAndVars);
        const nextRepeated = constsAndVars.next_repeated + 1;
        const maxToRepeat = constsAndVars.max_to_repeat;
        // const nextRepeated = 1000;
        // const maxToRepeat = 330;

        updateSessionVar('write', 'next_repeated', nextRepeated);

        const allToRepeat = await selectCards(
            columns,
            // `WHERE write_status BETWEEN 3 and ${maxToRepeat}`
            `WHERE repeat_status > 2 AND write_status < ${maxToRepeat}`
        );
        console.log(allToRepeat.length);
        // console.log(allToRepeat);

        if (allToRepeat.length < 400) {
            updateSessionVar('write', 'max_to_repeat', maxToRepeat + 20);
        }

        const repeatList = getRandomizedPart(allToRepeat, sessionLength);

        const cards = transfrmDataFromDb(repeatList);

        const response = {
            nextRepeated
        };

        // console.log(blocks);
        if (!blocks.length) {
            response.session = cards.map(card => card.number);
        } else {
            response.cards = cards;
        }

        res.json(response);
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
}