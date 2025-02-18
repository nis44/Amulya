import React from 'react';
import Image from 'next/image';
import { Diamond, HandMetal, Gem, HeartHandshake } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#F9F6F4]">
      {/* Hero Section */}
      <section className="relative h-96 bg-[#5E121D] flex items-center justify-center">
        <div className="text-center z-10">
          <h1 className="font-serif text-4xl md:text-6xl text-[#EBD1C4] mb-4">
            Crafting Timeless Elegance
          </h1>
          <p className="text-xl text-[#EBD1C4]/80 max-w-2xl mx-auto">
            Where Heritage Meets Modern Craftsmanship
          </p>
        </div>
        <div className="absolute inset-0 bg-opacity-30 bg-gradient-to-b from-[#5E121D]/80 to-[#5E121D]/30" />
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-serif text-3xl text-[#5E121D] border-l-4 border-[#EBD1C4] pl-4">
              Our Journey Began at the Bench
            </h2>
            <p className="text-[#5E121D]/80 leading-relaxed">
              Founded in 2010 by master goldsmith Rajendra Verma, Amulya Jewels started 
              as a small workshop in New Delhi's historic jewelry quarter. What began 
              as a passion for transforming raw gems into wearable art has blossomed 
              into a celebration of India's rich jewelry heritage.
            </p>
            <blockquote className="pl-6 border-l-2 border-[#EBD1C4] italic text-[#5E121D]/90">
              "Every piece tells a story - of earth's treasures, skilled hands, 
              and the moments they'll adorn."
            </blockquote>
          </div>
          <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/craftsmanship-process.jpg"
              alt="Artisan at work"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-serif text-3xl text-[#5E121D] text-center mb-12">
            The Amulya Difference
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <Diamond className="w-12 h-12 text-[#5E121D] mx-auto mb-4" />
              <h3 className="font-serif text-xl mb-2">Ethically Sourced</h3>
              <p className="text-[#5E121D]/80 text-sm">
                Conflict-free diamonds and fair-trade gold from certified sources
              </p>
            </div>
            <div className="text-center p-6">
              <HandMetal className="w-12 h-12 text-[#5E121D] mx-auto mb-4" />
              <h3 className="font-serif text-xl mb-2">Handcrafted Precision</h3>
              <p className="text-[#5E121D]/80 text-sm">
                200+ hours of artisan craftsmanship per piece
              </p>
            </div>
            <div className="text-center p-6">
              <Gem className="w-12 h-12 text-[#5E121D] mx-auto mb-4" />
              <h3 className="font-serif text-xl mb-2">Custom Creations</h3>
              <p className="text-[#5E121D]/80 text-sm">
                Bespoke designs tailored to your story
              </p>
            </div>
            <div className="text-center p-6">
              <HeartHandshake className="w-12 h-12 text-[#5E121D] mx-auto mb-4" />
              <h3 className="font-serif text-xl mb-2">Lifetime Care</h3>
              <p className="text-[#5E121D]/80 text-sm">
                Completary cleaning and repair services
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl text-[#5E121D] mb-4">
            Meet Our Master Craftsmen
          </h2>
          <p className="text-[#5E121D]/80 max-w-2xl mx-auto">
            Our team of 50+ artisans preserves ancient techniques while innovating 
            modern designs, each with 10+ years of experience
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="group relative h-96 rounded-xl overflow-hidden">
              <Image
                src={`/artisan-${item}.jpg`}
                alt="Artisan team member"
                fill
                className="object-cover transform group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5E121D] via-transparent to-transparent flex items-end p-6">
                <div className="text-[#EBD1C4]">
                  <h3 className="font-serif text-xl">Rajendra Verma</h3>
                  <p className="text-sm opacity-80">Master Goldsmith</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#5E121D] py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="font-serif text-3xl text-[#EBD1C4] mb-6">
            Experience the Amulya Difference
          </h2>
          <p className="text-[#EBD1C4]/80 mb-8">
            Visit our virtual showroom or book a private consultation
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-[#EBD1C4] text-[#5E121D] px-8 py-3 rounded-full hover:bg-opacity-90 transition-all">
              Explore Collections
            </button>
            <button className="border-2 border-[#EBD1C4] text-[#EBD1C4] px-8 py-3 rounded-full hover:bg-[#EBD1C4] hover:text-[#5E121D] transition-all">
              Book Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
