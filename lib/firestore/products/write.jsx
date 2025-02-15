import { db } from "@/lib/firebase"; // Firebase Firestore remains the same
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
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

export const createNewProduct = async ({ data, featureImage, imageList }) => {
  if (!data?.title) {
    throw new Error("Title is required");
  }
  if (!featureImage) {
    throw new Error("Feature Image is required");
  }

  const featureImageURL = await uploadToCloudinary(featureImage);
  let imageURLList = [];

  for (let i = 0; i < imageList?.length; i++) {
    const image = imageList[i];
    const url = await uploadToCloudinary(image);
    imageURLList.push(url);
  }

  const newId = doc(collection(db, `ids`)).id;

  await setDoc(doc(db, `products/${newId}`), {
    ...data,
    featureImageURL: featureImageURL,
    imageList: imageURLList,
    id: newId,
    timestampCreate: Timestamp.now(),
  });
};

export const updateProduct = async ({ data, featureImage, imageList }) => {
  if (!data?.title) {
    throw new Error("Title is required");
  }
  if (!data?.id) {
    throw new Error("ID is required");
  }

  let featureImageURL = data?.featureImageURL ?? "";

  if (featureImage) {
    featureImageURL = await uploadToCloudinary(featureImage);
  }

  let imageURLList = imageList?.length === 0 ? data?.imageList : [];

  for (let i = 0; i < imageList?.length; i++) {
    const image = imageList[i];
    const url = await uploadToCloudinary(image);
    imageURLList.push(url);
  }

  await setDoc(doc(db, `products/${data?.id}`), {
    ...data,
    featureImageURL: featureImageURL,
    imageList: imageURLList,
    timestampUpdate: Timestamp.now(),
  });
};

export const deleteProduct = async ({ id }) => {
  if (!id) {
    throw new Error("ID is required");
  }
  await deleteDoc(doc(db, `products/${id}`));
};
