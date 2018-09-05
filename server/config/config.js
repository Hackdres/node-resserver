// ------------------
//      PORT
// ------------------
process.env.PORT = process.env.PORT || 3000;

// ------------------
//      ENVIROMENT
// ------------------
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ------------------
//      DATA BASE
// ------------------
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb://cafe-user:abc123@ds245082.mlab.com:45082/cafe';
}

process.env.URLDB = urlDB;