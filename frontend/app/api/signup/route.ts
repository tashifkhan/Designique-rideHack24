// import connectMongo from '@/lib/connect-mongo';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import Consumer from '@/lib/db/models/Consumer';
import Designer from '@/lib/db/models/Designer';
import Manufacturer from '@/lib/db/models/Manufacturer';
import Seller from '@/lib/db/models/Seller'; // Import the Seller model
export async function POST(req: Request) {
  try {
    // Parse the incoming request body
    const { 
      userType, 
      name, 
      email, 
      coverphoto, 
      password, 
      photo, 
      location, 
      bio, 
      portfolio, 
      specialization, 
      numberOfCollections, 
      preferences ,
      productPrices,
       specialty,
       productCapacity
    } = await req.json();

    // Establish MongoDB connection
    // await connectMongo();

    // Check if the email already exists
    const existingUser = await Consumer.findOne({ email }) || 
                         await Designer.findOne({ email }) || 
                         await Manufacturer.findOne({ email }) || 
                         await Seller.findOne({ email });

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
        photo,             // Designer's photo
        coverphoto,        // Designer's cover photo
        location,          // Location
        bio,               // Designer's bio
        portfolio,         // Array of portfolio items (URLs or file paths)
        numberOfCollections, // Number of collections
        specialization,    // Designer's area of expertise (optional)
        orders: []         // Assuming you don't have orders for new designers yet, so we initialize it as an empty array
      });
    } else if (userType === 'manufacturer') {
      newUser = new Manufacturer({
        name,
        email,
        password: hashedPassword,
        photo,
        location,
        productCapacity,
        productPrices,  // Product prices passed dynamically from the request body
        specialty,      // Specialization field passed from the request body
      });
    }
     else if (userType === 'seller') {
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
