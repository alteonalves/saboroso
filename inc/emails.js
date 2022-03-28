const conn = require('./db');

module.exports = {
    getEmails() {
        return new Promise((resolve, reject) => {
            conn.query("SELECT * FROM tb_emails ORDER BY email",
                (err, results) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(results);
                });
        });
    },
    delete(id) {
        return new Promise((resolve, reject) => {
            conn.query(`
            DELETE FROM tb_emails WHERE ID = ?
            `, [
                id
            ], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    save(fields) {

        console.log(fields.email);
        return new Promise((resolve, reject) => {
            if (fields.email) {
                conn.query(`
                INSERT INTO tb_emails (email)
                VALUES (?)
                `, [
                    fields.email
                ], (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
               });
            } else {
                reject('Insira o email');
            }
        });
    }
}