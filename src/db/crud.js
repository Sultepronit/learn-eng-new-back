// import dbBlocks from "../services/dbBlocks.js";
import db from "./connection.js";

export function getDbVersion() {
    return new Promise((reslove, reject) => {
        db.get('SELECT * FROM db_version', (err, row) =>{
            if(err) {
                reject(err);
            } else {
                reslove(row);
            }
        });
    });
}

export function selectCards(columns) {   
    return new Promise((reslove, reject) => {
        db.all(`SELECT ${columns} FROM main_data`, (err, rows) => {
            if(err) {
                reject(err);
            } else {
                reslove(rows);
            }
        });
    });
}