"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ value, onChange }) => {
  const ReactQuill = useMemo(
    () =>
      dynamic(() => import("react-quill"), {
        ssr: false,
        loading: () => (
          <div className="h-[300px] bg-[#F9F6F4] animate-pulse rounded-lg border-2 border-dashed border-[#EBD1C4]" />
        ),
      }),
    []
  );

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          [{ color: ["#5E121D", "#8A1A2B", "#EBD1C4", "#000000"] }],
          [{ align: [] }],
          ["clean"],
        ],
        handlers: {
          color: (value) => {
            document.querySelector(".ql-color .ql-picker-label").style.color = value || "#5E121D";
          }
        }
      },
    }),
    []
  );

  const formats = [
    "header",
    "bold", "italic", "underline", "strike",
    "list", "bullet",
    "link", "image",
    "color", "align"
  ];

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      theme="snow"
      placeholder="Describe your jewelry piece in detail (materials, dimensions, care instructions)..."
      className="rounded-xl border-[#EBD1C4] focus-within:border-[#5E121D] transition-colors"
      style={{ minHeight: "300px" }}
    />
  );
};

export default function Description({ data, handleData }) {
  const handleChange = (value) => {
    handleData("description", value);
  };

  return (
    <section className="flex flex-col gap-4 bg-white border-[#EBD1C4] p-5 rounded-xl shadow-sm">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-serif font-bold text-[#5E121D]">
          Product Story
        </h1>
        <span className="text-sm text-[#8A1A2B]">
          {data?.description?.length || 0}/2000 characters
        </span>
      </div>
      
      <TextEditor
        value={data?.description || ""}
        onChange={handleChange}
      />

      <div className="text-sm text-[#5E121D]/80 pt-2 border-t border-[#EBD1C4]">
        <p className="font-medium">Writing Tips:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Describe materials (e.g., 18k gold, VS diamonds)</li>
          <li>Include dimensions and weight</li>
          <li>Add care instructions</li>
          <li>Highlight unique craftsmanship details</li>
        </ul>
      </div>
    </section>
  );
}
