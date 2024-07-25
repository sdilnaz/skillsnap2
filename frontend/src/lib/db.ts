// import mongoose, { Mongoose } from "mongoose";

// const uri = process.env.MONGODB_URL!;

// interface MongooseConn {
//   conn: Mongoose | null;
//   promise: Promise<Mongoose> | null;
// }

// let cached: MongooseConn = (global as any).mongoose;

// if (!cached) {
//   cached = (global as any).mongoose = {
//     conn: null,
//     promise: null,
//   };
// }

// export const connect = async () => {
//   if (cached.conn) return cached.conn;

//   cached.promise =
//     cached.promise ||
//     mongoose.connect(uri, {
//       dbName: "test",
//        bufferCommands: false,
//        connectTimeoutMS: 30000,
//      }    
//     );

//   cached.conn = await cached.promise;

//   console.log("MongoDB connected successfully");
//   return cached.conn;
// };

import mongoose from 'mongoose';


const connect = async (): Promise<void> => {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error('MONGODB_URI environment variable is not set');
    }

    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

export default connect;
