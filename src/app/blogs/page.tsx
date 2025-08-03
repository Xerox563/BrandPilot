"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

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

export default function BlogsPage() {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs/public");
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateAvatar = (name: string | undefined) => {
    if (!name) return { initials: "U", color: "bg-gray-500" };
    const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-yellow-500"];
    const color = colors[name.length % colors.length];
    return { initials, color };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const copyShareUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      // You could add a toast notification here
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.author.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    if (filter === "published") return blog.published && matchesSearch;
    if (filter === "recent") {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(blog.createdAt) > weekAgo && matchesSearch;
    }
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Published Blogs</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Discover amazing content from our community</p>
          </div>
          {session ? (
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/blog/blogs"
                className="bg-gray-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-700 transition text-sm sm:text-base text-center"
              >
                My Blogs
              </Link>
              <Link
                href="/app"
                className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-sm sm:text-base text-center"
              >
                Create Blog
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/auth/signin"
                className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-sm sm:text-base text-center"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          >
            <option value="all">All Blogs</option>
            <option value="published">Published Only</option>
            <option value="recent">Recent (Last 7 days)</option>
          </select>
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No blogs found</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              {searchTerm ? "Try adjusting your search terms" : "Be the first to create a blog!"}
            </p>
            {session && (
              <Link
                href="/app"
                className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-sm sm:text-base"
              >
                Create Your First Blog
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredBlogs.map((blog) => {
              const avatar = generateAvatar(blog.author.name);
              const preview = blog.content.slice(0, 150) + (blog.content.length > 150 ? "..." : "");
              
              return (
                <article key={blog._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
                  <div className="p-6 sm:p-8">
                    {/* Blog Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${avatar.color} flex items-center justify-center text-white font-semibold text-sm sm:text-base`}>
                          {avatar.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm sm:text-base">{blog.author.name}</p>
                          <p className="text-xs sm:text-sm text-gray-500">{formatDate(blog.createdAt)}</p>
                        </div>
                      </div>
                      {blog.published && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                          Published
                        </span>
                      )}
                    </div>

                    {/* Blog Content */}
                    <div className="mb-4 sm:mb-6">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2">
                        {blog.title}
                      </h2>
                      <p className="text-gray-600 text-sm sm:text-base line-clamp-3 leading-relaxed">
                        {preview}
                      </p>
                    </div>

                    {/* Blog Stats */}
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <span>👁️</span>
                          <span>{blog.views}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span>❤️</span>
                          <span>{blog.likes}</span>
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <Link
                        href={`/blog/${blog._id}`}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-center text-sm sm:text-base"
                      >
                        Read More
                      </Link>
                      {blog.shareUrl && (
                        <button
                          onClick={() => copyShareUrl(blog.shareUrl!)}
                          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition text-sm sm:text-base"
                        >
                          Share
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 