const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { loadOrUpdateProducts } = require('./utils/productLoader');
const cron = require('node-cron');
const createError = require('http-errors');
const path = require('path');

const viewRouter = require('./routes/viewRoutes');
const productRouter = require('./routes/productRoutes');
const authRouter = require('./routes/api/authRoutes');

const app = express();

// Initialize products when the application starts
loadOrUpdateProducts(true);

// Schedule a cron job to run daily at midnight (00:00) server time
cron.schedule('0 0 * * *', async () => {
  await loadOrUpdateProducts(false);
});

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', viewRouter);
app.use('/api', productRouter);
app.use('/api', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
