import { ProductCard } from "@/app/components/Products";
import { getProductsByCategory } from "@/lib/firestore/products/read_server";

export default async function RelatedProducts({ categoryId, currentProductId }) {
  const products = await getProductsByCategory({ categoryId });
  const filteredProducts = products?.filter(p => p.id !== currentProductId);

  return (
    <div className="w-full bg-[#F9F6F4] py-12 border-t border-[#EBD1C4]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-serif text-3xl font-bold text-[#5E121D] text-center mb-8">
          Complete Your Look
        </h2>
        
        {filteredProducts?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.slice(0, 4).map((item) => (
              <ProductCard 
                key={item.id}
                product={item}
                className="hover:-translate-y-2 transition-transform duration-300"
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-[#5E121D]/60 py-12">
            No related jewelry pieces found
          </div>
        )}
      </div>
    </div>
  );
}
