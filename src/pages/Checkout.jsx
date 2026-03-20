import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShoppingBag, CreditCard, Lock, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shipping = cartTotal >= 200 ? 0 : 15;
  const total = cartTotal + shipping;

  const getProductGradient = (itemId) => {
    const product = products.find(p => p.id === itemId);
    return product?.gradient || 'from-warm-gray to-cream';
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
    toast.success('Order placed successfully!');
  };

  if (orderPlaced) {
    return (
      <main className="pt-20">
        <div className="max-w-2xl mx-auto section-padding text-center">
          <div className="bg-cream p-14">
            <div className="w-20 h-20 mx-auto mb-6 border-2 border-secondary flex items-center justify-center">
              <Check size={32} className="text-secondary" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-dark mb-3">Order Confirmed!</h1>
            <p className="text-text-muted text-sm mb-2">Thank you for your purchase.</p>
            <p className="text-text-light text-xs mb-8 max-w-sm mx-auto">
              A confirmation email will be sent shortly. For custom orders, we'll contact you
              within 24 hours to confirm measurements and details.
            </p>
            <Link to="/shop" className="btn-dark">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="pt-20">
        <div className="max-w-2xl mx-auto section-padding text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-warm-gray flex items-center justify-center">
            <ShoppingBag size={32} className="text-text-light" />
          </div>
          <h1 className="font-heading text-2xl font-semibold text-dark mb-4">Your cart is empty</h1>
          <Link to="/shop" className="btn-dark">Browse Collection</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20">
      <div className="max-w-6xl mx-auto section-padding">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-text-muted mb-8">
          <Link to="/" className="hover:text-dark transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-dark transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <span className="text-dark">Checkout</span>
        </nav>

        <h1 className="font-heading text-3xl font-semibold text-dark mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-8">
            {/* Shipping */}
            <div className="bg-white p-6 border border-warm-gray">
              <h2 className="font-heading text-lg font-semibold text-dark mb-6">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-dark mb-2 uppercase tracking-wider">First Name *</label>
                  <input required type="text" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-dark mb-2 uppercase tracking-wider">Last Name *</label>
                  <input required type="text" className="input-field" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-dark mb-2 uppercase tracking-wider">Email *</label>
                  <input required type="email" className="input-field" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-dark mb-2 uppercase tracking-wider">Address *</label>
                  <input required type="text" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-dark mb-2 uppercase tracking-wider">City *</label>
                  <input required type="text" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-dark mb-2 uppercase tracking-wider">Postal Code *</label>
                  <input required type="text" className="input-field" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-dark mb-2 uppercase tracking-wider">Country *</label>
                  <select required className="input-field">
                    <option value="">Select Country</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Ethiopia</option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>Australia</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white p-6 border border-warm-gray">
              <h2 className="font-heading text-lg font-semibold text-dark mb-2 flex items-center gap-2">
                <CreditCard size={18} /> Payment
              </h2>
              <p className="text-xs text-text-light mb-5 flex items-center gap-1">
                <Lock size={12} /> Your payment information is encrypted and secure.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-dark mb-2 uppercase tracking-wider">Card Number *</label>
                  <input required type="text" placeholder="1234 5678 9012 3456" className="input-field" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-dark mb-2 uppercase tracking-wider">Expiry Date *</label>
                    <input required type="text" placeholder="MM/YY" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-dark mb-2 uppercase tracking-wider">CVV *</label>
                    <input required type="text" placeholder="123" className="input-field" />
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="btn-dark w-full text-center flex items-center justify-center gap-2">
              <Lock size={14} /> Place Order &mdash; ${total.toFixed(2)}
            </button>
          </form>

          {/* Order Summary */}
          <div className="bg-white p-6 border border-warm-gray h-fit lg:sticky lg:top-24">
            <h2 className="font-heading text-lg font-semibold text-dark mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cartItems.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex gap-3">
                  <div className={`w-14 h-16 bg-gradient-to-br ${getProductGradient(item.id)} flex-shrink-0 flex items-center justify-center`}>
                    <span className="font-heading text-white/80 text-xs font-bold">HS</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <p className="text-text-light text-xs">{item.size} / {item.color} x{item.quantity}</p>
                  </div>
                  <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-warm-gray pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Shipping</span>
                <span>{shipping === 0 ? <span className="text-accent font-medium">Free</span> : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="ethiopian-border my-3" />
              <div className="flex justify-between font-heading text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {shipping > 0 && (
              <p className="text-xs text-secondary mt-4 font-medium">
                Add ${(200 - cartTotal).toFixed(2)} more for free shipping!
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
