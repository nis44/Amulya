import { db } from "@/lib/firebase"; // Firebase Firestore remains the same
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

const CLOUDINARY_UPLOAD_PRESET = "amulya_preset"; // Replace with your Cloudinary upload preset
const CLOUDINARY_CLOUD_NAME = "dgkhrnvli"; // Replace with your Cloudinary cloud name

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

export const createNewAdmin = async ({ data, image }) => {
  if (!image) {
    throw new Error("Image is required");
  }
  if (!data?.name) {
    throw new Error("Name is required");
  }
  if (!data?.email) {
    throw new Error("Email is required");
  }

  const newId = data?.email;

  // Upload image to Cloudinary
  const imageURL = await uploadToCloudinary(image);

  await setDoc(doc(db, `admins/${newId}`), {
    ...data,
    id: newId,
    imageURL: imageURL,
    timestampCreate: Timestamp.now(),
  });
};

export const updateAdmin = async ({ data, image }) => {
  if (!data?.name) {
    throw new Error("Name is required");
  }
  if (!data?.id) {
    throw new Error("ID is required");
  }
  if (!data?.email) {
    throw new Error("Email is required");
  }

  const id = data?.id;
  let imageURL = data?.imageURL;

  if (image) {
    // Upload new image to Cloudinary if provided
    imageURL = await uploadToCloudinary(image);
  }

  if (id === data?.email) {
    await updateDoc(doc(db, `admins/${id}`), {
      ...data,
      imageURL: imageURL,
      timestampUpdate: Timestamp.now(),
    });
  } else {
    const newId = data?.email;

    await deleteDoc(doc(db, `admins/${id}`));

    await setDoc(doc(db, `admins/${newId}`), {
      ...data,
      id: newId,
      imageURL: imageURL,
      timestampUpdate: Timestamp.now(),
    });
  }
};

export const deleteAdmin = async ({ id }) => {
  if (!id) {
    throw new Error("ID is required");
  }
  await deleteDoc(doc(db, `admins/${id}`));
};
