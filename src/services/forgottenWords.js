import { selectCards, updateCard, updateDbVersion } from "../db/crud.js";

export default async function returnForgottenWords() {
    const list = await selectCards("id", "WHERE repeat_status = -2");
    // console.log(list);
    const index = Math.floor(Math.random() * (list.length + 10));
    // console.log(index);
    if (index >= list.length) return;

    const id = list[index].id;
    console.log(`learning again: ${id}`);
    const updateResult = await updateCard(id, { "repeat_status": "0" }); 
    console.log(updateResult);
    
    await updateDbVersion(false, true, false);
}