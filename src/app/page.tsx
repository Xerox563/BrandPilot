import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-24 px-4 text-center overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            BrandPilot
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your ideas into engaging blog content with AI. Create, publish, and share globally with multilingual support and social media integration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/app">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                Start Creating
              </button>
            </Link>
            <Link href="/blogs">
              <button className="bg-white text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:scale-105">
                View Blogs
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create, publish, and share amazing content
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="text-4xl mb-4">✍️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Blog Generation</h3>
              <p className="text-gray-600 leading-relaxed">
                Transform your ideas into detailed, engaging blog posts with customizable word counts and automatic summaries powered by Google Gemini AI.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Multilingual Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Reach global audiences with real-time translation in 6+ languages. Your content automatically adapts to different cultures and regions.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Social Media Ready</h3>
              <p className="text-gray-600 leading-relaxed">
                Convert your blogs into LinkedIn posts, Twitter threads, and Instagram captions with one click. Perfect for cross-platform marketing.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="text-4xl mb-4">🎤</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Voice Input</h3>
              <p className="text-gray-600 leading-relaxed">
                Speak your blog ideas using the Web Speech API. Hands-free content creation that captures your thoughts naturally.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="text-4xl mb-4">🔁</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Content Repurposing</h3>
              <p className="text-gray-600 leading-relaxed">
                Transform your content into catchy, viral, or professional styles. Add emojis and create multiple formats from one piece.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Global Publishing</h3>
              <p className="text-gray-600 leading-relaxed">
                Publish your blogs online with shareable links. Anyone can read your content globally with social media integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">
              Create amazing content in just 3 simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Share Your Idea</h3>
              <p className="text-gray-600">
                Type or speak your blog idea. Our AI understands your vision and creates engaging content.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Generates Content</h3>
              <p className="text-gray-600">
                Google Gemini AI creates professional, engaging blog posts with your chosen tone and word count.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Publish & Share</h3>
              <p className="text-gray-600">
                Publish your blog globally, translate to multiple languages, and share across social media platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Users Say</h2>
            <p className="text-xl text-gray-600">
              Join thousands of content creators who trust BrandPilot
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  S
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                  <p className="text-gray-600 text-sm">Content Creator</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "BrandPilot has revolutionized my content creation. The AI generates amazing blog posts, and the multilingual feature helps me reach global audiences."
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  M
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Mike Chen</h4>
                  <p className="text-gray-600 text-sm">Marketing Manager</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The social media formatting feature is a game-changer. I can create LinkedIn posts and Twitter threads from my blogs in seconds."
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  A
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Alex Rodriguez</h4>
                  <p className="text-gray-600 text-sm">Blogger</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Voice input is incredible! I can brainstorm blog ideas while walking and have them transcribed perfectly. The publishing feature is seamless."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Content?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using BrandPilot to create amazing content
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/app">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                Get Started Free
              </button>
            </Link>
            <Link href="/auth/signin">
              <button className="bg-transparent text-white px-8 py-4 rounded-xl text-lg font-semibold border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-200">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">BrandPilot</h3>
              <p className="text-gray-400">
                AI-powered content creation platform for modern creators.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>AI Blog Generation</li>
                <li>Multilingual Support</li>
                <li>Social Media Formatting</li>
                <li>Voice Input</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Blog</li>
                <li>Support</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Twitter</li>
                <li>LinkedIn</li>
                <li>GitHub</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 BrandPilot. Built with Next.js, Tailwind, and Google Gemini AI.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
