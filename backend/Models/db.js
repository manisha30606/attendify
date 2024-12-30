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

// import mongoose from 'mongoose';

// mongoose.set("debug", true);

// mongoose
//   .connect(process.env.MONGO_CON, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error("MongoDB connection error: ", err));
