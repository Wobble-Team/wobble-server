import mongoose from 'mongoose';
import config from "../../config/config";
import userSchema from './users';
import testSchema from './test';

const db = mongoose.connect(config.mongodb_uri as string).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const UserModel = mongoose.model('User', userSchema);
const TestModel = mongoose.model('Test', testSchema);

export default { db, UserModel, TestModel}