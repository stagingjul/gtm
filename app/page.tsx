"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const pages = [
    { name: "About", href: "/about", color: "from-purple-500 to-pink-500" },
    { name: "Services", href: "/services", color: "from-blue-500 to-cyan-500" },
    { name: "Contact", href: "/contact", color: "from-green-500 to-emerald-500" },
    { name: "Teams", href: "/teams", color: "from-orange-500 to-red-500", badge: "SSR" },
    { name: "Players", href: "/players", color: "from-indigo-500 to-purple-500", badge: "SSR" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
      
      {/* Animated background orbs */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          scale: [1, 1.4, 1],
          x: [0, 30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center"
      >
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-7xl md:text-9xl font-extrabold text-white mb-4 tracking-tight"
        >
          <motion.span
            className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            GTM
          </motion.span>
        </motion.h1>
        
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl text-gray-300 mb-12 font-light"
        >
          Explore our amazing pages
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {pages.map((page, index) => (
            <motion.div
              key={page.href}
              variants={item}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={page.href}
                className="group relative block p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-purple-500/50"
              >
                {page.badge && (
                  <motion.span
                    initial={{ x: 100 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="absolute top-4 right-4 px-3 py-1 text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full"
                  >
                    {page.badge}
                  </motion.span>
                )}
                
                <div className={`absolute inset-0 bg-gradient-to-r ${page.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                
                <motion.div
                  className="relative z-10"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {page.name}
                  </h2>
                  <div className="flex items-center text-gray-300 group-hover:text-white transition-colors">
                    <span className="text-sm">Explore</span>
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-gray-400 text-sm"
          >
            ↓ Scroll to explore
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
