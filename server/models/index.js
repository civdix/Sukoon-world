import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import mysql2 from 'mysql2';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'sukoon_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    dialectModule: mysql2,
    logging: false, // Set to console.log to see SQL queries
    timezone: '+00:00',
  }
);

// We will import models here if needed, but to avoid circular dependencies in ES modules,
// it's better to import models in a central place or where they are used.
// We can just export sequelize.

export { sequelize };
