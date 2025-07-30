import mongoose from 'mongoose';

export interface IBlog extends mongoose.Document {
  title: string;
  content: string;
  idea: string;
  author: mongoose.Types.ObjectId;
  published: boolean;
  shareUrl?: string;
  slug?: string;
  views: number;
  likes: number;
  likedBy: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new mongoose.Schema<IBlog>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  idea: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  shareUrl: {
    type: String,
    default: '',
  },
  slug: {
    type: String,
    unique: true,
    sparse: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

// Generate slug before saving
blogSchema.pre('save', function(next) {
  if (this.isModified('title') && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Generate share URL when published
blogSchema.pre('save', function(next) {
  if (this.isModified('published') && this.published) {
    // Use the actual blog ID for the share URL since that's what works
    // Check if we're running on a different port
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3002';
    this.shareUrl = `${baseUrl}/blog/${this._id}`;
  }
  next();
});

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', blogSchema); 