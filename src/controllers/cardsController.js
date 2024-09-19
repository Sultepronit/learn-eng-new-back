import prepareCards from "../services/cardsPreparation.js";
import { deleteCard as deleteFromDb, getDbVersion, updateDbVersion } from "../db/crud.js";

export async function getCards(req, res) {
    try {    
        res.json(await prepareCards(req.query));
        console.log('sended all the cards!')
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
}

export async function postCard(req, res)  {
    try {
        await updateDbVersion(true, true, true);
        const version = await getDbVersion();

        res.json({ card: { dbid: 1111 }, version });
        
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

        res.json(await prepareCards({}));

        console.log('sended all the cards after DELETE!')
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
}