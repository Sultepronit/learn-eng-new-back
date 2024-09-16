import db from "./connection.js";
import { fromDb } from "../helpers/transformData.js";

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

export function getWords(articles, tap, write) {
    return new Promise((reslove, reject) => {
        db.all('SELECT * FROM main_data', (err, rows) => {
            if(err) {
                reject(err);
            } else {
                reslove(fromDb(rows, articles, tap, write));
            }
        });
    });
}