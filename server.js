const jsonServer = require('json-server')
const auth = require('json-server-auth')
const app = jsonServer.create()
const router = jsonServer.router('db.json')
const cors = require('cors');

// /!\ Bind the router db to the app
app.db = router.db

app.use(
    cors({
        origin: true,
        credentials: true,
        preflightContinue: false,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    })
);
app.options('*', cors());

// You must apply the auth middleware before the router
app.use(auth)
app.use(router)
app.listen(4000)
