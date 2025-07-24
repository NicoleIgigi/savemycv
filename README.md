# 🌟 Personal Portfolio & CMS

A modern, full-stack portfolio website with a complete Content Management System (CMS) built with Next.js, React, Supabase, and Tailwind CSS.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14.0.0-blueviolet)
![React](https://img.shields.io/badge/React-18+-blue)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green)

## ✨ Features

### 🎨 **Frontend Portfolio**
- **Modern Design** - Clean, responsive UI with smooth animations
- **Dynamic Content** - All content managed through CMS with fallback data
- **Interactive Elements** - Project filters, skill progress bars, testimonial carousel
- **SEO Optimized** - Meta tags, structured data, and performance optimization
- **Mobile Responsive** - Fully responsive design for all devices

### 🛠️ **Complete CMS Dashboard**
- **Blog Management** - Create, edit, delete blog posts with rich content
- **Project Showcase** - Manage project portfolio with images and tech stacks
- **Work Experience** - Comprehensive experience management with achievements
- **Education & Certificates** - Track education and professional certifications
- **Languages & Skills** - Proficiency tracking with visual indicators
- **Testimonials** - Client and colleague testimonials with ratings
- **Contact Information** - Manage contact details and social links
- **GitHub Integration** - Showcase GitHub stats and featured repositories
- **Bio & About** - Dynamic about sections and personal information

### 🔧 **Technical Features**
- **Image Upload** - Drag & drop image uploads to Supabase Storage
- **Authentication** - Secure admin authentication with Supabase Auth
- **Database Management** - PostgreSQL with Row Level Security (RLS)
- **Real-time Updates** - Instant content updates across the platform
- **Type Safety** - TypeScript implementation for better development experience

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14.0.0 (App Router)
- **UI Library**: React 18+
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Type Safety**: TypeScript

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Security**: Row Level Security (RLS) policies

### DevOps & Deployment
- **Version Control**: Git
- **Deployment**: Vercel (recommended)
- **Environment**: Node.js

## 📁 Project Structure

```
Portfolio/
├── app/                          # Next.js App Router
│   ├── admin/                   # CMS Admin Dashboard
│   │   ├── dashboard/          
│   │   │   ├── blog/           # Blog management
│   │   │   ├── projects/       # Project management
│   │   │   ├── experience/     # Work experience
│   │   │   ├── education/      # Education management
│   │   │   ├── certificates/   # Certificate management
│   │   │   ├── languages/      # Language proficiency
│   │   │   ├── testimonials/   # Testimonial management
│   │   │   ├── bio/            # Bio & about sections
│   │   │   ├── contact/        # Contact information
│   │   │   └── github/         # GitHub stats
│   │   └── login/              # Authentication
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/                  # React components
│   ├── About.tsx               # About section
│   ├── Blog.tsx                # Blog section
│   ├── Experience.tsx          # Experience section
│   ├── Projects.tsx            # Projects section
│   ├── Education.tsx           # Education section
│   ├── ImageUpload.js          # Image upload component
│   └── ...                     # Other components
├── database/                    # Database scripts
│   ├── schema.sql              # Database schema
│   ├── setup-storage.sql       # Storage setup
│   ├── fix-policies.sql        # Security policies
│   └── fix-education-schema.sql # Schema updates
├── lib/                        # Utilities
│   └── supabase.js             # Supabase configuration
└── public/                     # Static assets
    └── images/                 # Portfolio images
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ installed
- Supabase account
- Git installed

### 1. Clone the Repository
```bash
git clone https://github.com/NicoleIgigi/My-Portfolio.git
cd My-Portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup
Run the following SQL scripts in your Supabase SQL Editor:

1. **Main Schema**: `database/schema.sql`
2. **Storage Setup**: `database/setup-storage.sql`
3. **Fix Policies**: `database/fix-policies.sql` (update with your admin email)
4. **Schema Updates**: `database/fix-education-schema.sql`

### 5. Create Admin Account
1. Go to Supabase Authentication
2. Create a new user with your admin email
3. Update the policies in `database/fix-policies.sql` with your email

### 6. Start Development Server
```bash
npm run dev
```

Visit:
- **Portfolio**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin/dashboard

## 📊 CMS Dashboard Features

### 🎯 Content Management
- **Blog Posts**: Create and manage blog articles with featured images
- **Projects**: Showcase portfolio projects with tech stacks and live demos
- **Work Experience**: Detailed work history with achievements and technologies
- **Education**: Academic background and learning journey
- **Certificates**: Professional certifications with verification links
- **Languages**: Language proficiency with visual indicators
- **Testimonials**: Client feedback with ratings and photos
- **Bio Sections**: Dynamic about sections and personal information
- **Contact Info**: Manage contact details and social media links
- **GitHub Stats**: Showcase coding statistics and featured repositories

### 🖼️ Image Management
- **Drag & Drop Upload**: Easy image uploading with preview
- **Supabase Storage**: Secure cloud storage for all images
- **Organized Folders**: Images organized by content type
- **Automatic Optimization**: Optimized image delivery

### 🔒 Security Features
- **Row Level Security**: Database-level security policies
- **Admin Authentication**: Secure login system
- **Protected Routes**: Admin-only access to CMS features
- **Environment Variables**: Secure API key management

## 🌟 Key Highlights

- **11 Comprehensive CMS Sections** - Complete portfolio management
- **Dynamic Content Loading** - CMS content with fallback data
- **Professional Design** - Modern, clean UI/UX
- **Mobile Responsive** - Works perfectly on all devices
- **Image Upload System** - Professional media management
- **Real-time Updates** - Instant content synchronization
- **Type-Safe Development** - TypeScript implementation
- **Production Ready** - Optimized for deployment

## 🚢 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically with each push

### Manual Deployment
```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

**Nicole Igiraneza Ishimwe**
- Email: nii@alumni.cmu.edu
- LinkedIn: [nicole-igiraneza-ishimwe](https://linkedin.com/in/nicole-igiraneza-ishimwe)
- GitHub: [@NicoleIgigi](https://github.com/NicoleIgigi)

---

⭐ **Star this repository if it helped you build your portfolio!** 