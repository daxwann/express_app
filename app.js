const path = require('path');
const express = require('express');
const shopRouter = require('./routes/shop');
const adminRouter = require('./routes/admin');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))
app.use('/admin', adminRouter.router);
app.use(shopRouter);
app.use("/", (req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(3000);