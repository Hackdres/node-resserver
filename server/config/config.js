// ------------------
//      PORT
// ------------------
process.env.PORT = process.env.PORT || 3000;

// ------------------
//      ENVIROMENT
// ------------------
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ------------------
//      VENCIMIENTO TOKEN
// ------------------
// 60 segundos * 60 minutos * 24 horas * 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ------------------
//      SEED AUTHENTICATION
// ------------------
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ------------------
//      DATA BASE
// ------------------
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// ------------------
//      Google Client ID
// ------------------
process.env.CLIENT_ID = process.env.CLIENT_ID || '983788868836-t9icbjlqv9he5veiblv2dhk8i5km6fq5.apps.googleusercontent.com';