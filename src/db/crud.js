import db from "./connection.js";
import { fromDb } from "../helpers/transformData.js";

export function getWords(getTapStats, getWriteStats) {
    return new Promise((reslove, reject) => {
        db.all('SELECT * FROM main_data', (err, rows) =>{
            if(err) {
                reject(err);
            } else {
                reslove(fromDb(rows, getTapStats, getWriteStats));
            }
        });
    });
}