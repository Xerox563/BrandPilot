"use client";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function TestQuill() {
  return (
    <div>
      <h1>Test Quill</h1>
      <ReactQuill value="" onChange={() => {}} />
    </div>
  );
}