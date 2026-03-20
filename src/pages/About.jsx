import { Link } from 'react-router-dom';
import { Heart, Sparkles, Users, Globe } from 'lucide-react';

export default function About() {
  return (
    <main>
      {/* Hero */}
      <section className="relative py-32 bg-dark overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero/hero-about.png"
            alt=""
            className="w-full h-full object-cover object-top opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-dark/70" />
        </div>
        <div className="absolute inset-0 ethiopian-pattern" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <p className="text-secondary uppercase tracking-[0.35em] text-xs font-medium mb-5">Our Story</p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Weaving Heritage, <br />
            <span className="text-gradient-gold italic">Crafting Beauty</span>
          </h1>
          <p className="text-white/40 text-base max-w-xl mx-auto leading-relaxed">
            Helen Shuffon brings the timeless elegance of Ethiopian traditional dress to the world,
            preserving centuries-old craftsmanship while embracing modern style.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-secondary uppercase tracking-[0.25em] text-xs font-medium mb-3">The Beginning</p>
            <h2 className="font-heading text-3xl font-semibold text-dark mb-6">A Passion Born from Tradition</h2>
            <div className="space-y-4 text-text-muted text-sm leading-relaxed">
              <p>
                Growing up in Ethiopia, Helen was surrounded by the rich textile traditions of her culture.
                She watched her grandmother and mother carefully select fabrics and work with weavers
                to create beautiful Habesha Kemis for every occasion &mdash; from church services to weddings,
                from Meskel celebrations to Timkat festivals.
              </p>
              <p>
                This deep connection to Ethiopian fashion inspired Helen to share the beauty of traditional
                dress with the world. Helen Shuffon was founded with a simple mission: to create authentic,
                high-quality Ethiopian traditional dresses that honor the craft while being accessible to
                the global Ethiopian diaspora and fashion lovers everywhere.
              </p>
              <p>
                Every piece in our collection is handcrafted by skilled artisans in Ethiopia, using
                traditional weaving techniques passed down through generations. The intricate tibeb
                patterns that adorn each garment carry deep cultural significance &mdash;
                each design tells a story of faith, love, and Ethiopian heritage.
              </p>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden group">
            <img
              src="/images/hero/hero-about.png"
              alt="Helen Shuffon - Ethiopian Traditional Weaving"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-white font-heading text-lg font-semibold">Helen Shuffon</p>
              <p className="text-white/60 text-xs mt-1">Founder & Designer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-secondary uppercase tracking-[0.25em] text-xs font-medium mb-3">The Craft</p>
            <h2 className="font-heading text-3xl font-semibold text-dark">How Our Dresses Are Made</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Cotton Selection',
                description: 'We source the finest Ethiopian cotton, known for its softness, breathability, and durability. Each fabric is carefully inspected for quality.',
              },
              {
                step: '02',
                title: 'Traditional Weaving',
                description: 'Skilled weavers use traditional handlooms to create the fabric, incorporating tibeb patterns that have been refined over centuries.',
              },
              {
                step: '03',
                title: 'Hand Embroidery',
                description: 'Expert embroiderers add intricate cross-stitch and satin-stitch details, bringing each garment to life with cultural patterns and symbols.',
              },
            ].map(({ step, title, description }) => (
              <div key={step} className="relative p-8 border border-warm-gray hover:border-secondary/30 transition-colors">
                <span className="text-6xl font-heading font-bold text-secondary/10 absolute top-4 right-6">{step}</span>
                <div className="relative">
                  <h3 className="font-heading text-xl font-semibold text-dark mb-3">{title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-secondary uppercase tracking-[0.25em] text-xs font-medium mb-3">Our Values</p>
          <h2 className="font-heading text-3xl font-semibold text-dark">What We Stand For</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Heart,
              title: 'Cultural Preservation',
              description: 'Honoring traditional Ethiopian weaving techniques and tibeb patterns passed down for centuries.',
            },
            {
              icon: Sparkles,
              title: 'Artisan Craftsmanship',
              description: 'Every garment is handcrafted by skilled Ethiopian artisans ensuring authentic artistry.',
            },
            {
              icon: Users,
              title: 'Community Impact',
              description: 'Supporting local weaving communities with fair wages and sustaining traditional crafts.',
            },
            {
              icon: Globe,
              title: 'Global Reach',
              description: 'Bringing Ethiopian fashion worldwide — shipping to North America, Europe, Africa, and beyond.',
            },
          ].map(({ icon: Icon, title, description }) => (
            <div key={title} className="text-center p-6">
              <div className="w-14 h-14 mx-auto mb-4 border border-secondary/30 flex items-center justify-center">
                <Icon size={22} className="text-secondary" />
              </div>
              <h3 className="font-heading text-base font-semibold text-dark mb-2">{title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-gradient-to-r from-dark to-espresso overflow-hidden">
        <div className="absolute inset-0 ethiopian-pattern" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Explore Our Collection?
          </h2>
          <p className="text-white/40 mb-8 max-w-md mx-auto text-sm">
            Browse our handcrafted Ethiopian traditional dresses and find the perfect piece for your next celebration.
          </p>
          <Link to="/shop" className="btn-gold">
            Shop Now
          </Link>
        </div>
      </section>
    </main>
  );
}
