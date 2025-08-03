# BrandPilot

BrandPilot is a full-featured blog creation platform powered by Google Gemini AI. Create, publish, and share engaging blog content with user authentication, MongoDB storage, and multilingual support.

## Problem We’re Solving

Writing and sharing blogs takes too much time and effort.

People often have to use different tools for writing, formatting, SEO checks, and then manually posting on social media. It becomes messy, slow, and confusing — especially for beginners or non-technical users.

Some common problems:
- No simple way to turn blogs into LinkedIn posts or Twitter threads  
- No one-click sharing to Instagram, LinkedIn, or other platforms  
- Hard to know how many people read your blog  
- No built-in voice-to-text support  
- No AI to improve writing or help with SEO  
- No support for writing in multiple languages  
- Customizing the blog design is not easy

Because of all this, many people give up before they even publish.

---

## Our Solution — BrandPilot

**BrandPilot** is an AI-powered blog creation tool that makes blogging easy, fast, and fun — all in one place.

What you can do with BrandPilot:
- Speak your ideas and turn them into blogs using voice input  
- Use AI to help you write or improve content with your choice of tone  
- Turn your blog into LinkedIn posts, Twitter threads, or Instagram captions  
- Share your blog to social media in one click  
- See how many people read your blog with viewer analytics  
- Write in multiple languages with AI help  
- Customize your blog’s design (fonts, colors, layout)  
- Get smart SEO suggestions from AI

With BrandPilot, anyone can write and share great content — without switching tools or needing technical skills.


## Features

- **Voice Input:** Speak your blog ideas using the Web Speech API for hands-free content creation. (OnGoing: trying to do using web api or thinking to implement using hugging face model)
- **AI Blog Generator:** Generate detailed, engaging blog posts from your ideas with customizable word counts and tone selection.
- **Tone Control:** Choose from Professional, Friendly, or Witty tones for your content.
- **Blog-to-Post Formatter:** Convert your blogs into LinkedIn posts, Twitter threads, and Medium-ready drafts.
- **Content Repurposer:** Transform your content into catchy, viral, or professional styles with emojis and social media formats.
- **Smart Summaries:** Get concise summaries of your generated content automatically.
- **Social Media Ready:** Create tweet threads,Linkedin Post, Instagram captions from your content.
- **Blog Publishing:** Publish blogs online with shareable links and social media integration.
- **Blog Management:** View, search, and manage all your published and draft blogs.
- **Thinking Loaders:** Visual feedback while AI processes your requests.

## 🔧 Planned Add-ons for BrandPilot

- **Viewer Count**  
  Track how many people have read the blog with live view count and simple analytics.
- **LinkedIn Auto-Post Flow**  
  Directly share your blog on LinkedIn as a proper post with title, summary, and image.
- **Theme Customizer**  
  Users can change the blog look — like font, colors, and layout — as per their style.
- **Advanced Editor Menu**  
  Add tables, code blocks, AI-based rephrasing, and better text formatting tools in editor.
- **Instagram Automation + Image Upload**  
  Upload images and auto-post your blog on Instagram or LinkedIn with captions.
- **AI SEO Optimizer**  
  AI will suggest titles, keywords, and meta descriptions to make your blog Google-friendly.
- **Tweet Thread Generator**  
  Turn your blog into a thread with emojis, hooks, and line breaks ready to post on Twitter.
- **Hugging Face Integration**  
  Use Hugging Face models for AI text generation, summarization, translations, or image generation (planned).

## Tech Stack

- Next.js 14+ (App Router)
- Tailwind CSS
- Google Gemini AI API
- huggingface LLM models
- MongoDB (Database)
- NextAuth.js (Authentication)
- TypeScript

## Getting Started

1. **Clone the repo:**

   ```bash
   git clone https://github.com/Xerox563/BrandPilot.git
   cd brandpilot
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up MongoDB:**

   - Install MongoDB locally or use MongoDB Atlas
   - Create a database named `brandpilot`

4. **Set up environment variables:**
   Create a `.env.local` file and add:

   ```
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/brandpilot

   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here

   # Google Gemini AI
   GEMINI_API_KEY=your-gemini-api-key-here
   ```

   - Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Generate a random secret for NEXTAUTH_SECRET (use `openssl rand -base64 32`)

5. **Run locally:**

   ```bash
   npm run dev
   ```

6. **Create your first account:**
   - Click "Get Started" on the homepage
   - Sign up with your email and password
   - Start creating blogs!

## Environment Variables

- `MONGODB_URI` — MongoDB connection string
- `NEXTAUTH_URL` — Your application URL (http://localhost:3000 for development)
- `NEXTAUTH_SECRET` — Random secret for NextAuth.js (generate with `openssl rand -base64 32`)
- `GEMINI_API_KEY` — Your Google Gemini AI API key (get one at https://aistudio.google.com/app/apikey)

## Folder Structure

- `/app` — App Router pages and API routes
- `/components` — Reusable UI components
- `/app/ui` — Feature-specific UI
- `/app/api` — API endpoints for Gemini AI

## API Endpoints

- `/app/api/generate-blog` — Generate blog content with summaries and tone control
- `/app/api/repurpose` — Repurpose content for different styles and platforms
- `/app/api/rephrase` — Rephrase text for fluency with tone selection
- `/app/api/format-blog` — Convert blogs to LinkedIn, Twitter, and Medium formats
- `/app/api/translate` — Real-time translation using Gemini AI
- `/app/api/blogs` — Create and fetch user blogs
- `/app/api/blogs/[id]` — Get individual blog by ID or slug
- `/app/api/blogs/[id]/publish` — Publish a blog
- `/app/api/auth/register` — User registration
- `/app/api/auth/[...nextauth]` — NextAuth.js authentication

## Credits

- Powered by [Google Gemini AI](https://ai.google.dev/) and HuggingFace LLM Models
- Built with [Next.js](https://nextjs.org/),Hyper ui Components and [Tailwind CSS](https://tailwindcss.com/)

## GitHub

[https://github.com/YOUR_GITHUB/brandpilot](https://github.com/Xerox563/BrandPilot.git)
