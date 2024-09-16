import db from '../connection.js';
import fs from 'fs/promises';

db.serialize(async () => {
    const dropTable = 'DROP TABLE IF EXISTS db_version';
    db.run(dropTable);

    const createTable = `CREATE TABLE db_version (
        articles INTEGER DEFAULT 0,
        tap INTEGER DEFAULT 0,
        write INTEGER DEFAULT 0
    )`;
    db.run(createTable);

    const fillTable = `INSERT INTO db_version VALUES (1, 1, 1)`;
    db.run(fillTable);

//     const fillMainTable = `INSERT INTO main_data (
//         tap_status,
//         tap_f_progress,
//         tap_b_progress,
//         write_status,
//         write_f_progress,
//         write_b_progress,
//         word,
//         transcription,
//         translation,
//         example
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//     let stmt = db.prepare(fillMainTable);
//     const rawData = await readJson('./source2.json');
//     for(let i = 0; i < rawData.length; i++) {
//         stmt.run([
//             rawData[i][0],
//             rawData[i][1],
//             rawData[i][2],
//             rawData[i][3],
//             rawData[i][4],
//             rawData[i][5],
//             rawData[i][6],
//             rawData[i][7],
//             rawData[i][8],
//             rawData[i][9]
//         ]);
//     }
//     stmt.finalize();
});

db.close();