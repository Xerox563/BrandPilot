"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Blog {
  _id: string;
  title: string;
  content: string;
  idea: string;
  author: {
    _id: string;
    name: string;
    email: string;
  };
  published: boolean;
  shareUrl?: string;
  slug?: string;
  views: number;
  likes: number;
  likedBy: string[];
  createdAt: string;
  updatedAt: string;
}

interface TranslatedContent {
  title: string;
  content: string;
  authorName: string;
}

const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
];

export default function BlogPage() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [translatedContent, setTranslatedContent] = useState<TranslatedContent | null>(null);
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    fetchBlog();
  }, [params.id]);

  useEffect(() => {
    if (blog && selectedLanguage !== "en") {
      translateContent();
    } else if (selectedLanguage === "en") {
      setTranslatedContent(null);
    }
  }, [selectedLanguage, blog]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${params.id}`);
      if (!response.ok) {
        throw new Error("Blog not found");
      }
      const data = await response.json();
      console.log('Fetched blog data:', data);
      setBlog(data);
      setLikeCount(data.likes || 0);
      // Check if current user has liked this blog
      if (data.likedBy && Array.isArray(data.likedBy)) {
        // For now, we'll check if the user is logged in and show like status
        // In a real app, you'd check against the current user's ID
        setIsLiked(false); // This will be updated when we add user session
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError("Failed to load blog");
    } finally {
      setLoading(false);
    }
  };

  const translateContent = async () => {
    if (!blog) return;
    
    setTranslating(true);
    try {
      const fullText = `${blog.title}\n\n${blog.content}`;
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: fullText,
          targetLanguage: selectedLanguage
        }),
      });

      if (!response.ok) throw new Error("Translation failed");
      
      const data = await response.json();
      const lines = data.translatedText.split('\n\n');
      
      setTranslatedContent({
        title: lines[0] || blog.title,
        content: lines.slice(1).join('\n\n') || blog.content,
        authorName: blog.author?.name || 'Unknown Author'
      });
    } catch (error) {
      console.error("Translation error:", error);
    } finally {
      setTranslating(false);
    }
  };

  const publishOnline = async () => {
    if (!blog) return;
    
    setPublishing(true);
    try {
      const response = await fetch(`/api/blogs/${blog._id}/publish`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to publish");
      
      const updatedBlog = await response.json();
      setBlog(updatedBlog);
    } catch (error) {
      console.error("Error publishing blog:", error);
    } finally {
      setPublishing(false);
    }
  };

  const copyShareUrl = async () => {
    if (blog?.shareUrl) {
      try {
        await navigator.clipboard.writeText(blog.shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Error copying URL:", error);
      }
    }
  };

  const handleLike = async () => {
    if (!blog) return;
    
    try {
      const response = await fetch(`/api/blogs/${blog._id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to like blog');
      }

      const data = await response.json();
      setIsLiked(data.isLiked);
      setLikeCount(data.likes);
    } catch (error) {
      console.error('Error liking blog:', error);
      setError('Failed to like blog');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const generateAvatar = (name: string | undefined) => {
    if (!name) {
      return { initials: 'U', color: 'bg-gray-500' };
    }
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-yellow-500'];
    const color = colors[name.length % colors.length];
    return { initials, color };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Blog Not Found</h1>
          <p className="text-gray-600">The blog you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const avatar = generateAvatar(blog.author?.name);
  const displayTitle = translatedContent?.title || blog.title;
  const displayContent = translatedContent?.content || blog.content;
  const displayAuthorName = translatedContent?.authorName || blog.author?.name || 'Unknown Author';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">BrandPilot Blog</h1>
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
                {translating && (
                  <div className="absolute right-2 top-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  </div>
                )}
              </div>
              
              {blog.published && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Published
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Blog Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Blog Header */}
          <div className="p-8 border-b">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {displayTitle}
            </h1>
            
            {/* Author Info */}
            <div className="flex items-center space-x-4 mb-6">
              <div className={`w-12 h-12 rounded-full ${avatar.color} flex items-center justify-center text-white font-semibold text-lg`}>
                {avatar.initials}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{displayAuthorName}</p>
                <p className="text-sm text-gray-500">{formatDate(blog.createdAt)}</p>
              </div>
            </div>

            {/* Publishing Section */}
            {!blog.published ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Ready to publish online?</h3>
                <p className="text-blue-700 text-sm mb-3">
                  Make your blog publicly accessible so anyone can read it with a shareable link.
                </p>
                <button
                  onClick={publishOnline}
                  disabled={publishing}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {publishing ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Publishing...
                    </div>
                  ) : (
                    'Publish Online'
                  )}
                </button>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">Published Online</h3>
                <p className="text-green-700 text-sm mb-3">
                  Your blog is now publicly accessible. Share the link with anyone!
                </p>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={blog.shareUrl || ""}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                  />
                  <button
                    onClick={copyShareUrl}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
              </div>
            )}

            {/* Like and View Stats */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-6">
                {/* Like Button */}
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isLiked 
                      ? 'bg-red-100 text-red-600 border border-red-200' 
                      : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  <span className={`text-lg ${isLiked ? 'text-red-500' : 'text-gray-500'}`}>
                    {isLiked ? '❤️' : '🤍'}
                  </span>
                  <span className="font-medium">{likeCount}</span>
                  <span className="text-sm">{likeCount === 1 ? 'like' : 'likes'}</span>
                </button>

                {/* View Count */}
                <div className="flex items-center space-x-2 text-gray-600">
                  <span className="text-lg">👁️</span>
                  <span className="font-medium">{blog.views}</span>
                  <span className="text-sm">{blog.views === 1 ? 'view' : 'views'}</span>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Share:</span>
                <button
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this blog: ${displayTitle}`)}&url=${encodeURIComponent(blog.shareUrl || "")}`, '_blank')}
                  className="text-blue-500 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition"
                >
                  Twitter
                </button>
                <button
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blog.shareUrl || "")}`, '_blank')}
                  className="text-blue-500 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition"
                >
                  LinkedIn
                </button>
              </div>
            </div>
          </div>

          {/* Blog Content */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              {/* Split content into paragraphs */}
              {displayContent.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 bg-gray-50 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full ${avatar.color} flex items-center justify-center text-white font-semibold`}>
                  {avatar.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Written by {displayAuthorName}</p>
                  <p className="text-sm text-gray-500">{formatDate(blog.createdAt)}</p>
                </div>
              </div>
              
              {blog.published && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Share:</span>
                  <button
                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this blog: ${displayTitle}`)}&url=${encodeURIComponent(blog.shareUrl || "")}`, '_blank')}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Twitter
                  </button>
                  <button
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blog.shareUrl || "")}`, '_blank')}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    LinkedIn
                  </button>
                </div>
              )}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
} 