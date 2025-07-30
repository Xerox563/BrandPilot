"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  const { data: session, status } = useSession();
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (status === "authenticated") {
      fetchBlogs();
    }
  }, [status, router]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
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
    if (!name) {
      return { initials: 'U', color: 'bg-gray-500' };
    }
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-yellow-500'];
    const color = colors[name.length % colors.length];
    return { initials, color };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const copyShareUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      // You could add a toast notification here
      alert('Share link copied to clipboard!');
    } catch (error) {
      console.error('Error copying URL:', error);
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.author?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === "all" || 
                         (filter === "published" && blog.published) ||
                         (filter === "draft" && !blog.published);
    
    return matchesSearch && matchesFilter;
  });

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Blogs</h1>
            <p className="text-gray-600 mt-1">Manage and view all your created blogs</p>
          </div>
          <Link
            href="/app"
            className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Create New Blog
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search blogs by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Blogs</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>

        {/* Blogs Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No blogs found</h2>
            <p className="text-gray-600 mb-6">
              {searchTerm || filter !== "all"
                ? "Try adjusting your search terms or filters."
                : "Create your first blog to get started!"
              }
            </p>
            {!searchTerm && (
              <Link 
                href="/app"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Create Your First Blog
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => {
              const avatar = generateAvatar(blog.author?.name);
              const excerpt = blog.content.substring(0, 150) + (blog.content.length > 150 ? "..." : "");
              
              return (
                <div key={blog._id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  {/* Blog Header */}
                  <div className="p-6 border-b">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full ${avatar.color} flex items-center justify-center text-white font-semibold`}>
                          {avatar.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{blog.author?.name || 'Unknown Author'}</p>
                          <p className="text-sm text-gray-500">{formatDate(blog.createdAt)}</p>
                        </div>
                      </div>
                      {blog.published && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Published
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {blog.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {excerpt}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <span>👁️</span>
                        <span>{blog.views}</span>
                        <span>{blog.views === 1 ? 'view' : 'views'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>❤️</span>
                        <span>{blog.likes || 0}</span>
                        <span>{blog.likes === 1 ? 'like' : 'likes'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Blog Actions */}
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/blog/${blog._id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                      >
                        {blog.published ? 'View Blog' : 'Edit Blog'}
                      </Link>
                      
                      {blog.published && blog.shareUrl && (
                        <button
                          onClick={() => copyShareUrl(blog.shareUrl!)}
                          className="text-gray-500 hover:text-gray-700 transition"
                          title="Copy share link"
                        >
                          📋
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 