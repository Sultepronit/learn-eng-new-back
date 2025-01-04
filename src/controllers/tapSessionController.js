import { getConstsAndVars, selectCards, updateSessionVar } from "../db/crud.js";
import { getRandomizedPart } from "../helpers/randomizingUtils.js";
import { transfrmDataFromDb } from "../services/dataTransformer.js";
import getColumnsFromBlocks from "../services/getColumnsFromBlocks.js";
import { checkClientVersion } from "../services/versionHandlers.js";

export default async function createTapSession(req, res) {
    try {
        const toBeUpdated = await checkClientVersion(req.query);
        delete toBeUpdated.write;
        const blocks = Object.keys(toBeUpdated);
        const columns = getColumnsFromBlocks(blocks, (blocks.length < 2));

        const repeatNumber = 20;
        const confirmDivisor = 5;

        const constsAndVars = await getConstsAndVars('tap');
        console.log(constsAndVars);
        const nextRepeated = constsAndVars.next_repeated + 1;
        const maxToRepeat = constsAndVars.max_to_repeat;

        updateSessionVar('tap', 'next_repeated', nextRepeated);

        const learnList = await selectCards(columns, 'WHERE repeat_status = 0');

        const allToConfirm = await selectCards(columns, 'WHERE repeat_status = 1');
        const confirmNumber = Math.round(allToConfirm.length / confirmDivisor);
        const confirmList = getRandomizedPart(allToConfirm, confirmNumber);

        const allToRepeat = await selectCards(
            columns,
            `WHERE repeat_status BETWEEN 2 and ${maxToRepeat}`
        );
        console.log(allToRepeat.length);

        if (allToRepeat.length < 400) {
            updateSessionVar('tap', 'max_to_repeat', maxToRepeat + repeatNumber);
        }

        const repeatList = getRandomizedPart(allToRepeat, repeatNumber);

        const result = {
            stages: {
                learn: learnList.length,
                confirm: confirmNumber,
                repeat: repeatNumber
            },
            nextRepeated
        };

        const cards = transfrmDataFromDb(
            getRandomizedPart([...learnList, ...confirmList, ...repeatList])
        );

        if (!blocks.length) {
            result.session = cards.map(card => card.number);
        } else {
            result.cards = cards;
        }

        res.json(result);
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
}