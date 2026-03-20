import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const FREE_SHIPPING_THRESHOLD = 200;

export default function CartDrawer() {
  const { cartItems, cartTotal, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart();
  const shippingProgress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - cartTotal;

  const getProduct = (itemId) => {
    return products.find(p => p.id === itemId);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-dark/50 z-50 transition-opacity duration-500 ${
          isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-500 ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-warm-gray">
          <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
            <ShoppingBag size={20} />
            Cart ({cartItems.length})
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 flex items-center justify-center hover:bg-warm-gray rounded-full transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Bar */}
        {cartItems.length > 0 && (
          <div className="px-6 py-3 bg-cream">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-text-muted">
                {remaining > 0
                  ? `$${remaining.toFixed(0)} away from free shipping`
                  : 'You qualify for free shipping!'
                }
              </span>
              <span className="text-secondary font-medium">${FREE_SHIPPING_THRESHOLD}</span>
            </div>
            <div className="h-1.5 bg-warm-gray-dark rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full transition-all duration-500"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-warm-gray flex items-center justify-center">
                <ShoppingBag size={32} className="text-text-light" />
              </div>
              <p className="font-heading text-lg text-dark mb-2">Your cart is empty</p>
              <p className="text-sm text-text-muted mb-6">Discover our beautiful collection of Ethiopian dresses</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-gold"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item, idx) => (
                <div key={`${item.id}-${item.size}-${item.color}-${idx}`} className="flex gap-4">
                  {getProduct(item.id)?.image ? (
                    <img src={getProduct(item.id).image} alt={item.name} className="w-20 h-24 object-cover object-top flex-shrink-0" />
                  ) : (
                    <div className={`w-20 h-24 bg-gradient-to-br ${getProduct(item.id)?.gradient || 'from-warm-gray to-cream'} flex-shrink-0 flex items-center justify-center`}>
                      <span className="font-heading text-white/80 text-lg font-bold">HS</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-text-muted mt-0.5">
                      {item.size} / {item.color}
                    </p>
                    <p className="text-dark font-semibold mt-1">${item.price}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                        className="w-7 h-7 border border-warm-gray-dark flex items-center justify-center hover:bg-warm-gray transition-colors cursor-pointer"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                        className="w-7 h-7 border border-warm-gray-dark flex items-center justify-center hover:bg-warm-gray transition-colors cursor-pointer"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        className="ml-auto text-text-light hover:text-primary transition-colors cursor-pointer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-warm-gray p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-text-muted text-sm">Subtotal</span>
              <span className="text-xl font-heading font-semibold">${cartTotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-text-light">Shipping & taxes calculated at checkout</p>
            <Link
              to="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="btn-dark block text-center w-full"
            >
              Checkout
            </Link>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-full text-center text-xs uppercase tracking-[0.15em] text-text-muted hover:text-dark transition-colors py-2 cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
