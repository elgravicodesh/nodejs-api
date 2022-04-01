class gender {

    constructor(db) {
        this.connect = db;
    }

    // List ALL
    all(res) {
        return this.connect.query('SELECT * FROM gender', (err, row, fields) => {
            if (!err) res.send(row);
            else console.log(err);
        });
    }

    // Get a record by id from db
    get(req, res) {
        return this.connect.query('SELECT * FROM gender WHERE GenderID= ?', [req.params.id], (err, row, fields) => {
            if (!err) res.send(row);
            else console.log(err);
        });
    }

    // INSERT NEW RECORD
    add(req, res) {
        var sql = "INSERT INTO gender (Gender) values (?)"
        return this.connect.query(sql, [req.gender], (err, row, fields) => {
            if (!err) res.send('new id added: ' + row.insertId);
            else console.log(err);
        })
    }

    // UPDATE A RECORD
    update(req, res) {
        var sql = "UPDATE gender SET Gender = ? WHERE GenderID = ?"
        return this.connect.query(sql, [req.gender, req.genderid], (err, row, fields) => {
            if (!err) res.send(row.message);
            else console.log(err);

        })
    }


}

module.exports = { gender }