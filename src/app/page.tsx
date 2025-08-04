import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-r from-blue-600 to-purple-600">
      {/* Hero Section */}
      <section className="relative py-24 px-4 text-center overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 text-white">
            BrandPilot
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your ideas into engaging blog content with AI. Create, publish, and share globally with multilingual support and social media integration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/app">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                Start Creating
              </button>
            </Link>
            <Link href="/blogs">
              <button className="bg-transparent text-white px-8 py-4 rounded-xl text-lg font-semibold border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-200 hover:scale-105">
                View Blogs
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Everything you need to create, publish, and share amazing content
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-white/20">
              <div className="text-4xl mb-4">✍️</div>
              <h3 className="text-xl font-bold text-white mb-3">AI Blog Generation</h3>
              <p className="text-blue-100 leading-relaxed">
                Transform your ideas into detailed, engaging blog posts with customizable word counts and automatic summaries powered by Google Gemini AI.
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-white/20">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-white mb-3">Multilingual Support</h3>
              <p className="text-blue-100 leading-relaxed">
                Reach global audiences with real-time translation in 6+ languages. Your content automatically adapts to different cultures and regions.
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-white/20">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-white mb-3">Social Media Ready</h3>
              <p className="text-blue-100 leading-relaxed">
                Convert your blogs into LinkedIn posts, Twitter threads, and Instagram captions with one click. Perfect for cross-platform marketing.
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-white/20">
              <div className="text-4xl mb-4">🎤</div>
              <h3 className="text-xl font-bold text-white mb-3">Voice Input</h3>
              <p className="text-blue-100 leading-relaxed">
                Speak your blog ideas using the Web Speech API. Hands-free content creation that captures your thoughts naturally.
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-white/20">
              <div className="text-4xl mb-4">🔁</div>
              <h3 className="text-xl font-bold text-white mb-3">Content Repurposing</h3>
              <p className="text-blue-100 leading-relaxed">
                Transform your content into catchy, viral, or professional styles. Add emojis and create multiple formats from one piece.
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-white/20">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-white mb-3">Global Publishing</h3>
              <p className="text-blue-100 leading-relaxed">
                Publish your blogs online with shareable links. Anyone can read your content globally with social media integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-blue-100">
              Create amazing content in just 3 simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         <div className="text-center">
               <div className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                 1
               </div>
               <h3 className="text-xl font-bold text-white mb-3">Share Your Idea</h3>
               <p className="text-blue-100">
                Type or speak your blog idea. Our AI understands your vision and creates engaging content.
              </p>
            </div>
            
                         <div className="text-center">
               <div className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                 2
               </div>
               <h3 className="text-xl font-bold text-white mb-3">AI Generates Content</h3>
               <p className="text-blue-100">
                Google Gemini AI creates professional, engaging blog posts with your chosen tone and word count.
              </p>
            </div>
            
                         <div className="text-center">
               <div className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                 3
               </div>
               <h3 className="text-xl font-bold text-white mb-3">Publish & Share</h3>
               <p className="text-blue-100">
                Publish your blog globally, translate to multiple languages, and share across social media platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white/10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Users Say</h2>
            <p className="text-xl text-blue-100">
              Join thousands of content creators who trust BrandPilot
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold mr-4">
                  S
                </div>
                <div>
                  <h4 className="font-semibold text-white">Washeem</h4>
                  <p className="text-blue-100 text-sm">Content Creator</p>
                </div>
              </div>
              <p className="text-blue-100 italic">
                "BrandPilot has revolutionized my content creation. The AI generates amazing blog posts, and the multilingual feature is something extra."
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold mr-4">
                  M
                </div>
                <div>
                  <h4 className="font-semibold text-white">Abhishek Dixit</h4>
                  <p className="text-blue-100 text-sm">Technology Analyst</p>
                </div>
              </div>
              <p className="text-blue-100 italic">
                "The social media formatting feature is a game-changer. I can create LinkedIn posts and Twitter threads from my blogs in seconds."
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold mr-4">
                  A
                </div>
                <div>
                  <h4 className="font-semibold text-white">Naman</h4>
                  <p className="text-blue-100 text-sm">Analyst</p>
                </div>
              </div>
              <p className="text-blue-100 italic">
                "Voice input is incredible! I can brainstorm blog ideas while walking and have them transcribed perfectly. The publishing feature is seamless."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Content?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using BrandPilot to create amazing content
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/app">
              <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                Get Started Free
              </button>
            </Link>
            <Link href="/auth/signin">
              <button className="bg-transparent text-white px-8 py-4 rounded-xl text-lg font-semibold border-2 border-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:border-transparent transition-all duration-200">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm sm:text-base mb-4">
              © 2025 BrandPilot. Made by Amit.
            </p>
            <div className="flex justify-center space-x-6">
              <a 
                href="https://portfolio-amit7.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Portfolio
              </a>
              <a 
                href="https://www.linkedin.com/in/amit-gangwar-a63174250/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/Xerox563" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
