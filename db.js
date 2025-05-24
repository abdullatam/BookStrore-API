import dotenv from 'dotenv';
import e from 'express';
import pg from 'pg';
import morgan from 'morgan';

dotenv.config();
const pgclient = new pg.Client(process.env.DATABASE_URL); 


export default pgclient;