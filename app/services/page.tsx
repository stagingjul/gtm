"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Services() {
  const services = [
    {
      title: "Web Development",
      description: "Custom websites built with cutting-edge technology",
      price: "$999",
      features: ["Responsive Design", "SEO Optimized", "Fast Performance", "Modern UI/UX"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications",
      price: "$1,999",
      features: ["iOS & Android", "Cloud Integration", "Push Notifications", "Analytics"],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment",
      price: "$1,499",
      features: ["Auto Scaling", "High Availability", "Security", "Monitoring"],
      color: "from-orange-500 to-red-500",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        <Link href="/" data-gtm-nav="back_to_home_from_services" id="gtm-services-back-home">
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className="mb-8 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full text-white border border-white/20 hover:bg-white/20 transition-all"
          >
            ← Back to Home
          </motion.button>
        </Link>

        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-7xl md:text-9xl font-extrabold text-white mb-6"
            animate={{
              textShadow: [
                "0 0 20px rgba(59, 130, 246, 0.5)",
                "0 0 40px rgba(147, 51, 234, 0.5)",
                "0 0 20px rgba(59, 130, 246, 0.5)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Our Services
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl text-gray-300"
          >
            Choose the perfect solution for your needs
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ y: -20 }}
              className="relative group"
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}
                animate={{
                  scale: hoveredIndex === index ? 1.1 : 1,
                }}
              />
              
              <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 h-full flex flex-col">
                <motion.div
                  animate={{
                    rotate: hoveredIndex === index ? 360 : 0,
                  }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl mb-6 flex items-center justify-center text-3xl`}
                >
                  {index === 0 ? "💻" : index === 1 ? "📱" : "☁️"}
                </motion.div>

                <h3 className="text-3xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 mb-4 flex-grow">
                  {service.description}
                </p>

                <div className="mb-6">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className={`text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${service.color} inline-block`}
                  >
                    {service.price}
                  </motion.div>
                  <span className="text-gray-400 ml-2">/ project</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center text-gray-300"
                    >
                      <motion.span
                        className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full mr-3`}
                        animate={{
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 bg-gradient-to-r ${service.color} text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all`}
                  data-gtm-cta={`choose_plan_${service.title.toLowerCase().replace(/\s+/g, '_')}`}
                  id={`gtm-plan-${index}`}
                >
                  Choose Plan
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { number: "500+", label: "Projects Completed" },
            { number: "50+", label: "Happy Clients" },
            { number: "99%", label: "Satisfaction Rate" },
            { number: "24/7", label: "Support Available" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 + index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 text-center"
            >
              <motion.div
                className="text-5xl font-bold text-white mb-2"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

