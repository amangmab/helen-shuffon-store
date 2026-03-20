import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Award, RefreshCw, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories, testimonials } from '../data/products';
import { asset } from '../utils/paths';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';

export default function Home() {
  const featured = products.filter(p =>
    p.badge === 'Best Seller' || p.badge === 'New Arrival' || p.badge === 'Trending' || p.badge === 'Premium'
  ).slice(0, 4);

  // Scroll reveal refs
  const trustRef = useStaggerReveal({ stagger: 80 });
  const collectionsHeaderRef = useScrollReveal();
  const collectionsGridRef = useStaggerReveal({ stagger: 120 });
  const featuredHeaderRef = useScrollReveal();
  const featuredGridRef = useStaggerReveal({ stagger: 120 });
  const heritageRef = useScrollReveal();
  const testimonialsHeaderRef = useScrollReveal();
  const testimonialsGridRef = useStaggerReveal({ stagger: 150 });
  const socialRef = useScrollReveal();
  const newsletterRef = useScrollReveal();

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-dark overflow-hidden">
        <div className="absolute inset-0 ethiopian-pattern" />

        {/* Hero image on right side */}
        <div className="hidden lg:block absolute right-0 top-0 h-full w-[55%]">
          <img
            src={asset('/images/hero/hero-main.png')}
            alt=""
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-dark/30" />
        </div>

        {/* Mobile: subtle background */}
        <div className="lg:hidden absolute inset-0">
          <img
            src={asset('/images/hero/hero-main.png')}
            alt=""
            className="h-full w-full object-cover object-top opacity-30"
          />
          <div className="absolute inset-0 bg-dark/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-xl hero-animate">
            <p className="text-secondary uppercase tracking-[0.35em] text-xs font-medium mb-6">
              Ethiopian Traditional Fashion
            </p>
            <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-8 tracking-tight">
              Elegance <br />
              Woven in <br />
              <span className="text-gradient-gold italic font-light">Tradition</span>
            </h1>
            <p className="text-white/50 text-base max-w-md mb-10 leading-relaxed font-light">
              Discover authentic handcrafted Habesha Kemis and Ethiopian traditional dresses.
              Each piece celebrates centuries of cultural heritage.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="btn-gold flex items-center gap-2">
                Shop Collection <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn-secondary border-white/20 text-white hover:bg-white/10 hover:border-white/40">
                Our Story
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 animate-float flex flex-col items-center gap-2 text-white/30">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white py-5 border-b border-warm-gray">
        <div ref={trustRef} className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, label: 'Worldwide Shipping', sub: 'To your doorstep' },
            { icon: Shield, label: 'Secure Payment', sub: '100% protected' },
            { icon: Award, label: 'Authentic Crafts', sub: 'Handmade in Ethiopia' },
            { icon: RefreshCw, label: 'Easy Returns', sub: '30-day guarantee' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} data-reveal className="flex items-center gap-3 justify-center py-2">
              <Icon size={20} className="text-secondary flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-dark uppercase tracking-wide">{label}</p>
                <p className="text-[11px] text-text-muted">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="section-padding max-w-7xl mx-auto">
        <div ref={collectionsHeaderRef} className="text-center mb-14 reveal-fade-up">
          <p className="text-secondary uppercase tracking-[0.25em] text-xs font-medium mb-3">Explore</p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-dark">Our Collections</h2>
        </div>

        <div ref={collectionsGridRef} className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {categories.filter(c => c.id !== 'all').map((cat, i) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.id}`}
              data-reveal
              className={`relative group overflow-hidden ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <div className={`${i === 0 ? 'h-64 md:h-full min-h-[320px]' : 'h-48 md:h-56'} relative flex items-end p-5 md:p-6 transition-all duration-700 group-hover:scale-[1.02]`}>
                {cat.image ? (
                  <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient}`} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-transparent" />
                <div className="relative z-10">
                  <h3 className="font-heading text-lg md:text-xl font-semibold text-white">{cat.name}</h3>
                  <p className="text-white/50 text-xs mt-1 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Shop Now <ArrowRight size={12} />
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div ref={featuredHeaderRef} className="flex items-end justify-between mb-14 reveal-fade-up">
            <div>
              <p className="text-secondary uppercase tracking-[0.25em] text-xs font-medium mb-3">Handpicked</p>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-dark">Featured Dresses</h2>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-sm font-medium text-text-muted hover:text-secondary hover:gap-3 transition-all uppercase tracking-wider">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div ref={featuredGridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {featured.map(product => (
              <div key={product.id} data-reveal>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <Link to="/shop" className="md:hidden btn-secondary block text-center mt-10">
            View All Dresses
          </Link>
        </div>
      </section>

      {/* Heritage Banner */}
      <section className="relative py-28 bg-dark overflow-hidden">
        <div className="absolute inset-0">
          <img src={asset('/images/hero/tibeb-pattern.png')} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/70 to-dark" />
        </div>
        <div className="absolute inset-0 ethiopian-pattern" />
        <div ref={heritageRef} className="relative z-10 max-w-3xl mx-auto text-center px-4 reveal-fade-up">
          <p className="text-secondary uppercase tracking-[0.35em] text-xs font-medium mb-5">Our Heritage</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Every Stitch Tells <br className="hidden md:block" />a Story
          </h2>
          <p className="text-white/40 text-base max-w-xl mx-auto mb-10 leading-relaxed">
            For generations, Ethiopian women have woven stories into fabric. Each tibeb pattern
            carries meaning — from symbols of faith and love to markers of regional identity.
          </p>
          <Link to="/about" className="btn-gold">
            Read Our Story
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding max-w-7xl mx-auto">
        <div ref={testimonialsHeaderRef} className="text-center mb-14 reveal-fade-up">
          <p className="text-secondary uppercase tracking-[0.25em] text-xs font-medium mb-3">Love Notes</p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-dark">What Our Customers Say</h2>
        </div>

        <div ref={testimonialsGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(review => (
            <div key={review.name} data-reveal className="bg-white p-8 border border-warm-gray hover:border-secondary/30 transition-colors">
              <div className="flex items-center gap-0.5 mb-5">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-text-muted text-sm italic leading-relaxed mb-6">"{review.text}"</p>
              <div className="border-t border-warm-gray pt-4">
                <p className="font-medium text-dark text-sm">{review.name}</p>
                <p className="text-xs text-text-light">{review.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social CTA */}
      <section className="bg-dark py-20">
        <div ref={socialRef} className="max-w-4xl mx-auto text-center px-4 reveal-fade-up">
          <p className="text-secondary uppercase tracking-[0.25em] text-xs font-medium mb-3">Follow Us</p>
          <h2 className="font-heading text-3xl font-semibold text-white mb-4">@helen.sultan.9022</h2>
          <p className="text-white/40 mb-8 text-sm max-w-md mx-auto">
            Follow us on Instagram and Facebook for new arrivals, styling tips, and behind-the-scenes content.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.instagram.com/helen.sultan.9022/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Follow on Instagram
            </a>
            <a
              href="https://www.facebook.com/helen.sultan.9022/photos"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary border-white/20 text-white hover:bg-white/10"
            >
              Visit Facebook
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-cream">
        <div ref={newsletterRef} className="max-w-lg mx-auto text-center reveal-fade-up">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-dark mb-3">Stay Connected</h2>
          <p className="text-text-muted text-sm mb-8">Get notified about new collections, exclusive offers, and cultural stories.</p>
          <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="input-field flex-1"
            />
            <button type="submit" className="btn-dark whitespace-nowrap">
              Subscribe
            </button>
          </form>
          <p className="text-[11px] text-text-light mt-4">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </section>
    </main>
  );
}
