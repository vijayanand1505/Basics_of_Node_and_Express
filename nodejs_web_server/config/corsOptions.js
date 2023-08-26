// Cross Origin Resource Sharing
const whiteList = [
    'http://127.0.0.1:5500', 
    'http://localhost:3500', 
    'http://localhost:3000'
];
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

