import { db } from "@/lib/firebase";
import { 
  average,
  collection,
  getAggregateFromServer,
  count
} from "firebase/firestore";

export const getProductReviewCounts = async ({ productId }) => {
  try {
    const reviewsRef = collection(db, `products/${productId}/reviews`);
    
    const snapshot = await getAggregateFromServer(reviewsRef, {
      totalReviews: count(),
      averageRating: average('rating')
    });

    const data = snapshot.data();
    
    return {
      totalReviews: data.totalReviews ?? 0,
      averageRating: data.averageRating ?? 0
    };
    
  } catch (error) {
    console.error("Error fetching review aggregates:", error);
    return {
      totalReviews: 0,
      averageRating: 0
    };
  }
};
