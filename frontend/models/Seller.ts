// models/Seller.ts
import mongoose, { Schema, Document } from 'mongoose';

interface ISeller extends Document {
  name: string;
  email: string;
  password: string;
  shopName: string;
  productsForSale: string[];
}

const SellerSchema = new Schema<ISeller>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  shopName: { type: String, required: true },
  productsForSale: { type: [String], required: false },
});

const Seller =
  mongoose.models.Seller ||
  mongoose.model<ISeller>('Seller', SellerSchema);

export default Seller;
