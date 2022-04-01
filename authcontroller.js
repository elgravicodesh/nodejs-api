const { mysqlConnection, app, router, bodyparser, jwt } = require('./server.js');

const { users } = require('./models/user.js');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// import password and password-jwt modules
const password = require('passport');
const passwordJWt = require('passport-jwt');

// Extract JWT to help extract the token
// let extractJWT = passwordJWt.ExtractJwt;

// JWtStrategy which is the strategy for authentication
let JWtStrategy = passwordJWt.Strategy;
let jwtOptions = {};

// jwtOptions.jwtFromRequest = passwordJWt.ExtractJwt.fromAuthHeaderAsBearerToken();
// jwtOptions.secretorKey = "Mitiget";

const accessTokenSecret = "Mitiget";



const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
    // res.json({ message: 'Node API is up' })
});


// LOGIN
app.post('/login', (req, res) => {
    this.table = req.body;
    this.data = new users(mysqlConnection);
    let result = this.data.validateUser(this.table, res);

    // check for lenght and bool value to authorise
    if (result.Password === req.passport) {
        // Generate token
        const accesstoken = jwt.sign({ username: users.username, role: users.role }, accessTokenSecret);

        // session and cookies
        // privilege authorisation

        res.json({
            accesstoken
        })
        console.log('workign');
    } else {
        res.send("Username or Password is not correct");
    }

});

// LOGOUT
app.post('/logout', (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(token => t !== token);
    res.send("Logout successful");
});

module.exports = { authenticateJWT }