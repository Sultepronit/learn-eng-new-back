import getAndPrepareCards from "../services/cardsPreparation.js";
import { deleteCard as deleteFromDb, getDbVersion, insertCard, selectCardBy, updateDbVersion } from "../db/crud.js";
import { transformRowToCard } from "../services/dataTransformer.js";

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
    try {
        res.json({ id, changes });
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
}

export async function postCard(req, res)  {
    try { // should check if the card number is actual!!!
        const inserted = await insertCard(req.body?.cardNumber);
        await updateDbVersion(true, true, true);

        const rawCard = await selectCardBy('number', req.body?.cardNumber);
        const card = transformRowToCard(rawCard);

        const version = await getDbVersion();

        res.json({ card, version });

        console.log('post card! 01');
    } catch (error) {
        res.status(400).json({ 'error': error.message });
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