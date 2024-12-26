import connectMongo from '@/lib/db/connectMongo';

export async function GET(req: Request) {
  try {
    await connectMongo();
    return new Response(JSON.stringify({ message: "Connected to MongoDB Yay" }), { status: 200 });
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    return new Response(JSON.stringify({ message: "Failed to connect to MongoDB" }), { status: 500 });
  }
}
