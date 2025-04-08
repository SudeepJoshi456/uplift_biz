import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Star, MapPin } from "lucide-react";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#fddede] text-black py-12 px-6 flex flex-col items-center">
        <div className="max-w-6xl w-full space-y-12 bg-[#fff5f7] p-8 rounded-2xl shadow-2xl">

          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-black mb-4 tracking-wide">About Us</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              We are dedicated to empowering underrepresented entrepreneurs by increasing their visibility and accessibility. Our platform enables users to effortlessly find, review, and support Black-owned and minority-owned businesses.
            </p>
          </div>

          {/* Mission Section */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-semibold text-[#520606] mb-3">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We aim to bridge the gap between consumers and minority-owned businesses by offering an easy-to-use platform. Discover businesses based on location and category, read reviews, and support local entrepreneurs effortlessly.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="images/search.png"
                alt="Platform Overview"
                className="w-full max-w-md rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white/60 backdrop-blur-md p-8 rounded-lg shadow-xl text-center">
            <h2 className="text-3xl font-semibold text-[#520606] mb-4">Why Choose Us?</h2>
            <ul className="list-none space-y-4 text-lg text-gray-700">
              <li className="transition-transform transform hover:scale-105 hover:text-[#520606]">✓ Find Black-owned businesses near you</li>
              <li className="transition-transform transform hover:scale-105 hover:text-[#520606]">✓ Read authentic reviews & ratings</li>
              <li className="transition-transform transform hover:scale-105 hover:text-[#520606]">✓ Get real-time directions & navigation</li>
              <li className="transition-transform transform hover:scale-105 hover:text-[#520606]">✓ Support entrepreneurs & strengthen the community</li>
            </ul>
          </div>

          {/* Key Features Section */}
          <div>
            <h2 className="text-3xl font-semibold text-[#520606] text-center mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/70 p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
                <div className="flex justify-center mb-2">
                  <Search className="w-8 h-8 text-[#520606]" />
                </div>
                <h3 className="text-xl font-bold text-black">Smart Search</h3>
                <p className="text-gray-700 mt-2">Find businesses by category, location, and customer ratings.</p>
              </div>
              <div className="bg-white/70 p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
                <div className="flex justify-center mb-2">
                  <Star className="w-8 h-8 text-[#520606]" />
                </div>
                <h3 className="text-xl font-bold text-black">Verified Reviews</h3>
                <p className="text-gray-700 mt-2">Get real insights from customers before making a decision.</p>
              </div>
              <div className="bg-white/70 p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
                <div className="flex justify-center mb-2">
                  <MapPin className="w-8 h-8 text-[#520606]" />
                </div>
                <h3 className="text-xl font-bold text-black">Easy Navigation</h3>
                <p className="text-gray-700 mt-2">Use integrated maps to get instant directions.</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-[#520606] mb-3">Contact Us</h2>
            <p className="text-lg text-gray-700">
              For inquiries or support, reach us at{" "}
              <a
                href="mailto:support@upliftbiz.com"
                className="text-gray-800 font-semibold hover:underline"
              >
                support@upliftbiz.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
