import connectMongo from '@/lib/connect-mongo';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import Consumer from '@/models/Consumer';
import Designer from '@/models/Designer';
import Manufacturer from '@/models/Manufacturer';
import Seller from '@/models/Seller'; // Import the Seller model

export async function POST(req: Request) {
  try {
    // Parse the incoming request body
    const { userType, name, email, password, photo, location, bio, portfolio, specialization, numberOfCollections, productCapacity, prizeRange, businessType, inventoryCapacity,preferences } = await req.json();

    // Establish MongoDB connection
    await connectMongo();

    // Check if the email already exists
    const existingUser = await Consumer.findOne({ email }) || await Designer.findOne({ email }) || await Manufacturer.findOne({ email }) || await Seller.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Email already in use' }, { status: 400 });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;

    // Based on the userType, create the user document in the corresponding collection
    if (userType === 'consumer') {
      newUser = new Consumer({
        name,
        email,
        password: hashedPassword,
        preferences,
      
      });
    } else if (userType === 'designer') {
      newUser = new Designer({
        name,
        email,
        password: hashedPassword,
        photo,
        location,
        bio,
        portfolio,
        numberOfCollections,
      });
    } else if (userType === 'manufacturer') {
      newUser = new Manufacturer({
        name,
        email,
        password: hashedPassword,
        photo,
        location,
        productCapacity,
        prizeRange,
        specialty: specialization,
      });
    } else if (userType === 'seller') {
      newUser = new Seller({
        name,
        email,
        password: hashedPassword,
        photo,
        location,
        businessType,
        inventoryCapacity,
        products: [], // Initialize with empty products array or modify according to logic
      });
    } else {
      return NextResponse.json({ message: 'Invalid user type' }, { status: 400 });
    }

    // Save the new user to the database
    await newUser.save();

    return NextResponse.json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json({ message: 'Error during signup', error }, { status: 500 });
  }
}
