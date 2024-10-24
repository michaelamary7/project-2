require('dotenv').config();
import express, { json } from 'express';
import cors from 'cors';
import routes from './routes';
import { sequelize } from './models';


const PORT = process.env.PORT || 3000;

app.use('api')
app.use(json());
app.use('/src', routes);
app.use('/src/pages', calendarPage, eventCalendarPage, eventListPage, loginFormPage, registerFormPage);
app.use('/src/users', userRoutes);
app.use('/src/categories', categoryRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});


import express from 'express';
const app = express();
import eventRoutes from './routes/eventRoutes';
import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';

app.use(json());

// Mount routes


export default app;