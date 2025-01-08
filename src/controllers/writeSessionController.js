import { getConstsAndVars, selectCards, updateSessionVar } from "../db/crud.js";
import { getRandomizedPart } from "../helpers/randomizingUtils.js";
import { transfrmDataFromDb } from "../services/dataTransformer.js";
import getColumnsFromBlocks from "../services/getColumnsFromBlocks.js";
// import { checkClientVersion } from "../services/versionHandlers.js";

export default async function createWriteSession(req, res) {
    try {
        // const toBeUpdated = await checkClientVersion(req.query);
        // delete toBeUpdated.write;
        // const blocks = Object.keys(toBeUpdated);
        const columns = getColumnsFromBlocks(['articles', 'write']);

        // const repeatNumber = 20;
        // const confirmDivisor = 5;

        const sessionLength = 60;

        // const constsAndVars = await getConstsAndVars('tap');
        // console.log(constsAndVars);
        // const nextRepeated = constsAndVars.next_repeated + 1;
        // const maxToRepeat = constsAndVars.max_to_repeat;
        const nextRepeated = 1000;
        const maxToRepeat = 500;

        // updateSessionVar('tap', 'next_repeated', nextRepeated);

        // const learnList = await selectCards(columns, 'WHERE repeat_status = 0');

        // const allToConfirm = await selectCards(columns, 'WHERE repeat_status = 1');
        // const confirmNumber = Math.round(allToConfirm.length / confirmDivisor);
        // const confirmList = getRandomizedPart(allToConfirm, confirmNumber);

        const allToRepeat = await selectCards(
            columns,
            `WHERE write_status BETWEEN 3 and ${maxToRepeat}`
        );
        console.log(allToRepeat.length);
        // console.log(allToRepeat);

        // if (allToRepeat.length < 400) {
        //     updateSessionVar('tap', 'max_to_repeat', maxToRepeat + repeatNumber);
        // }

        const repeatList = getRandomizedPart(allToRepeat, sessionLength);

        // const result = {
        //     stages: {
        //         learn: learnList.length,
        //         confirm: confirmNumber,
        //         repeat: repeatNumber
        //     },
        //     nextRepeated
        // };

        // const cards = transfrmDataFromDb(
        //     getRandomizedPart([...learnList, ...confirmList, ...repeatList])
        // );

        // if (!blocks.length) {
        //     result.session = cards.map(card => card.number);
        // } else {
        //     result.cards = cards;
        // }

        const response = {
            cards: transfrmDataFromDb(repeatList),
            sessionLength,
            nextRepeated
        }

        res.json(response);
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
}