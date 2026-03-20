import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, LayoutGrid, Grid3X3 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import { asset } from '../utils/paths';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [gridCols, setGridCols] = useState(3);
  const [sortBy, setSortBy] = useState('featured');

  const activeCategory = searchParams.get('category') || 'all';

  const setCategory = (cat) => {
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const filtered = useMemo(() => {
    let items = activeCategory === 'all'
      ? products
      : products.filter(p => p.category === activeCategory);

    switch (sortBy) {
      case 'price-low': return [...items].sort((a, b) => a.price - b.price);
      case 'price-high': return [...items].sort((a, b) => b.price - a.price);
      case 'rating': return [...items].sort((a, b) => b.rating - a.rating);
      case 'newest': return [...items].sort((a, b) => b.id - a.id);
      default: return items;
    }
  }, [activeCategory, sortBy]);

  const activeCategoryName = activeCategory === 'all'
    ? 'All Collections'
    : categories.find(c => c.id === activeCategory)?.name || 'Shop';

  return (
    <main>
      {/* Hero Banner */}
      <section className="relative py-28 bg-dark overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={asset('/images/hero/hero-shop.png')}
            alt=""
            className="w-full h-full object-cover object-top opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/80" />
        </div>
        <div className="absolute inset-0 ethiopian-pattern" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <p className="text-secondary uppercase tracking-[0.35em] text-xs font-medium mb-4">Collection</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3">
            {activeCategoryName}
          </h1>
          <p className="text-white/40 text-sm">
            {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'} of Ethiopian artistry
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto section-padding">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-warm-gray">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-dark text-white'
                    : 'bg-white text-text-muted hover:bg-warm-gray border border-warm-gray'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort & View */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-warm-gray px-4 py-2 pr-8 text-xs uppercase tracking-wider text-text-muted cursor-pointer focus:outline-none focus:border-dark"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            </div>

            <div className="hidden md:flex items-center border border-warm-gray">
              <button
                onClick={() => setGridCols(2)}
                className={`p-2 cursor-pointer transition-colors ${gridCols === 2 ? 'bg-dark text-white' : 'text-text-muted hover:bg-warm-gray'}`}
              >
                <LayoutGrid size={14} />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={`p-2 cursor-pointer transition-colors ${gridCols === 3 ? 'bg-dark text-white' : 'text-text-muted hover:bg-warm-gray'}`}
              >
                <Grid3X3 size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className={`grid grid-cols-2 ${
            gridCols === 2 ? 'md:grid-cols-2 lg:grid-cols-2' : 'md:grid-cols-3 lg:grid-cols-3'
          } gap-4 md:gap-5`}>
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <SlidersHorizontal size={40} className="mx-auto text-warm-gray-dark mb-4" />
            <h3 className="font-heading text-xl text-dark mb-2">No products found</h3>
            <p className="text-text-muted text-sm mb-6">Try adjusting your filters.</p>
            <button onClick={() => setCategory('all')} className="btn-dark">
              View All
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
