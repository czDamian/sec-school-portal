"use client";

import { useUser } from "@civic/auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaGraduationCap, FaUserCircle } from "react-icons/fa";
import Link from "next/link";

export default function Login() {
  const { signIn, signOut, user } = useUser();
  const router = useRouter();

  const handleSignIn = async () => {
    await signIn();
    router.push("/dashboard");
  };

  if (user) {
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#131734] px-4">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-yellow-500/20 to-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

      <div className="container mx-auto">
        <motion.div
          className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid md:grid-cols-2">
            {/* Left Column - Image */}
            <div className="relative hidden md:block">
              <img
                src="/school-logo.jpg"
                alt="School Building"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90 mix-blend-multiply"></div>
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="text-white text-center">
                  <FaGraduationCap className="text-5xl mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">
                    Memorial Grammar School
                  </h2>
                  <p className="text-sm text-gray-200">
                    Nurturing Tomorrow&apos;s Leaders Through Excellence in
                    Education
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Login Form */}
            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <FaUserCircle className="text-4xl text-blue-400 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  Student Portal Login
                </h3>
                <p className="text-gray-400 text-sm">
                  Access your academic records, results, and more
                </p>
              </div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {!user ? (
                  <>
                    <motion.button
                      onClick={handleSignIn}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg 
                               py-3 px-4 font-semibold hover:shadow-lg transition-all duration-300
                               hover:from-blue-600 hover:to-blue-700 cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Sign In with Email
                    </motion.button>
                    <Link href="/">
                      <motion.button
                        className="w-full border border-gray-400 text-gray-300 rounded-lg 
                                 py-3 px-4 font-semibold hover:bg-white/10 transition-all duration-300
                                 cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Back to Homepage
                      </motion.button>
                    </Link>
                  </>
                ) : (
                  <motion.button
                    onClick={signOut}
                    className="w-full bg-red-500 text-white rounded-lg py-3 px-4 
                             font-semibold hover:bg-red-600 transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign Out
                  </motion.button>
                )}

                <div className="text-center text-sm text-gray-400">
                  <p className="mt-4">
                    Need help? Contact the school administration
                  </p>
                  <p className="mt-2">Phone: +234 806 086 4466</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
