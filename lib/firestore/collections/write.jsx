import { db } from "@/lib/firebase"; // Firebase Firestore remains the same
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

const CLOUDINARY_UPLOAD_PRESET = "amulya_preset";
const CLOUDINARY_CLOUD_NAME = "dgkhrnvli";

// Function to upload image to Cloudinary
const uploadToCloudinary = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload image to Cloudinary");
  }

  const data = await response.json();
  return data.secure_url; // Cloudinary returns a secure URL for the uploaded image
};

export const createNewCollection = async ({ data, image }) => {
  if (!image) {
    throw new Error("Image is Required");
  }
  if (!data?.title) {
    throw new Error("Name is required");
  }
  if (!data?.products || data?.products?.length === 0) {
    throw new Error("Products is required");
  }

  const newId = doc(collection(db, `ids`)).id;
  const imageURL = await uploadToCloudinary(image);

  await setDoc(doc(db, `collections/${newId}`), {
    ...data,
    id: newId,
    imageURL: imageURL,
  });
};

export const updateCollection = async ({ data, image }) => {
  if (!data?.title) {
    throw new Error("Name is required");
  }
  if (!data?.products || data?.products?.length === 0) {
    throw new Error("Products is required");
  }
  if (!data?.id) {
    throw new Error("ID is required");
  }

  const id = data?.id;
  let imageURL = data?.imageURL;

  if (image) {
    imageURL = await uploadToCloudinary(image);
  }

  await updateDoc(doc(db, `collections/${id}`), {
    ...data,
    imageURL: imageURL,
  });
};

export const deleteCollection = async ({ id }) => {
  if (!id) {
    throw new Error("ID is required");
  }
  await deleteDoc(doc(db, `collections/${id}`));
};
