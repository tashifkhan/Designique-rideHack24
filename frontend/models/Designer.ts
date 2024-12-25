import mongoose, { Schema, Document } from 'mongoose';

interface IDesigner extends Document {
  name: string;
  email: string;  // Added email field
  password: string;  // Added password field
  photo: string;  // Photo URL or file path
  coverphoto: string;
  specialization: string;
  bio: string;
  numberOfCollections: number;
  portfolio: string[];  // Array of URLs or file paths to the designer's portfolio items
  orders: mongoose.Types.ObjectId[];  // References to Order objects (or any other collection that holds previous orders)
}

const DesignerSchema = new Schema<IDesigner>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },  // Added email with unique constraint
  password: { type: String, required: true },  // Added password field
  photo: { type: String, required: true },  // Store photo URL or file path
  coverphoto: { type: String, required: true }, // Store kar lo 
  specialization: { type: String, required: true },  // Designer's area of expertise
  bio: { type: String, required: true },  // Designer's bio
  numberOfCollections: { type: Number, required: true },  // Number of collections the designer has
  portfolio: { type: [String], required: true },  // Array of portfolio items (URLs or file paths)
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],  // References to previous orders (could be Order schema)
});

// Create or reuse the model if it already exists
const Designer =
  mongoose.models.Designer || mongoose.model<IDesigner>('Designer', DesignerSchema);

export default Designer;
