// Libs
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const schedule = require('node-schedule');

// Functions
const Twitter = require('./functions/twitterFunctions');

// Environnements variables
dotenv.config();

// Database connexion
mongoose.connect(
    process.env.DB_CONNECT,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('Connected to DB')
)

// Twiter fetch data :
Twitter.twitterFetchData();

const job = schedule.scheduleJob('/10 * * * * *', () => {
    console.log('execute job');
    let word = 'tpmp';

    T.get('trends/place', { id: 615702 })
    .catch(function (err) {
        console.log('caught error', err.stack);
    })
    .then(function (result) {
        // console.log(JSON.stringify(result.data, null, 2));
        // insérer ou mettre à jour tous les mots clés tendance (50)
        // Attention, l'api retourne parfois un tweet_volume null, ignorer

        for (let keyword of result.data[0].trends) {
            console.log("keyword : " + keyword.name + " tweets : " + keyword.tweet_volume);
        }

    }); 
});

// Create app Express :
const app = express()

// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())

// Routes
app.use('/api/auth/user', require('./routes/userRoute'))
app.use('/api/keyword', require('./routes/keywordRoute'))

// Start the server
const port = process.env.PORT || 5000
app.listen(port);

console.log(`Server listening at ${port}, ${process.env.DB_CONNECT}`)
