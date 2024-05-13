import { Schema, Document } from 'mongoose';

// Define user schema
export interface UserDocument extends Document {
  username: string;
  access_token: string;
  refresh_token: string;
}

const userSchema: Schema<UserDocument> = new Schema({
  username: { type: String, required: true },
  access_token: { type: String, required: true, unique: true },
  refresh_token: { type: String, required: true }
});


export default userSchema;