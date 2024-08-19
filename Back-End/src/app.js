const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { loadOrUpdateProducts } = require('./utils/productLoader');
const cron = require('node-cron');
const createError = require('http-errors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/productRoutes');
const authRouter = require('./routes/api/authRoutes');
const userRouter = require('./routes/api/userRoutes');

const app = express();

// Initialize products when the application starts
loadOrUpdateProducts(true);

// Schedule a cron job to run daily at midnight (00:00) server time
cron.schedule('0 0 * * *', async () => {
  await loadOrUpdateProducts(false);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', productRouter);
app.use('/api', authRouter);
app.use('/api', userRouter);

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
