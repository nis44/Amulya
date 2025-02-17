import { getProduct } from "@/lib/firestore/products/read_server";
import Photos from "./components/Photos";
import Details from "./components/Details";
import Reviews from "./components/Reviews";
import RelatedProducts from "./components/RelatedProducts";
import AddReview from "./components/AddReiveiw";
import AuthContextProvider from "@/contexts/AuthContext";
import TrustBadges from "./components/TrustBadges";

export async function generateMetadata({ params }) {
  const { productId } = params;
  const product = await getProduct({ id: productId });

  return {
    title: `${product?.title} | Amulya Jewelry`,
    description: product?.shortDescription ?? "Discover exquisite handcrafted jewelry",
    openGraph: {
      images: [
        {
          url: product?.featureImageURL,
          width: 1200,
          height: 630,
          alt: product?.title,
        },
      ],
    },
    themeColor: '#5E121D',
  };
}

export default async function Page({ params }) {
  const { productId } = params;
  const product = await getProduct({ id: productId });

  return (
    <main className="bg-[#F9F6F4] min-h-screen">
      {/* Main Product Section */}
      <section className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12">
          <Photos
            imageList={[product?.featureImageURL, ...(product?.imageList ?? [])]}
          />
          <Details product={product} />
        </div>
      </section>

      {/* <TrustBadges className="bg-white py-8 border-y border-[#EBD1C4]" /> */}

      {/* Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-[#EBD1C4]">
          <div className="p-6 md:p-8">
            <h2 className="font-serif text-3xl font-bold text-[#5E121D] mb-8 text-center">
              Customer Experiences
            </h2>
            <AuthContextProvider>
              <div className="grid md:grid-cols-2 gap-8">
                <AddReview productId={productId} />
                <Reviews productId={productId} />
              </div>
            </AuthContextProvider>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="bg-white border-t border-[#EBD1C4] ">
        <RelatedProducts 
          categoryId={product?.categoryId}
          currentProductId={productId}
        />
      </section>
    </main>
  );
}
