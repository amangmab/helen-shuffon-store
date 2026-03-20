import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Star, Heart, Truck, Shield, RefreshCw, Minus, Plus, ShoppingBag, ChevronDown } from 'lucide-react';
import { products, categories } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState('features');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto section-padding text-center pt-32">
        <h1 className="font-heading text-2xl mb-4">Product not found</h1>
        <Link to="/shop" className="btn-dark">Back to Shop</Link>
      </div>
    );
  }

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const categoryName = categories.find(c => c.id === product.category)?.name || '';

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const accordionItems = [
    {
      id: 'features',
      title: 'Features & Details',
      content: (
        <ul className="space-y-2">
          {product.features.map(feat => (
            <li key={feat} className="flex items-start gap-2 text-sm text-text-muted">
              <span className="text-secondary mt-0.5">&#10003;</span>
              {feat}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'shipping',
      title: 'Shipping & Returns',
      content: (
        <div className="text-sm text-text-muted space-y-2">
          <p>Free shipping on orders over $200. Standard shipping: $15.</p>
          <p>Delivery takes 7-14 business days for international orders.</p>
          <p>30-day return policy for unworn items in original packaging.</p>
        </div>
      ),
    },
    {
      id: 'care',
      title: 'Care Instructions',
      content: (
        <div className="text-sm text-text-muted space-y-2">
          <p>Hand wash in cold water with mild detergent.</p>
          <p>Lay flat to dry. Do not tumble dry.</p>
          <p>Iron on low heat. Store in a cool, dry place.</p>
        </div>
      ),
    },
  ];

  return (
    <main className="pt-20">
      <div className="max-w-7xl mx-auto section-padding">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-text-muted mb-8">
          <Link to="/" className="hover:text-dark transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-dark transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <Link to={`/shop?category=${product.category}`} className="hover:text-dark transition-colors">{categoryName}</Link>
          <ChevronRight size={12} />
          <span className="text-dark">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <div className="aspect-[3/4] overflow-hidden bg-cream">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className={`h-full bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <span className="font-heading text-white text-5xl font-bold">HS</span>
                  </div>
                  <p className="text-white/60 uppercase tracking-[0.2em] text-sm">
                    {categoryName}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {product.badge && (
              <span className="inline-block bg-dark text-secondary text-[10px] font-semibold px-3 py-1 uppercase tracking-[0.15em] mb-4">
                {product.badge}
              </span>
            )}

            <h1 className="font-heading text-2xl md:text-3xl font-semibold text-dark mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'fill-secondary text-secondary' : 'text-warm-gray-dark'} />
                ))}
              </div>
              <span className="text-xs text-text-muted">{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-heading font-bold text-dark">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-text-light line-through">${product.originalPrice}</span>
                  <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 uppercase">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            <p className="text-text-muted text-sm leading-relaxed mb-8">{product.description}</p>

            {/* Divider */}
            <div className="ethiopian-border mb-8" />

            {/* Size */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-dark mb-3 block uppercase tracking-wider">Size</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] px-4 py-2.5 text-xs font-medium border transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'border-dark bg-dark text-white'
                        : 'border-warm-gray-dark text-text-muted hover:border-dark'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-dark mb-3 block uppercase tracking-wider">Color</label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2.5 text-xs font-medium border transition-all cursor-pointer ${
                      selectedColor === color
                        ? 'border-dark bg-dark text-white'
                        : 'border-warm-gray-dark text-text-muted hover:border-dark'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="text-xs font-semibold text-dark mb-3 block uppercase tracking-wider">Quantity</label>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 border border-warm-gray-dark flex items-center justify-center hover:bg-warm-gray transition-colors cursor-pointer"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 h-10 flex items-center justify-center border-y border-warm-gray-dark text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 border border-warm-gray-dark flex items-center justify-center hover:bg-warm-gray transition-colors cursor-pointer"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button onClick={handleAddToCart} className="btn-dark flex-1 flex items-center justify-center gap-2">
                <ShoppingBag size={16} />
                Add to Cart
              </button>
              <button className="w-12 h-12 border border-warm-gray-dark flex items-center justify-center hover:border-dark hover:text-primary transition-colors cursor-pointer">
                <Heart size={18} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-warm-gray mb-6">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'Orders over $200' },
                { icon: Shield, label: 'Secure Payment', sub: 'SSL encrypted' },
                { icon: RefreshCw, label: 'Easy Returns', sub: '30-day policy' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center">
                  <Icon size={18} className="mx-auto text-secondary mb-1.5" />
                  <p className="text-[10px] font-semibold text-dark uppercase tracking-wider">{label}</p>
                  <p className="text-[10px] text-text-light">{sub}</p>
                </div>
              ))}
            </div>

            {/* Accordion */}
            <div className="space-y-0">
              {accordionItems.map(item => (
                <div key={item.id} className="border-b border-warm-gray">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === item.id ? '' : item.id)}
                    className="w-full flex items-center justify-between py-4 text-sm font-medium text-dark cursor-pointer"
                  >
                    {item.title}
                    <ChevronDown
                      size={16}
                      className={`text-text-muted transition-transform ${openAccordion === item.id ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openAccordion === item.id && (
                    <div className="pb-4">
                      {item.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-24">
            <div className="text-center mb-12">
              <p className="text-secondary uppercase tracking-[0.25em] text-xs font-medium mb-3">More to Love</p>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-dark">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
