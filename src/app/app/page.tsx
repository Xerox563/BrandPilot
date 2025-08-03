"use client";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import VoiceInput from "../ui/VoiceInput";
import BlogFormatter from "../ui/BlogFormatter";

function saveBlogToLocal(blog: any) {
  const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
  const id = Date.now().toString();
  const newBlog = { ...blog, id };
  blogs.push(newBlog);
  localStorage.setItem("blogs", JSON.stringify(blogs));
  return id;
}

export default function AppPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [idea, setIdea] = useState("");
  const [dark, setDark] = useState(false);
  const [blog, setBlog] = useState("");
  const [blogSummary, setBlogSummary] = useState("");
  const [rephrased, setRephrased] = useState("");
  const [showIdea, setShowIdea] = useState(true);
  const [showBlog, setShowBlog] = useState(true);
  const [showRephrased, setShowRephrased] = useState(true);
  const [loading, setLoading] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [wordCount, setWordCount] = useState(200);
  const [tone, setTone] = useState("professional");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const TONES = [
    { value: "professional", label: "Professional" },
    { value: "friendly", label: "Friendly" },
    { value: "witty", label: "Witty" },
  ];

  async function handleGenerateBlog() {
    if (!idea) return;
    setLoading("blog");
    setError("");
    setBlog("");
    setBlogSummary("");
    setRephrased("");
    setLoadingStep(0);
    
    // AI-style loading sequence
    const loadingSteps = [
      "🤖 Analyzing your idea...",
      "🧠 Processing with AI...", 
      "📝 Generating content...",
      "✨ Adding finishing touches...",
      "🎯 Optimizing for engagement..."
    ];
    
    const loadingInterval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < loadingSteps.length - 1) {
          setLoadingMessage(loadingSteps[prev + 1]);
          return prev + 1;
        }
        return prev;
      });
    }, 1500);
    
    try {
      const res = await fetch("/app/api/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: idea, wordCount, tone }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setBlog(data.summary);
      setBlogSummary(data.blogSummary);
      setBlogTitle(data.summary.slice(0, 40) + (data.summary.length > 40 ? "..." : ""));
    } catch (err: any) {
      setError(err.message || "Blog generation failed.");
    } finally {
      clearInterval(loadingInterval);
      setLoading("");
      setLoadingMessage("");
      setLoadingStep(0);
    }
  }

  async function handleRephrase() {
    if (!blog) return;
    setLoading("rephrase");
    setError("");
    setRephrased("");
    setLoadingStep(0);
    
    // Rephrasing loading sequence
    const rephraseSteps = [
      "🔄 Analyzing content...",
      "💭 Finding alternatives...",
      "✍️ Rewriting with AI...",
      "🎨 Styling variations...",
      "✨ Finalizing new version..."
    ];
    
    const loadingInterval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < rephraseSteps.length - 1) {
          setLoadingMessage(rephraseSteps[prev + 1]);
          return prev + 1;
        }
        return prev;
      });
    }, 1200);
    
    try {
      const res = await fetch("/app/api/rephrase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: blog, wordCount, tone }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setRephrased(data.rephrased);
    } catch (err: any) {
      setError(err.message || "Rephrasing failed.");
    } finally {
      clearInterval(loadingInterval);
      setLoading("");
      setLoadingMessage("");
      setLoadingStep(0);
    }
  }

  async function handlePublish() {
    if (!blogTitle || !(blog || rephrased)) {
      setError("Please fill in blog title and content.");
      return;
    }
    
    setLoading("publish");
    setError("");
    
    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: blogTitle,
          content: rephrased || blog,
          idea,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save blog");
      }

      const savedBlog = await response.json();
      router.push(`/blog/${savedBlog._id}`);
    } catch (err: any) {
      setError(err.message || "Failed to save blog.");
    } finally {
      setLoading("");
    }
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className={dark ? "dark bg-gray-900 text-white min-h-screen" : "bg-gray-50 text-gray-900 min-h-screen"}>
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">AI Blog Generator</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Create, publish, and share your content with AI</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Welcome, {session.user.name}</span>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {session.user.name?.charAt(0).toUpperCase()}
              </div>
            </div>
            <Link
              href="/blogs"
              className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg font-semibold transition border border-gray-200 dark:border-gray-600"
            >
              My Blogs
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-2 rounded-lg font-semibold transition"
            >
              Sign Out
            </button>
            <button
              className="rounded-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold text-sm transition hover:bg-gray-50 dark:hover:bg-gray-600"
              onClick={() => setDark((d) => !d)}
            >
              {dark ? "🌞 Light" : "🌙 Dark"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input & Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Voice Input */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">💬 Voice Input</h3>
              <VoiceInput 
                onTranscript={setIdea}
                placeholder="Speak or type your blog idea here..."
              />
            </div>

            {/* Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">⚙️ Settings</h3>
              
              {/* Word Count */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Word Count:</label>
                <select
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={wordCount}
                  onChange={e => setWordCount(Number(e.target.value))}
                >
                  <option value={100}>100 words</option>
                  <option value={200}>200 words</option>
                  <option value={300}>300 words</option>
                  <option value={500}>500 words</option>
                  <option value={800}>800 words</option>
                  <option value={1000}>1000 words</option>
                </select>
              </div>

              {/* Tone Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Tone:</label>
                <div className="grid grid-cols-3 gap-2">
                  {TONES.map((toneOption) => (
                    <button
                      key={toneOption.value}
                      onClick={() => setTone(toneOption.value)}
                      className={`p-2 rounded-lg border transition-all text-sm ${
                        tone === toneOption.value
                          ? "border-blue-500 bg-blue-500 text-white"
                          : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
                      }`}
                    >
                      {toneOption.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={handleGenerateBlog} 
                  disabled={!idea || loading === 'blog'}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading === 'blog' ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {loadingMessage || "🤖 Analyzing your idea..."}
                    </div>
                  ) : (
                    'Generate Blog'
                  )}
                </button>
                
                <button 
                  onClick={handleRephrase} 
                  disabled={!blog || loading === 'rephrase'}
                  className="w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading === 'rephrase' ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {loadingMessage || "🔄 Analyzing content..."}
                    </div>
                  ) : (
                    'Rephrase Blog'
                  )}
                </button>
              </div>
            </div>

            {/* Blog Metadata */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">📝 Blog Details</h3>
              <div className="space-y-3">
                <input
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Blog Title"
                  value={blogTitle}
                  onChange={e => setBlogTitle(e.target.value)}
                />

                <button 
                  onClick={handlePublish} 
                  disabled={!blog || loading === 'publish'}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading === 'publish' ? 'Publishing...' : 'Publish Blog'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2 space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* AI Loading Animation */}
            {loading && (
              <div className="fixed inset-0 bg-gray-900/80 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center mb-6">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mr-4"></div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI is working its magic...</h3>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-700 dark:text-gray-300 text-lg mb-4 font-medium">{loadingMessage}</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                      <div 
                        className="bg-blue-600 dark:bg-blue-400 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${((loadingStep + 1) / 5) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Step {loadingStep + 1} of 5</p>
                  </div>
                </div>
              </div>
            )}

            {/* Original Idea */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <button 
                className="flex items-center justify-between w-full text-left mb-4"
                onClick={() => setShowIdea(v => !v)}
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">💡 Original Idea</h3>
                <span className="text-2xl text-gray-600 dark:text-gray-400">{showIdea ? '▼' : '►'}</span>
              </button>
              {showIdea && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 whitespace-pre-wrap text-sm flex justify-between items-start">
                  <span className="flex-1 text-gray-700 dark:text-gray-300">{idea || <span className="text-gray-400 dark:text-gray-500">No idea yet.</span>}</span>
                  {idea && (
                    <button 
                      className="ml-4 text-xs underline text-blue-600 dark:text-blue-400" 
                      onClick={() => handleCopy(idea)}
                    >
                      Copy
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Generated Blog */}
            {blog && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <button 
                  className="flex items-center justify-between w-full text-left mb-4"
                  onClick={() => setShowBlog(v => !v)}
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">📄 Generated Blog</h3>
                  <span className="text-2xl text-gray-600 dark:text-gray-400">{showBlog ? '▼' : '►'}</span>
                </button>
                {showBlog && (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 whitespace-pre-wrap text-sm flex justify-between items-start">
                    <span className="flex-1 text-gray-700 dark:text-gray-300">{blog}</span>
                    <button 
                      className="ml-4 text-xs underline text-blue-600 dark:text-blue-400" 
                      onClick={() => handleCopy(blog)}
                    >
                      Copy
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Blog Summary */}
            {blogSummary && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <button 
                  className="flex items-center justify-between w-full text-left mb-4"
                  onClick={() => setShowBlog(v => !v)}
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">📋 Blog Summary</h3>
                  <span className="text-2xl text-gray-600 dark:text-gray-400">{showBlog ? '▼' : '►'}</span>
                </button>
                {showBlog && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 whitespace-pre-wrap text-sm flex justify-between items-start">
                    <span className="flex-1 text-gray-700 dark:text-gray-300">{blogSummary}</span>
                    <button 
                      className="ml-4 text-xs underline text-blue-600 dark:text-blue-400" 
                      onClick={() => handleCopy(blogSummary)}
                    >
                      Copy
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Rephrased Version */}
            {rephrased && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <button 
                  className="flex items-center justify-between w-full text-left mb-4"
                  onClick={() => setShowRephrased(v => !v)}
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">🔄 Rephrased Version</h3>
                  <span className="text-2xl text-gray-600 dark:text-gray-400">{showRephrased ? '▼' : '►'}</span>
                </button>
                {showRephrased && (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 whitespace-pre-wrap text-sm flex justify-between items-start">
                    <span className="flex-1 text-gray-700 dark:text-gray-300">{rephrased}</span>
                    <button 
                      className="ml-4 text-xs underline text-blue-600 dark:text-blue-400" 
                      onClick={() => handleCopy(rephrased)}
                    >
                      Copy
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Blog Formatter */}
            {blog && (
              <BlogFormatter blogContent={blog} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
