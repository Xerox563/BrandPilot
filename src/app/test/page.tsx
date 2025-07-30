"use client";
import { useState, useEffect } from "react";

export default function TestPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [createdBlogId, setCreatedBlogId] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      // Try to fetch all blogs (this will fail due to auth, but let's see the error)
      const response = await fetch('/api/blogs');
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        const errorData = await response.json();
        console.log('Error data:', errorData);
        setError(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const createTestBlog = async () => {
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Test Blog for Editor',
          content: 'This is a test blog content.\n\nThis is the second paragraph with some sample text to test the editor functionality.\n\nThis is the third paragraph to ensure the content loads properly in the editor.',
          idea: 'Testing the blog editor'
        }),
      });
      
      console.log('Create blog response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Created blog:', data);
        setCreatedBlogId(data._id);
        alert(`Blog created successfully! ID: ${data._id}\nTitle: ${data.title}\nContent: ${data.content.substring(0, 100)}...`);
      } else {
        const errorData = await response.json();
        console.log('Create blog error:', errorData);
        alert(`Error creating blog: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Failed to create blog');
    }
  };

  const testIndividualBlog = async (blogId: string) => {
    try {
      const response = await fetch(`/api/blogs/${blogId}`);
      console.log('Individual blog response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Blog data:', data);
        alert(`Blog found: ${data.title}\nContent: ${data.content.substring(0, 100)}...`);
      } else {
        const errorData = await response.json();
        console.log('Individual blog error:', errorData);
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error fetching individual blog:', error);
      alert('Failed to fetch individual blog');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Create Test Blog</h2>
        <button 
          onClick={createTestBlog}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Create Test Blog
        </button>
        {createdBlogId && (
          <div className="mt-2 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
            Created Blog ID: {createdBlogId}
            <button 
              onClick={() => window.open(`/blog/${createdBlogId}`, '_blank')}
              className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
            >
              Open Blog
            </button>
          </div>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Test Individual Blog</h2>
        <input 
          type="text" 
          placeholder="Enter blog ID" 
          id="blogId"
          className="border p-2 mr-2"
        />
        <button 
          onClick={() => {
            const blogId = (document.getElementById('blogId') as HTMLInputElement).value;
            if (blogId) testIndividualBlog(blogId);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Test Blog
        </button>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">All Blogs (if accessible)</h2>
        {blogs.length > 0 ? (
          <ul>
            {blogs.map((blog) => (
              <li key={blog._id} className="mb-2">
                <strong>{blog.title}</strong> - {blog.content.substring(0, 50)}...
                <button 
                  onClick={() => testIndividualBlog(blog._id)}
                  className="ml-2 bg-green-500 text-white px-2 py-1 rounded text-sm"
                >
                  Test
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No blogs found or access denied</p>
        )}
      </div>
    </div>
  );
} 