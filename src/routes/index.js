const newsRouter = require('./news');
const meRouter = require('./me');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
function route(app) {
    // app.get("/", (req, res) => {
    //     res.render("home")
    //   });

    //   app.get("/news", (req, res) => {
    //     console.log(req.query.q);
    //     res.render("news")
    //   });
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/', siteRouter);
    app.use('/courses', coursesRouter);
}
module.exports = route;
