const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/brandpilot';

async function updateShareUrls() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get the Blog model
    const Blog = mongoose.model('Blog', new mongoose.Schema({
      title: String,
      content: String,
      idea: String,
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      published: { type: Boolean, default: false },
      shareUrl: String,
      slug: String,
      views: { type: Number, default: 0 },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    }));

    // Find all published blogs
    const blogs = await Blog.find({ published: true });
    console.log(`Found ${blogs.length} published blogs to update`);

    // Update each blog's share URL
    for (const blog of blogs) {
      const newShareUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3002'}/blog/${blog._id}`;
      
      if (blog.shareUrl !== newShareUrl) {
        blog.shareUrl = newShareUrl;
        await blog.save();
        console.log(`Updated blog "${blog.title}" with new share URL: ${newShareUrl}`);
      } else {
        console.log(`Blog "${blog.title}" already has correct share URL`);
      }
    }

    console.log('Share URL update completed!');
  } catch (error) {
    console.error('Error updating share URLs:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

updateShareUrls(); 