var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var redis = require('redis');
var expressSession = require('express-session');
var RedisStore = require('connect-redis')(expressSession);
var flash = require('connect-flash');

var port = process.env.PORT || 3040;
var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/1';

var serverUri;
if (process.env.PARSE_SERVER_URI) {
  serverUri = process.env.PARSE_SERVER_URI + process.env.PARSE_MOUNT;
} else {
  serverUri = 'http://localhost:3040/1';
}
var publicServerURL;
if (process.env.PUB_SERVER_URL) {
  publicServerURL = process.env.PUB_SERVER_URL + mountPath;
} else {
  publicServerURL = 'http://localhost:3040/1';
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/e-shop',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || '9o87s1WOIyPgoTEGv0PSp9GXT1En9cwC',
  masterKey: process.env.MASTER_KEY || '2h7bu8iPlLZ43Vt80rB97X2CDFmY087P', //Add your master key here. Keep it secret!
  serverURL: serverUri,  // Don't forget to change to https if needed
  // Enable email verification
  appName: 'Schoolpop',
  publicServerURL: publicServerURL,
  verifyUserEmails: true,
  emailAdapter:{
    module: 'parse-server-simple-mailgun-adapter',
    options: {
      // The address that your emails come from
      fromAddress: 'E-shoper <noreply@'+ process.env.DOMAIN_NAME+ '>',
      // Your domain from mailgun.com
      domain: process.env.DOMAIN_NAME || 'http://localhost:3040',
      // Your API key from mailgun.com
      apiKey: process.env.MAILGUN_API_KEY || 'key-mykey',
    }
  },
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  }
});

var app = express();

app.set('port', port);

if ('production' == app.settings.env) app.disable('verbose errors');

// Configure app
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); 

// Use Middleware
app.use(bodyParser.urlencoded({
  extended: true
}));
// parse application/json 
app.use(bodyParser.json());

var client = redis.createClient(process.env.REDISCLOUD_URL||'redis://localhost:6379', {no_ready_check: true});
app.use(cookieParser());
app.use(expressSession({
  store: new RedisStore({'client': client}),
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.use(express.static(path.join(__dirname, '/public/assets')));
app.use(express.static(path.join(__dirname, '/bower_components')));

app.get('/', express.static(path.join(__dirname, '/app')));

app.use(mountPath, api);

module.exports = app;