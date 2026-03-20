import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { asset } from '../utils/paths';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lastSubmit = localStorage.getItem('last_contact_submit');
    if (lastSubmit && Date.now() - Number(lastSubmit) < 60000) {
      toast.error('Please wait before submitting again.');
      return;
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem('last_contact_submit', String(Date.now()));
    setSubmitted(true);
    setLoading(false);
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative py-28 bg-dark overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={asset('/images/hero/tibeb-pattern.png')}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/80" />
        </div>
        <div className="absolute inset-0 ethiopian-pattern" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4 hero-animate">
          <p className="text-secondary uppercase tracking-[0.35em] text-xs font-medium mb-5">Get in Touch</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            We'd Love to Hear from You
          </h1>
          <p className="text-white/40 text-sm max-w-md mx-auto">
            Questions about sizing, custom orders, or wholesale inquiries? We're here to help.
          </p>
        </div>
      </section>

      <section className="section-padding max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-xl font-semibold text-dark mb-6">Contact Information</h2>
              <div className="space-y-5">
                {[
                  { icon: Mail, label: 'Email', value: 'helen@helenshuffon.com', href: 'mailto:helen@helenshuffon.com' },
                  { icon: Phone, label: 'Phone', value: '+1 (234) 567-890', href: 'tel:+1234567890' },
                  { icon: MapPin, label: 'Location', value: 'Addis Ababa, Ethiopia', href: null },
                  { icon: Clock, label: 'Hours', value: 'Mon-Sat, 9AM-6PM (EAT)', href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-secondary/30 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-dark uppercase tracking-wider">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm text-text-muted hover:text-secondary transition-colors">{value}</a>
                      ) : (
                        <p className="text-sm text-text-muted">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-dark uppercase tracking-wider mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/helen.sultan.9022/photos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-secondary/30 flex items-center justify-center hover:bg-secondary hover:border-secondary hover:text-dark text-secondary transition-all"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="https://www.instagram.com/helen.sultan.9022/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-secondary/30 flex items-center justify-center hover:bg-secondary hover:border-secondary hover:text-dark text-secondary transition-all"
                >
                  <Instagram size={16} />
                </a>
              </div>
            </div>

            <div className="bg-cream p-6">
              <h3 className="font-heading text-base font-semibold text-dark mb-2">Custom Orders</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Looking for a custom-made dress for your wedding or special event?
                We offer bespoke services with custom measurements, unique tibeb patterns,
                and personalized designs. Contact us to discuss your vision.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-cream p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 border-2 border-secondary flex items-center justify-center">
                  <Send size={24} className="text-secondary" />
                </div>
                <h3 className="font-heading text-2xl font-semibold text-dark mb-2">Message Sent!</h3>
                <p className="text-text-muted text-sm mb-6">
                  Thank you for reaching out. We'll get back to you within 24-48 hours.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-dark">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-8 border border-warm-gray">
                <h2 className="font-heading text-xl font-semibold text-dark mb-6">Send a Message</h2>

                <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-semibold text-dark mb-2 uppercase tracking-wider">First Name *</label>
                    <input type="text" required className="input-field" placeholder="Your first name" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-dark mb-2 uppercase tracking-wider">Last Name *</label>
                    <input type="text" required className="input-field" placeholder="Your last name" />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-xs font-semibold text-dark mb-2 uppercase tracking-wider">Email *</label>
                  <input type="email" required className="input-field" placeholder="your@email.com" />
                </div>

                <div className="mb-5">
                  <label className="block text-xs font-semibold text-dark mb-2 uppercase tracking-wider">Subject</label>
                  <select className="input-field text-text-muted">
                    <option>General Inquiry</option>
                    <option>Custom Order</option>
                    <option>Sizing Help</option>
                    <option>Shipping Question</option>
                    <option>Wholesale Inquiry</option>
                    <option>Return / Exchange</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-semibold text-dark mb-2 uppercase tracking-wider">Message *</label>
                  <textarea
                    required
                    rows="5"
                    className="input-field resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-dark w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : <><Send size={14} /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
