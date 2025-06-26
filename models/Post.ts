import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IPost extends Document {
  id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  addTag(tag: string): Promise<IPost>;
  removeTag(tag: string): Promise<IPost>;
}

interface IPostModel extends Model<IPost> {
  findByTag(tag: string): Promise<IPost[]>;
}

const PostSchema: Schema<IPost> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      trim: true,
      lowercase: true,
      match: [
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        'Slug must contain only lowercase letters, numbers, and hyphens',
      ],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (tags: string[] = []) {
          return Array.isArray(tags) && tags.length <= 10;
        },
        message: 'Cannot have more than 10 tags',
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        ret.createdAt = new Date(ret.createdAt).toISOString();
        ret.updatedAt = new Date(ret.updatedAt).toISOString();
        return ret;
      },
    },
  }
);

// Ensure tags is always an array before saving
PostSchema.pre<IPost>('save', function (next) {
  if (!Array.isArray(this.tags)) {
    this.tags = [];
  }
  if (this.isModified('slug')) {
    this.slug = this.slug
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

// Static method to find posts by tag
PostSchema.statics.findByTag = function (tag: string) {
  return this.find({ tags: { $in: [tag] } }).sort({ createdAt: -1 });
};

// Instance methods
PostSchema.methods.addTag = function (tag: string) {
  if (!this.tags.includes(tag)) {
    this.tags.push(tag);
  }
  return this.save();
};

PostSchema.methods.removeTag = function (tag: string) {
  this.tags = this.tags.filter((t: string) => t !== tag);
  return this.save();
};

// Indexes
PostSchema.index({ slug: 1 }, { unique: true });
PostSchema.index({ tags: 1 });
PostSchema.index({ createdAt: -1 });

export default (mongoose.models.Post as IPostModel) || mongoose.model<IPost, IPostModel>('Post', PostSchema);