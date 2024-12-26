import mongoose, { Schema, Document } from 'mongoose';

interface IManufacturer extends Document {
  name: string;
  email: string;
  password: string;
  photo: string;  // Store the photo URL or file path
  location: string;  // Store the location or address
  productCapacity: number;
  productPrices: Record<string, number>; // A mapping of product names to prices
  specialty: string;
}

const ManufacturerSchema = new Schema<IManufacturer>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photo: { type: String, required: true }, // Photo URL or file path
  location: { type: String, required: true }, // Location address
  productCapacity: { type: Number, required: true }, // Capacity for products
  productPrices: { 
    type: Map, 
    of: Number, 
    required: true 
  }, // Using Map to store product names and their corresponding prices
  specialty: { type: String, required: true },
});

// Use the model or create a new one if it doesn't exist
const Manufacturer =
  mongoose.models.Manufacturer ||
  mongoose.model<IManufacturer>('Manufacturer', ManufacturerSchema);

export default Manufacturer;
