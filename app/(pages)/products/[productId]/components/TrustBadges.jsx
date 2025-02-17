export default function TrustBadges() {
  return (
    <div className="flex justify-center gap-4 py-6">
      {/* SSL Secure */}
      <img 
        src="/trust-badges/ssl-secure.svg" 
        alt="SSL Secure" 
        className="h-12 w-12 object-contain"
      />
      
      {/* 24K Gold Certified */}
      <img
        src="/trust-badges/24k-gold.svg"
        alt="24K Gold Certified"
        className="h-12 w-12 object-contain"
      />

      {/* Free Shipping */}
      <img
        src="/trust-badges/free-shipping.svg"
        alt="Free Shipping"
        className="h-12 w-12 object-contain"
      />
    </div>
  )
}
