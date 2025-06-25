# TechInsights - IT Blog & Technology News Platform

A modern, full-stack blog platform built with Next.js 13, featuring a powerful admin dashboard, rich text editing, image management, and MongoDB integration.

![TechInsights Banner](https://via.placeholder.com/1200x400/2563eb/ffffff?text=TechInsights+-+IT+Blog+Platform)

## 🚀 Features

### 🎨 **Frontend Features**
- **Modern Design**: Beautiful, responsive UI with Tailwind CSS and shadcn/ui components
- **Blog System**: Dynamic blog posts with tags, search, and pagination
- **SEO Optimized**: Meta tags, structured data, and optimized URLs
- **Responsive Design**: Mobile-first approach with perfect desktop experience
- **Performance**: Optimized images, lazy loading, and fast page transitions

### 🔐 **Authentication & Security**
- **NextAuth.js Integration**: Secure authentication system
- **Protected Routes**: Admin dashboard with role-based access
- **Session Management**: Persistent login sessions
- **CSRF Protection**: Built-in security measures

### 📝 **Content Management**
- **Rich Text Editor**: TipTap-powered editor with formatting options
- **Image Upload**: Cloudinary integration with drag & drop
- **Tag System**: Categorize posts with multiple tags
- **SEO-Friendly URLs**: Automatic slug generation
- **Draft System**: Save and edit posts before publishing

### 🖼️ **Image Management**
- **Cloudinary Integration**: Professional image hosting and optimization
- **Automatic Optimization**: Format conversion and quality optimization
- **Responsive Images**: Multiple sizes for different devices
- **Upload Progress**: Real-time upload progress tracking
- **Image Validation**: File type and size validation

### 📊 **Admin Dashboard**
- **Post Management**: Create, edit, delete, and manage all posts
- **Analytics Overview**: Post statistics and performance metrics
- **Search & Filter**: Advanced filtering by tags and content
- **Bulk Operations**: Manage multiple posts efficiently
- **User-Friendly Interface**: Intuitive admin experience

## 🏗️ Project Structure

```
techinsights/
├── 📁 app/                          # Next.js 13 App Router
│   ├── 📁 admin/                    # Admin dashboard pages
│   │   ├── 📁 dashboard/            # Main admin dashboard
│   │   ├── 📁 login/                # Admin login page
│   │   └── 📁 posts/                # Post management
│   │       ├── 📁 edit/[id]/        # Edit post page
│   │       ├── 📁 new/              # Create new post
│   │       └── page.tsx             # Posts list page
│   ├── 📁 api/                      # API routes
│   │   ├── 📁 auth/[...nextauth]/   # NextAuth.js configuration
│   │   ├── 📁 posts/                # Posts API endpoints
│   │   │   ├── 📁 [id]/             # Individual post operations
│   │   │   ├── 📁 slug/[slug]/      # Get post by slug
│   │   │   └── route.ts             # Posts CRUD operations
│   │   └── 📁 upload/               # Image upload API
│   ├── 📁 blog/                     # Public blog pages
│   │   ├── 📁 [slug]/               # Individual blog post
│   │   └── page.tsx                 # Blog listing page
│   ├── globals.css                  # Global styles
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Homepage
│   └── providers.tsx                # Context providers
├── 📁 components/                   # Reusable components
│   ├── 📁 ui/                       # shadcn/ui components
│   ├── image-upload.tsx             # Image upload component
│   └── rich-text-editor.tsx        # Rich text editor
├── 📁 lib/                          # Utility libraries
│   ├── auth.ts                      # Authentication configuration
│   ├── cloudinary.ts               # Cloudinary setup
│   ├── db.ts                        # MongoDB connection
│   ├── utils.ts                     # General utilities
│   ├── api-utils.ts                 # API helper functions
│   ├── content-utils.ts             # Content processing utilities
│   └── date-utils.ts                # Date formatting utilities
├── 📁 models/                       # Database models
│   └── Post.ts                      # Post model schema
├── 📁 types/                        # TypeScript type definitions
│   ├── mongoose.d.ts                # Mongoose types
│   └── next-auth.d.ts               # NextAuth types
├── 📁 hooks/                        # Custom React hooks
├── middleware.ts                    # Next.js middleware
├── next.config.js                   # Next.js configuration
├── tailwind.config.ts               # Tailwind CSS configuration
└── package.json                     # Dependencies and scripts
```

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Rich Text Editor**: TipTap
- **Forms**: React Hook Form + Zod validation

### **Backend**
- **Runtime**: Node.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js
- **Image Storage**: Cloudinary
- **API**: Next.js API Routes

### **Development Tools**
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **CSS Framework**: Tailwind CSS
- **Build Tool**: Next.js built-in

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB database (local or cloud)
- Cloudinary account for image uploads

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/techinsights.git
cd techinsights
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/techinsights
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/techinsights

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-in-production

# Admin Credentials
ADMIN_EMAIL=admin@techinsights.com
ADMIN_PASSWORD=admin123

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 4. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📋 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | ✅ | - |
| `NEXTAUTH_URL` | Application URL | ✅ | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | NextAuth.js secret key | ✅ | - |
| `ADMIN_EMAIL` | Admin login email | ✅ | `admin@techinsights.com` |
| `ADMIN_PASSWORD` | Admin login password | ✅ | `admin123` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | ✅ | - |
| `CLOUDINARY_API_KEY` | Cloudinary API key | ✅ | - |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | ✅ | - |

## 🔧 Configuration

### MongoDB Setup
1. **Local MongoDB**: Install MongoDB locally or use Docker
2. **MongoDB Atlas**: Create a free cluster at [mongodb.com](https://www.mongodb.com/cloud/atlas)
3. **Connection**: Update `MONGODB_URI` in `.env.local`

### Cloudinary Setup
1. **Create Account**: Sign up at [cloudinary.com](https://cloudinary.com)
2. **Get Credentials**: Find your cloud name, API key, and secret in the dashboard
3. **Configure**: Add credentials to `.env.local`

### Authentication Setup
1. **Admin Credentials**: Set `ADMIN_EMAIL` and `ADMIN_PASSWORD`
2. **NextAuth Secret**: Generate a secure secret for `NEXTAUTH_SECRET`
3. **Production**: Use environment variables in production

## 📚 API Documentation

### Posts API

#### Get All Posts
```http
GET /api/posts?page=1&limit=10&search=query&tag=javascript
```

#### Get Post by ID
```http
GET /api/posts/[id]
```

#### Get Post by Slug
```http
GET /api/posts/slug/[slug]
```

#### Create Post
```http
POST /api/posts
Content-Type: application/json

{
  "title": "Post Title",
  "slug": "post-slug",
  "content": "<p>Post content</p>",
  "tags": ["javascript", "react"]
}
```

#### Update Post
```http
PUT /api/posts/[id]
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "<p>Updated content</p>"
}
```

#### Delete Post
```http
DELETE /api/posts/[id]
```

### Upload API

#### Generate Upload Parameters
```http
POST /api/upload
Content-Type: application/json

{
  "folder": "blog-images"
}
```

## 🎨 Customization

### Styling
- **Colors**: Modify `tailwind.config.ts` for custom color schemes
- **Components**: Update shadcn/ui components in `components/ui/`
- **Global Styles**: Edit `app/globals.css`

### Content
- **Homepage**: Edit `app/page.tsx`
- **Blog Layout**: Modify `app/blog/page.tsx`
- **Admin Dashboard**: Customize `app/admin/dashboard/page.tsx`

### Features
- **Rich Text Editor**: Extend `components/rich-text-editor.tsx`
- **Image Upload**: Modify `components/image-upload.tsx`
- **Post Model**: Update `models/Post.ts`

## 🚀 Deployment

### Vercel (Recommended)
1. **Connect Repository**: Import your GitHub repository to Vercel
2. **Environment Variables**: Add all environment variables in Vercel dashboard
3. **Deploy**: Automatic deployment on every push

### Other Platforms
- **Netlify**: Configure build settings and environment variables
- **Railway**: Connect repository and set environment variables
- **DigitalOcean App Platform**: Deploy with app spec configuration

### Production Checklist
- [ ] Set secure `NEXTAUTH_SECRET`
- [ ] Configure production MongoDB URI
- [ ] Set up Cloudinary production environment
- [ ] Update `NEXTAUTH_URL` to production domain
- [ ] Enable HTTPS
- [ ] Configure domain and DNS

## 🧪 Testing

### Run Tests
```bash
npm run test
```

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npm run type-check
```

## 📈 Performance

### Optimization Features
- **Image Optimization**: Automatic WebP conversion and responsive images
- **Code Splitting**: Automatic code splitting with Next.js
- **Static Generation**: ISR for blog posts
- **Caching**: API response caching and CDN integration

### Monitoring
- **Core Web Vitals**: Built-in performance monitoring
- **Error Tracking**: Console error logging
- **Analytics**: Ready for Google Analytics integration

## 🤝 Contributing

1. **Fork the Repository**
2. **Create Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Commit Changes**: `git commit -m 'Add amazing feature'`
4. **Push to Branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commit messages
- Add tests for new features
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues

#### Database Connection
```bash
# Check MongoDB connection
mongosh "your-mongodb-uri"
```

#### Image Upload Issues
- Verify Cloudinary credentials
- Check file size limits (10MB max)
- Ensure proper CORS configuration

#### Authentication Problems
- Verify `NEXTAUTH_SECRET` is set
- Check admin credentials
- Clear browser cookies

### Getting Help
- **Documentation**: Check this README and inline code comments
- **Issues**: Open a GitHub issue for bugs
- **Discussions**: Use GitHub Discussions for questions

## 🔮 Roadmap

### Upcoming Features
- [ ] **Comments System**: User comments on blog posts
- [ ] **Newsletter**: Email subscription and newsletters
- [ ] **Social Sharing**: Enhanced social media integration
- [ ] **Analytics Dashboard**: Detailed post analytics
- [ ] **Multi-Author**: Support for multiple authors
- [ ] **Categories**: Hierarchical category system
- [ ] **SEO Tools**: Advanced SEO optimization tools
- [ ] **Performance Dashboard**: Real-time performance metrics

### Long-term Goals
- [ ] **Mobile App**: React Native mobile application
- [ ] **API Documentation**: Interactive API documentation
- [ ] **Plugin System**: Extensible plugin architecture
- [ ] **Internationalization**: Multi-language support

---

**Built with ❤️ by the TechInsights Team**

For more information, visit our [website](https://techinsights.dev) or follow us on [Twitter](https://twitter.com/techinsights).