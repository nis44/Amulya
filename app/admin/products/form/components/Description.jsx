"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

const TextEditor = () => {
  const ReactQuill = useMemo(
    () =>
      dynamic(() => import("react-quill"), {
        ssr: false,
        loading: () => <div className="h-[300px] bg-gray-50 animate-pulse rounded-lg" />,
      }),
    []
  );

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["extra-small", "small", "medium", "large"] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
          [{ color: [] }, { background: [] }],
          ["clean"],
        ],
      },
    }),
    []
  );

  return (
    <ReactQuill
      modules={modules}
      theme="snow"
      className="rounded-lg border"
    />
  );
};

export default function Description({ data, handleData }) {
  const handleChange = (value) => {
    handleData("description", value);
  };

  return (
    <section className="flex flex-col gap-3 bg-white border p-4 rounded-xl h-full">
      <h1 className="font-semibold">Description</h1>
      <TextEditor
        value={data?.description}
        onChange={handleChange}
      />
    </section>
  );
}