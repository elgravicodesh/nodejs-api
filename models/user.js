class users {

    constructor(db) {
        this.connect = db;
    }

    // List ALL
    all(res) {
        return this.connect.query('SELECT * FROM userlogin', (err, row, fields) => {
            if (!err) res.send(row);
            else console.log(err);
        });
    }

    // validate User
    validateUser(req, res) {
        var sql = "SELECT * FROM userlogin WHERE email= ? AND password = ?";
        const query = this.connect.query(sql, [req.email, req.password], (err, row, fields) => {
            // if (!err) res.send(row.message);
            if (!err) res.json(row);
            else console.log(err);
        });

        console.log(query[0]);
        return query[0];
    }

}

module.exports = { users }