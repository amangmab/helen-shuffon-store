import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { asset } from '../utils/paths';

export default function Footer() {
  return (
    <footer className="bg-dark text-white/80">
      <div className="ethiopian-border-thick" />

      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img
                src={asset('/images/logo/logo-final-transparent.png')}
                alt="Helen Shuffon"
                className="h-14 w-auto"
              />
              <div>
                <h3 className="font-heading text-lg font-semibold text-white">Helen Shuffon</h3>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">Ethiopian Fashion</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/50 mb-6">
              Handcrafted Ethiopian traditional dresses celebrating centuries of cultural heritage.
              Each piece tells a story woven in thread and tradition.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/helen.sultan.9022/photos"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-secondary hover:border-secondary hover:text-dark transition-all cursor-pointer"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://www.instagram.com/helen.sultan.9022/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-secondary hover:border-secondary hover:text-dark transition-all cursor-pointer"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-secondary font-semibold mb-5">Collections</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/shop', label: 'Shop All' },
                { to: '/shop?category=habesha-kemis', label: 'Habesha Kemis' },
                { to: '/shop?category=tilf', label: 'Tilf / Tibeb' },
                { to: '/shop?category=modern', label: 'Modern Ethiopian' },
                { to: '/shop?category=wedding', label: 'Wedding Collection' },
                { to: '/shop?category=accessories', label: 'Accessories' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-white/50 hover:text-secondary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-secondary font-semibold mb-5">Customer Care</h4>
            <ul className="space-y-2.5 text-sm text-white/50">
              <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-secondary transition-colors">Our Story</Link></li>
              <li><span className="cursor-default">Shipping & Returns</span></li>
              <li><span className="cursor-default">Size Guide</span></li>
              <li><span className="cursor-default">Care Instructions</span></li>
              <li><span className="cursor-default">Custom Orders</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-secondary font-semibold mb-5">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-secondary flex-shrink-0" />
                <a href="mailto:helen@helenshuffon.com" className="hover:text-secondary transition-colors">
                  helen@helenshuffon.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-secondary flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-secondary transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-secondary flex-shrink-0 mt-0.5" />
                <span>Addis Ababa, Ethiopia</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs text-white/40 mb-2">Subscribe to our newsletter</p>
              <form className="flex" onSubmit={e => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-secondary transition-colors"
                />
                <button type="submit" className="px-4 py-2 bg-secondary text-dark text-xs font-semibold uppercase tracking-wider hover:bg-secondary-light transition-colors cursor-pointer">
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Helen Shuffon. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/30">
            <span className="cursor-default">Privacy Policy</span>
            <span className="cursor-default">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
