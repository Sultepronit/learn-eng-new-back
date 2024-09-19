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
        db.run(query, (err) => err ? reject(err) : resolve('updated!'))
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