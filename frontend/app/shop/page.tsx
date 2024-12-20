import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

const featuredProducts = [
  {
    id: 1,
    name: 'Ethereal Silk Dress',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80',
  },
  {
    id: 2,
    name: 'Crystal Glass Blazer',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&q=80',
  },
  {
    id: 3,
    name: 'Prism Collection Set',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
  },
];

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80"
            alt="Hero"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Redefining Fashion Through Glass
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Experience our unique collection of glassmorphic designs that blend elegance with innovation.
          </p>
          <Button size="lg" asChild>
            <Link href="/collections">Explore Collection</Link>
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Featured Designs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden backdrop-blur-lg bg-white/5 border-white/10 hover:border-white/20 transition-all">
              <div className="relative h-96">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-400 mb-4">${product.price}</p>
                <Button className="w-full">Add to Cart</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-gray-400 mb-6">
            Stay updated with our latest collections and exclusive offers.
          </p>
          <form className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-white/40"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
}