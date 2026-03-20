import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { categories } from '../data/products';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopHover, setShopHover] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navBg = scrolled || !isHome
    ? 'glass-card shadow-sm'
    : 'bg-transparent';

  const textColor = scrolled || !isHome ? 'text-dark' : 'text-white';
  const textMuted = scrolled || !isHome ? 'text-text-muted' : 'text-white/70';

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop', hasDropdown: true },
    { to: '/about', label: 'Our Story' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/images/logo/logo-final-transparent.png"
                alt="Helen Shuffon"
                className="h-12 w-auto"
              />
              <div className="hidden sm:block">
                <p className={`font-heading text-lg font-semibold leading-none ${textColor}`}>
                  Helen Shuffon
                </p>
                <p className={`text-[10px] tracking-[0.25em] uppercase ${textMuted}`}>
                  Ethiopian Fashion
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <div
                  key={link.to}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setShopHover(true)}
                  onMouseLeave={() => link.hasDropdown && setShopHover(false)}
                >
                  <Link
                    to={link.to}
                    className={`text-[13px] font-medium tracking-wide transition-colors duration-200 ease-out flex items-center gap-1 ${
                      location.pathname === link.to
                        ? 'text-secondary'
                        : `${textColor} hover:text-secondary`
                    }`}
                  >
                    {link.label}
                    {link.hasDropdown && <ChevronDown size={14} className={`transition-transform ${shopHover ? 'rotate-180' : ''}`} />}
                  </Link>

                  {link.hasDropdown && shopHover && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                      <div className="glass-card shadow-xl p-6 min-w-[280px]">
                        <p className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4">Collections</p>
                        <div className="space-y-1">
                          {categories.filter(c => c.id !== 'all').map(cat => (
                            <Link
                              key={cat.id}
                              to={`/shop?category=${cat.id}`}
                              className="block px-3 py-2.5 text-sm text-text hover:bg-cream hover:text-primary transition-colors"
                            >
                              <span className="font-medium">{cat.name}</span>
                              <span className="block text-xs text-text-muted mt-0.5">{cat.description}</span>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-warm-gray">
                          <Link to="/shop" className="text-xs uppercase tracking-[0.15em] text-secondary font-medium hover:text-secondary-dark transition-colors">
                            View All Collections →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <Link to="/shop" className={`hidden md:block ${textColor} hover:text-secondary transition-colors`}>
                <Search size={20} />
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                className={`relative ${textColor} hover:text-secondary transition-colors cursor-pointer`}
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-secondary text-dark text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden ${textColor} cursor-pointer`}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
        mobileOpen ? 'visible' : 'invisible'
      }`}>
        <div
          className={`absolute inset-0 bg-dark/60 transition-opacity duration-500 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <div className={`absolute top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white transform transition-transform duration-500 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo/logo-final-transparent.png"
                  alt="Helen Shuffon"
                  className="h-12 w-auto"
                />
                <p className="font-heading text-lg font-semibold text-dark">Helen Shuffon</p>
              </div>
              <button onClick={() => setMobileOpen(false)} className="text-text-muted cursor-pointer">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block py-3 px-2 text-base font-medium border-b border-warm-gray transition-colors ${
                    location.pathname === link.to ? 'text-primary' : 'text-dark hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4">Collections</p>
              <div className="space-y-1">
                {categories.filter(c => c.id !== 'all').map(cat => (
                  <Link
                    key={cat.id}
                    to={`/shop?category=${cat.id}`}
                    className="block py-2 px-2 text-sm text-text-muted hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
