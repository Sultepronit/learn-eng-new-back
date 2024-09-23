import getAndPrepareCards from "../services/cardsPreparation.js";
import { deleteCard as deleteFromDb, getDbVersion, insertCard, selectLastCard, updateCard, updateDbVersion } from "../db/crud.js";
import { transformRowToCard, transfromCardToRow } from "../services/dataTransformer.js";
import { filterVersionToSend } from "../services/versionHandlers.js";

export async function getCards(req, res) {
    try {    
        res.json(await getAndPrepareCards(req.query));
        console.log('sended all the cards!')
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
}

export async function patchCard(req, res) {
    const id = req.params.id;
    const changes = req.body;
    const { row, blocksUpdated } = transfromCardToRow(changes);

    try {
        const updateResult = await updateCard(id, row);

        await updateDbVersion(...Object.values(blocksUpdated));
        const version = await filterVersionToSend(blocksUpdated);

        res.json({ version });
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
}

export async function postCard(req, res)  {
    try { 
        const newCardNumber = req.body?.cardNumber;
        if(!newCardNumber) res.json({ status: 'wrong input' });

        const expectedCardNumber = (await selectLastCard('number')).number + 1;
        if(expectedCardNumber !== newCardNumber) {
            res.status(400).json({ error: `get ${newCardNumber} while ${expectedCardNumber} expected!`});
            return;
        }

        await insertCard(req.body?.cardNumber);

        const newCard = await selectLastCard('id, number');
        if(newCard.number !== newCardNumber) {
            resstatus(400).json({ error: `Something went wrong!!! Last card number is ${newCard.number}`});
            return;
        }

        await updateDbVersion(true, true, true);
        const version = await getDbVersion();

        res.json({ dbid: newCard.id, version });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function deleteCard(req, res) {
    const id = req.params.id;
    console.log(id);
    try {    
        await deleteFromDb(id);

        await updateDbVersion(true, true, true);

        res.json(await getAndPrepareCards({}));

        console.log('sended all the cards after DELETE!')
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
}