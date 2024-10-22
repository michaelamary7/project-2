require('dotenv').config();
import express, { json } from 'express';
import cors from 'cors';
import routes from './routes';
import { sequelize } from './models';


const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(json());
app.use('/api', routes);

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
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);

export default app;