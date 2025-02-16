import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { admin, adminDB } from "@/lib/firebase_admin";
import Link from "next/link";

const fetchCheckout = async (checkoutId) => {
  try {
    // Query using the 'id' field instead of document ID
    const querySnapshot = await adminDB
      .collectionGroup("checkout_sessions_cod")
      .where("id", "==", checkoutId)
      .get();

    if (querySnapshot.empty) {
      console.error("No documents found for checkout ID:", checkoutId);
      return null;
    }

    // Return the first matching document's data
    return querySnapshot.docs[0].data();

  } catch (error) {
    console.error("Error in fetchCheckout:", error.message);
    return null;
  }
};

const processOrder = async ({ checkout }) => {
  if (!checkout) {
    throw new Error("Checkout data is required");
  }
  const order = await adminDB.doc(`orders/${checkout.id}`).get();
  if (order.exists) {
    return false;
  }
  const uid = checkout?.metadata?.uid;

  // Sanitize checkout data
  const sanitizedCheckout = { ...checkout };
  Object.keys(sanitizedCheckout).forEach(key => {
    if (sanitizedCheckout[key] === undefined) {
      sanitizedCheckout[key] = null;
    }
  });

  // Create order document without timestamp
  await adminDB.doc(`orders/${checkout.id}`).set({
    checkout: sanitizedCheckout,
    payment: {
      amount: checkout.line_items?.reduce((prev, curr) => {
        return prev + (curr.price_data?.unit_amount || 0) * (curr.quantity || 0);
      }, 0) || 0,
    },
    uid: uid || null,
    id: checkout.id,
    paymentMode: "cod"
  });

  // Process products and user cart
  const productList = checkout?.line_items?.map((item) => ({
    productId: item?.price_data?.product_data?.metadata?.productId,
    quantity: item?.quantity,
  }));

  const user = await adminDB.doc(`users/${uid}`).get();
  const productIdsList = productList?.map((item) => item?.productId);
  const newCartList = (user?.data()?.carts ?? []).filter(
    (cartItem) => !productIdsList.includes(cartItem?.id)
  );

  await adminDB.doc(`users/${uid}`).set(
    { carts: newCartList },
    { merge: true }
  );

  // Batch update products
  const batch = adminDB.batch();
  productList?.forEach((item) => {
    if (item?.productId) {
      batch.update(adminDB.doc(`products/${item.productId}`), {
        orders: admin.firestore.FieldValue.increment(item.quantity || 0)
      });
    }
  });
  await batch.commit();
  
  return true;
};

export default async function Page({ searchParams }) {
  const { checkout_id } = await searchParams;
  const checkout = await fetchCheckout(checkout_id);

  if (!checkout) {
    return (
      <main>
        <Header />
        <section className="min-h-screen flex flex-col gap-3 justify-center items-center">
          <h1 className="text-2xl font-semibold text-red-600">
            Invalid Checkout ID
          </h1>
          <Link href="/">
            <button className="text-blue-600 border border-blue-600 px-5 py-2 rounded-lg">
              Go Back Home
            </button>
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  try {
    await processOrder({ checkout });
    return (
      <main>
        <Header />
        <section className="min-h-screen flex flex-col gap-3 justify-center items-center">
          <div className="flex justify-center w-full">
            <img src="/svgs/Mobile payments-rafiki.svg" className="h-48" alt="" />
          </div>
          <h1 className="text-2xl font-semibold text-green">
            Your Order Is{" "}
            <span className="font-bold text-green-600">Successfully</span> Placed
          </h1>
          <div className="flex items-center gap-4 text-sm">
            <Link href={"/account"}>
              <button className="text-blue-600 border border-blue-600 px-5 py-2 rounded-lg bg-white">
                Go To Orders Page
              </button>
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  } catch (error) {
    console.error("Order processing failed:", error);
    return (
      <main>
        <Header />
        <section className="min-h-screen flex flex-col gap-3 justify-center items-center">
          <h1 className="text-2xl font-semibold text-red-600">
            Error Processing Order
          </h1>
          <Link href="/">
            <button className="text-blue-600 border border-blue-600 px-5 py-2 rounded-lg">
              Go Back Home
            </button>
          </Link>
        </section>
        <Footer />
      </main>
    );
  }
}