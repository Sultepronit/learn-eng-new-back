import db from "./connection.js";

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
        // db.run(
        //     'DELETE FROM main_data WHERE id = ?',
        //     [id],
        //     (err) => err ? reject(err) : resolve('deleted!')
        // );

        db.serialize(async () => {
            db.run('BEGIN TRANSACTION'); 

           try {
                db.run('DELETE FROM main_data WHERE id = ?', [id], (err) => {
                    if(err) throw new Error(err);
                });

                db.run('UPDATE main_data3 SET number = number - 1 WHERE id > ?', [id], (err) => {
                    // if(err) throw new Error(err);
                });
           } catch (error) {
                reject(error);
                return;
           } finally {
                console.log('finally!');
           }
           console.log('here we go!');
           db.run('COMMIT', (err) => {
                if (err) {
                    reject(err);
                    console.log('commit error!');
                } else {
                    console.log('commit success?');
                    resolve('deleted!');
                }
            });
        });
    });
}