const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');
const passport = require('passport');
require('./auth');


const port = process.env.PORT || 8080;
const app = express();

app
    .use(cors())
    .use(bodyParser.json())
    .use('/', require('./routes/index'))
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate With Google</a>');
})

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)

app.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('https://budget-app-mw5p.onrender.com/api-docs');
    });



mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});