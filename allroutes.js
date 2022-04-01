const { mysqlConnection, app, router, bodyparser } = require('./server.js');

// auth
const { authenticateJWT } = require('./authcontroller.js');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const { gender } = require('./models/gender.js');

// ROUTE FOR GENDER
app.group("/gender", (router) => {
    // LIST GENDERS
    router.get('/list', authenticateJWT, (req, res) => {
            this.data = new gender(mysqlConnection);
            this.result = this.data.all(res);
            return this.result;
        }),
        // GET GENDER BY ID
        router.get('/get/:id', (req, res) => {
            this.data = new gender(mysqlConnection);
            this.result = this.data.get(req, res);
            return this.result;
        }),
        // INSERT GENDER
        router.post('/add', (req, res) => {
            this.table = req.body;
            this.data = new gender(mysqlConnection);
            this.result = this.data.add(this.table, res);
            return this.result;
        }),

        // UPDATE GENDER
        router.post('/update', (req, res) => {
            this.table = req.body;
            this.data = new gender(mysqlConnection);
            this.result = this.data.update(this.table, res);
            return this.result;
        });
});