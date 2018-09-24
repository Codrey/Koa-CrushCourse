const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new KoaRouter();

// Replace with DB
const things = ['My Family', 'Programming', 'Music'];

// Json Prettier Midleware
app.use(json());

// Bodyparser Midleware
app.use(bodyParser());

// Add adictional properties
app.context.user = 'Corey'

// response   // Simple Middleware Example
/* Koa site example ••• 
app.use(ctx => {ctx.body = 'Hello Koa';}); */
// app.use(async ctx => (ctx.body = {message: 'Hello Koa'}));

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false
});

// Routes
router.get('/', index);
router.get('/add', showaAdd);
router.post('/add', add);

// List of things
async function index(ctx) {
    await ctx.render('index', {
        title: 'Things I love about Javascript:',
        things: things,
    });
}

// Show add page
async function showaAdd(ctx) {
    await ctx.render('add');
}

// Index // Pre-destructors routes
/* router.get('/', async ctx => {
    await ctx.render('index', {
        title: 'Things I love about Javascript:',
        things: things,
    });
}); */

// Add thing
async function add(ctx) {
    const body = ctx.request.body;
    things.push(body.thing);
    ctx.redirect('/');
}

router.get('/test', ctx => (ctx.body = `Hello ${ctx.user}`));

// Getting parameters from URL
router.get('/test2/:name', ctx => (ctx.body = `Hello ${ctx.params.name}`));

// Router middleware
app.use(router.routes()).use(router.allowedMethods());





app.listen(3000, console.log('Server started...'));