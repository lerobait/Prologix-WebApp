const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { loadOrUpdateProducts } = require('./utils/productLoader');
const cron = require('node-cron');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const AppError = require('./utils/appError');

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
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', productRouter);
app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', authRouter);
app.use('/api', userRouter);

app.use((req, res, next) => {
  next(new AppError('Not found', 404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  const statusCode = err.statusCode || 500;
  res.status(statusCode);

  res.render('error');
});

module.exports = app;
