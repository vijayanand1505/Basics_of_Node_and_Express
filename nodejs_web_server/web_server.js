const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;
const cors = require('cors');
const logEvents = require('./middleware/logEvents');
const corsOptions = require('./config/corsOptions');

app.use((req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt');
    console.log(`${req.method}${req.headers.origin}${req.url}`)
    next();
})



app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, './public')));
app.use('/subdir', express.static(path.join(__dirname, './public')));

app.use('/',require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }else if (req.accepts('json')) {
        res.json({ error: '404 Not Found' });
    } 
    else {
        res.type('txt').send('404 Not Found');
    }
});

//app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

