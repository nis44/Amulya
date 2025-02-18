import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F9F6F4] border-t border-[#EBD1C4]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <img src="/logo.png" alt="Amulya Jewelry" className="h-12 w-auto mb-4" />
            <p className="text-[#5E121D]/80 text-sm">
              Crafting Timeless Elegance Since 2024
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#5E121D] mb-4">
              Collections
            </h3>
            <ul className="space-y-2">
              {['Necklaces', 'Rings', 'Earrings', 'Bracelets'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-[#5E121D]/80 hover:text-[#8A1A2B] transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#5E121D] mb-4">
              Policies
            </h3>
            <ul className="space-y-2">
              {['Shipping', 'Returns', 'Privacy', 'Terms'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-[#5E121D]/80 hover:text-[#8A1A2B] transition-colors text-sm">
                    {item} Policy
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#5E121D] mb-4">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#EBD1C4]" />
                <div>
                  <p className="text-[#5E121D] font-medium text-sm">+91 910 000 0000</p>
                  <p className="text-[#5E121D]/80 text-sm">Mon-Sat: 10AM - 7PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#EBD1C4]" />
                <p className="text-[#5E121D]/80 text-sm">contact@amulyajewelry.com</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#EBD1C4]" />
                <p className="text-[#5E121D]/80 text-sm">
                  Jewelers Street,<br />
                  New Delhi, India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-[#EBD1C4] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-4">
              {['facebook', 'instagram', 'pinterest'].map((platform) => (
                <button
                  key={platform}
                  className="text-[#5E121D] hover:text-[#8A1A2B] transition-colors"
                  aria-label={`Follow us on ${platform}`}
                >
                  <img 
                    src={`/social/${platform}.svg`} 
                    className="w-6 h-6"
                    alt={platform}
                  />
                </button>
              ))}
            </div>
            <p className="text-[#5E121D]/80 text-sm text-center">
              © 2024 Amulya Jewelry. All rights reserved.<br />
              Crafted with ♡ in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
