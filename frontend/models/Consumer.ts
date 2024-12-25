// models/Consumer.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IConsumer extends Document {
  name: string;
  email: string;
  password: string;
  preferences: string[];
  purchaseHistory: string[];
}

const ConsumerSchema = new Schema<IConsumer>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: { type: [String], required: false },
  purchaseHistory: { type: [String], required: false },
});

const Consumer =
  mongoose.models.Consumer ||
  mongoose.model<IConsumer>('Consumer', ConsumerSchema);

export default Consumer;
