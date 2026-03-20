import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors[0], 1);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card group block">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-cream">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
            <div className="text-center p-4">
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <span className="font-heading text-white text-2xl font-bold">HS</span>
              </div>
              <p className="text-[10px] text-white/60 uppercase tracking-[0.2em]">
                {product.category.replace('-', ' ')}
              </p>
            </div>
          </div>
        )}

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${
            product.badge === 'Best Seller' ? 'bg-primary text-white' :
            product.badge === 'New Arrival' ? 'bg-dark text-white' :
            product.badge === 'Premium' ? 'bg-secondary text-dark' :
            product.badge === 'Luxury' ? 'bg-dark text-secondary' :
            product.badge === 'Trending' ? 'bg-accent text-white' :
            'bg-white text-dark'
          }`}>
            {product.badge}
          </span>
        )}

        {/* Discount */}
        {discount && (
          <span className="absolute top-3 right-3 bg-primary text-white text-[10px] font-bold px-2 py-1">
            -{discount}%
          </span>
        )}

        {/* Hover Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleQuickAdd}
            className="flex-1 mr-2 bg-white/95 backdrop-blur-sm text-dark text-xs font-semibold uppercase tracking-wider py-2.5 px-4 hover:bg-secondary hover:text-dark transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <ShoppingBag size={14} />
            Quick Add
          </button>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="w-10 h-10 bg-white/95 backdrop-blur-sm flex items-center justify-center hover:bg-secondary transition-colors cursor-pointer"
          >
            <Heart size={16} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[10px] uppercase tracking-[0.15em] text-text-muted mb-1">
          {product.category.replace('-', ' ')}
        </p>
        <h3 className="font-heading text-base font-medium text-dark group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                className={i < Math.floor(product.rating) ? 'fill-secondary text-secondary' : 'text-warm-gray-dark'}
              />
            ))}
          </div>
          <span className="text-[11px] text-text-muted">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-semibold text-dark">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-text-light line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
