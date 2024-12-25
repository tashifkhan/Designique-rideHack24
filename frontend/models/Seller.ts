import mongoose, { Schema, Document } from 'mongoose';

interface Seller extends Document {
  name: string;
  email: string;
  password: string;
  photo: string;
  location: string;
  businessType: string;
  inventoryCapacity: number;
  products: Array<any>; // You can modify this based on the type of product references you want to store (e.g., an array of ObjectIds)
}

const sellerSchema = new Schema<Seller>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photo: { type: String },
  location: { type: String },
  businessType: { type: String, required: true },
  inventoryCapacity: { type: Number, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }], // Assuming the products are stored in a separate Product collection
});

const Seller = mongoose.models.Seller || mongoose.model<Seller>('Seller', sellerSchema);

export default Seller;
