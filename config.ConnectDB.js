const mongoose = require('mongoose');

let mongodb_url;
if (process.env.NODE_ENV.trim() === 'development') mongodb_url = 'mongodb://localhost:27017/3989';
else mongodb_url = process.env.MONGODB_URL;


mongoose.connect(mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(con => {
    console.log('Database connected...');
}).catch(err => {
    console.log(err);
});