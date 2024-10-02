import db from "./connection.js";

export function getDbVersion() {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT * FROM db_version',
            (err, result) => err ? reject(err) : resolve(result)
        );
    });
}

export function updateDbVersion(articles = false, tap = false, write = false) {
    const blocks = [];
    if (articles)   blocks.push('articles = articles + 1');
    if (tap)        blocks.push('tap = tap + 1');
    if (write)      blocks.push('write = write + 1');
    const changes = blocks.join(', ');

    const query = `UPDATE db_version SET ${changes} WHERE ROWID = 1`;

    return new Promise((resolve, reject) => {
        db.run(query, (err) => err ? reject(err) : resolve('updated!'));
    });
}

export function selectCards(columns, conditions) {   
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT ${columns} FROM main_data ${conditions}`,
            (err, result) => err ? reject(err) : resolve(result)
        );
    });
}

// export function selectCardBy(column, value, columns) {
//     return new Promise((resolve, reject) => {
//             db.get(`SELECT ${columns} FROM main_data WHERE ${column} = ?`, [value], (err, result) => {
//             err ? reject(err) : resolve(result)
//         });
//     });
// }

export function selectLastCard(columns = '*') {
    return new Promise((resolve, reject) => {
        db.get(`SELECT ${columns} FROM main_data ORDER BY id DESC LIMIT 1`, (err, result) => {
            err ? reject(err) : resolve(result)
        });
    });
}

export function updateCard(id, changes) {
    return new Promise((resolve, reject) => {
        const columns = Object.keys(changes);
        const values = Object.values(changes);

        const setClause = columns.join(' = ?, ');

        const query = `UPDATE main_data SET ${setClause} = ? WHERE id = ?`;
        console.log(query);
        db.run(query, [...values, id], (err) => err ? reject(err) : resolve('updated!'));
    });
}

export function insertCard(cardNumber) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO main_data (number) VALUES (?)', [cardNumber], (err) => {
            err ? reject(err) : resolve('inserted!')
        });
    });
}

export function deleteCard(id) {   
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('BEGIN TRANSACTION');
            
            db.run('DELETE FROM main_data WHERE id = ?', [id], (err) => {
                if(err) {
                    db.run('ROLLBACK');
                    reject(err);
                } else {
                    db.run('UPDATE main_data SET number = number - 1 WHERE id > ?', [id], (err) => {
                        if(err) {
                            db.run('ROLLBACK');
                            reject(err);
                        } else {
                            db.run('COMMIT', (err) => {
                                if (err) {
                                    reject(err);
                                    console.log('commit error!');
                                } else {
                                    resolve('deleted!');
                                }
                            });
                        }
                    });
                }
            });
        });
    });
}