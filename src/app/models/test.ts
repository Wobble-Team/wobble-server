import { Schema, Document } from 'mongoose';

// Define user schema
export interface TestDocument extends Document {
  name: string;
  age: number;
  shirt_size: string;
}

const testSchema: Schema<TestDocument> = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  shirt_size: { type: String, required: true }
});


export default testSchema;