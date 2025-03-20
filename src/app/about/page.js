import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-700 text-white">
        <div className="p-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white mb-4 text-shadow-md transform hover:scale-105 transition-all">
            About Us
          </h1>
          <p className="text-xl text-gray-300 mb-6 leading-relaxed tracking-wide opacity-90 hover:opacity-100 transition-all transform hover:scale-105">
            We are dedicated to supporting Black-owned small businesses by making it easy for you to find and connect with them. Our platform allows users to search for Black-owned shops, restaurants, and other businesses, view ratings and reviews, and get directions seamlessly.
          </p>

          <div className="bg-gray-800/90 backdrop-blur-md p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
            <h2 className="text-3xl font-semibold text-white mb-4 text-gradient">
              Why Choose Us?
            </h2>
            <ul className="list-disc list-inside text-lg text-gray-300 space-y-3">
              <li className="transition-transform transform hover:translate-x-2 hover:scale-105 hover:text-blue-400">
                Find Black-owned businesses near you
              </li>
              <li className="transition-transform transform hover:translate-x-2 hover:scale-105 hover:text-blue-400">
                Read reviews & ratings
              </li>
              <li className="transition-transform transform hover:translate-x-2 hover:scale-105 hover:text-blue-400">
                Get real-time directions to businesses
              </li>
              <li className="transition-transform transform hover:translate-x-2 hover:scale-105 hover:text-blue-400">
                Support local entrepreneurs and the community
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}