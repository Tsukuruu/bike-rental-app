require('dotenv').config();
const express = require('express');
const { connectToDb } = require('./config/db.config');
//execute models.js to init tables in database if those not exist
const models = require('./models/models');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api.routes');

const app = express();

const PORT = process.env.PORT || 3000;

if(process.env.NODE_ENV === 'development'){
    const cors = require('cors');
    app.use(cors());
}
app.use(express.static(__dirname + '/views/'));
app.use(express.json());
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use("*", (req, res) => {
	return res.sendFile(__dirname + '/views/error.html');
});

const start = () => {
    try{
        connectToDb();
        app.listen(PORT, () => console.log(`Server is running on port ${PORT} at ${new Date()}.`));
    }catch(err){
        console.error(err);
    }
}

start();