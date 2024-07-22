// server/models/User.ts
import mongoose, { Document } from 'mongoose';

interface User extends Document {
    email: string;
    password: string;
}

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export default mongoose.model<User>('User', UserSchema);
