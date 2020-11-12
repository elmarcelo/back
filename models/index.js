import mongoose from 'mongoose';
import gradeModel from './gradeModels.js';

const db = {};

db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.grade = gradeModel(mongoose);
export { db };
