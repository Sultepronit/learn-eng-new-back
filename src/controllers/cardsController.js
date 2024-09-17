import prepareCards from "../services/cardsPreparation.js";

export async function getCards(req, res) {
    try {    
        res.json(await prepareCards(req.query));
        console.log('sended all the cards!')
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
}