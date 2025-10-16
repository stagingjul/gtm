"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function About() {
  const features = [
    { icon: "🚀", title: "Fast Performance", description: "Lightning-fast load times" },
    { icon: "🎨", title: "Beautiful Design", description: "Stunning visual experiences" },
    { icon: "⚡", title: "Modern Tech", description: "Built with latest technologies" },
    { icon: "🔒", title: "Secure", description: "Enterprise-level security" },
    { icon: "📱", title: "Responsive", description: "Works on all devices" },
    { icon: "💎", title: "Premium Quality", description: "Top-tier craftsmanship" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8 overflow-hidden">
      {/* Animated background particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full"
          initial={{
            x: Math.random() * 1920,
            y: Math.random() * 1080,
            opacity: Math.random(),
          }}
          animate={{
            y: [null, Math.random() * 1080],
            opacity: [null, Math.random(), 0],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className="mb-8 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full text-white border border-white/20 hover:bg-white/20 transition-all"
          >
            ← Back to Home
          </motion.button>
        </Link>

        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-7xl md:text-9xl font-extrabold text-white mb-8 text-center"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            About Us
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-2xl text-gray-200 text-center mb-16 max-w-3xl mx-auto leading-relaxed"
        >
          We create extraordinary digital experiences that push the boundaries of what&apos;s possible on the web.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ 
                scale: 1.05, 
                rotate: [0, -2, 2, 0],
                transition: { duration: 0.3 }
              }}
              className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/30 transition-all shadow-xl hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="text-6xl mb-4 inline-block"
                >
                  {feature.icon}
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 p-12 rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of satisfied customers today
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-12 py-4 bg-white text-purple-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/50 transition-all"
          >
            Get Started Now
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

