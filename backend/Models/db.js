import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

const mongo_url = process.env.MONGO_CON;

mongoose.connect(mongo_url)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error: ", err);
  });

  mongoose.set('debug', true);