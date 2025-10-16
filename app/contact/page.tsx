"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Contact() {
  const [formData, setFormData] = useState({
    pic_name: "",
    company_name: "",
    expected_price: "",
  });

  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Track form submission attempt
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'form_submission_attempt',
          form_name: 'contact_form',
          company_name: formData.company_name,
        });
      }

      const { error: submitError } = await supabase
        .from('form_submissions')
        .insert([
          {
            pic_name: formData.pic_name,
            company_name: formData.company_name,
            expected_price: parseFloat(formData.expected_price),
          },
        ]);

      if (submitError) throw submitError;

      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'form_submission_success',
          form_name: 'contact_form',
          company_name: formData.company_name,
          expected_price: formData.expected_price,
        });
      }

      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        setFormData({ pic_name: "", company_name: "", expected_price: "" });
      }, 3000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit form. Please try again.');
      
      // Track submission error
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'form_submission_error',
          form_name: 'contact_form',
          error_message: err instanceof Error ? err.message : 'Unknown error',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: "📧", title: "Email", value: "hello@gtm.com", color: "from-blue-500 to-cyan-500" },
    { icon: "📱", title: "Phone", value: "+1 (555) 123-4567", color: "from-purple-500 to-pink-500" },
    { icon: "📍", title: "Location", value: "San Francisco, CA", color: "from-green-500 to-emerald-500" },
    { icon: "⏰", title: "Hours", value: "Mon-Fri 9AM-6PM", color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <Link href="/" data-gtm-nav="back_to_home_from_contact" id="gtm-contact-back-home">
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
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="text-7xl md:text-9xl font-extrabold text-center mb-6"
        >
          <motion.span
            className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-teal-500 to-blue-500"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            Get in Touch
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl text-gray-200 text-center mb-16"
        >
          We&apos;d love to hear from you
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-6">Send us a message</h2>
              
              <form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                id="gtm-contact-form"
                data-gtm-form="contact"
              >
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <label htmlFor="pic_name" className="block text-white mb-2 font-semibold">
                    PIC Name <span className="text-red-400">*</span>
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    id="pic_name"
                    name="pic_name"
                    value={formData.pic_name}
                    onChange={(e) => setFormData({ ...formData, pic_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 transition-all backdrop-blur-lg"
                    placeholder="Person in Charge Name"
                    data-gtm-field="pic_name"
                    required
                    disabled={isSubmitting}
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <label htmlFor="company_name" className="block text-white mb-2 font-semibold">
                    Company Name <span className="text-red-400">*</span>
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    id="company_name"
                    name="company_name"
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 transition-all backdrop-blur-lg"
                    placeholder="Your Company Name"
                    data-gtm-field="company_name"
                    required
                    disabled={isSubmitting}
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <label htmlFor="expected_price" className="block text-white mb-2 font-semibold">
                    Expected Budget (USD) <span className="text-red-400">*</span>
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="number"
                    id="expected_price"
                    name="expected_price"
                    step="0.01"
                    min="0"
                    value={formData.expected_price}
                    onChange={(e) => setFormData({ ...formData, expected_price: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 transition-all backdrop-blur-lg"
                    placeholder="e.g., 5000.00"
                    data-gtm-field="expected_price"
                    required
                    disabled={isSubmitting}
                  />
                </motion.div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-white"
                    data-gtm-error="form_error"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  type="submit"
                  id="gtm-submit-contact-form"
                  data-gtm-button="submit_contact"
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-bold text-lg shadow-2xl hover:shadow-green-500/50 transition-all relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSent ? (
                    <motion.span
                      initial={{ y: 50 }}
                      animate={{ y: 0 }}
                      className="flex items-center justify-center gap-2"
                      data-gtm-state="success"
                    >
                      <span>✓</span> Submission Successful!
                    </motion.span>
                  ) : isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        ⏳
                      </motion.span>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Inquiry"
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, x: 10 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all group"
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}
                  >
                    {info.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{info.title}</h3>
                    <p className="text-gray-300">{info.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl p-8 text-center shadow-2xl"
            >
              <motion.h3
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="text-3xl font-bold text-white mb-4"
              >
                Let&apos;s Build Something Amazing Together!
              </motion.h3>
              <p className="text-white/90">
                Our team is ready to bring your ideas to life
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

