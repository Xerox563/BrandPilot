"use client";
import React, { useState, useEffect } from "react";

interface BlogAdminEditorProps {
  initialContent: string;
  onSave: (content: string) => void;
  isAdmin: boolean;
}

export default function BlogAdminEditor({
  initialContent,
  onSave,
  isAdmin,
}: BlogAdminEditorProps) {
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState(initialContent || "");

  useEffect(() => {
    setContent(initialContent || "");
  }, [initialContent]);

  const handleSave = async () => {
    setSaving(true);
    await onSave(content);
    setSaving(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Edit Blog Content:
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded min-h-[400px] p-4 text-gray-900 bg-white resize-y"
          placeholder="Edit your blog content here..."
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
