import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IPost extends Document {
  title: string;
  slug: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
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
      unique: true,
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
        validator: function (tags: string[]) {
          return tags.length <= 10;
        },
        message: 'Cannot have more than 10 tags',
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes
PostSchema.index({ slug: 1 });
PostSchema.index({ tags: 1 });
PostSchema.index({ createdAt: -1 });

// Pre-save middleware with proper type
PostSchema.pre<IPost>('save', function (next) {
  if (this.isModified('slug')) {
    this.slug = this.slug
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')         // Replace spaces with hyphens
      .replace(/-+/g, '-')          // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, '');     // Trim leading/trailing hyphens
  }
  next();
});

// Static method
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

export default (mongoose.models.Post as IPostModel) || mongoose.model<IPost, IPostModel>('Post', PostSchema);