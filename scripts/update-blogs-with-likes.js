const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/brandpilot';

async function updateBlogsWithLikes() {
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
      likes: { type: Number, default: 0 },
      likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    }));

    // Find all blogs that don't have likes field
    const blogs = await Blog.find({ likes: { $exists: false } });
    console.log(`Found ${blogs.length} blogs to update with likes field`);

    // Update each blog
    for (const blog of blogs) {
      blog.likes = 0;
      blog.likedBy = [];
      await blog.save();
      console.log(`Updated blog "${blog.title}" with likes field`);
    }

    console.log('Blog likes update completed!');
  } catch (error) {
    console.error('Error updating blogs with likes:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

updateBlogsWithLikes(); 