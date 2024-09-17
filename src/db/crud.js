// import dbBlocks from "../services/dbBlocks.js";
import db from "./connection.js";

// function resultCallback(err, result) {
//     return new Promise((resolve, reject) => {
//         if(err) {
//             reject(err);
//         } else {
//             resolve(result);
//         }
//     });
// }

export function getDbVersion() {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT * FROM db_version',
            (err, result) => err ? reject(err) : resolve(result)
        );
    });
}

export function selectCards(columns) {   
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT ${columns} FROM main_data`,
            (err, result) => err ? reject(err) : resolve(result)
        );
    });
}

export function deleteCard(id) {   
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM main_data WHERE id = ?', [id], (err) => {
            err ? reject(err) : resolve('deleted!');
        });
    });
}