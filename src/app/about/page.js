import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white py-12 px-6 flex flex-col items-center">
        <div className="max-w-6xl w-full space-y-12">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-white mb-4 tracking-wide">About Us</h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We are dedicated to empowering underrepresented entrepreneurs by increasing their visibility and accessibility. Our platform enables users to effortlessly find, review, and support Black-owned and minority-owned businesses.
            </p>
          </div>

          {/* Mission Section */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-semibold text-blue-400 mb-3">Our Mission</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                We aim to bridge the gap between consumers and minority-owned businesses by offering an easy-to-use platform. Discover businesses based on location and category, read reviews, and support local entrepreneurs effortlessly.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img src="images/search.png" alt="Platform Overview" className="w-full max-w-md rounded-lg shadow-lg" />
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-gray-800/90 backdrop-blur-md p-8 rounded-lg shadow-xl text-center">
            <h2 className="text-3xl font-semibold text-blue-400 mb-4">Why Choose Us?</h2>
            <ul className="list-none space-y-4 text-lg text-gray-300">
              <li className="transition-transform transform hover:scale-105 hover:text-blue-400">✓ Find Black-owned businesses near you</li>
              <li className="transition-transform transform hover:scale-105 hover:text-blue-400">✓ Read authentic reviews & ratings</li>
              <li className="transition-transform transform hover:scale-105 hover:text-blue-400">✓ Get real-time directions & navigation</li>
              <li className="transition-transform transform hover:scale-105 hover:text-blue-400">✓ Support entrepreneurs & strengthen the community</li>
            </ul>
          </div>

          {/* Key Features Section */}
          <div>
            <h2 className="text-3xl font-semibold text-blue-400 text-center mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
                <h3 className="text-xl font-bold text-white">🔍 Smart Search</h3>
                <p className="text-gray-300 mt-2">Find businesses by category, location, and customer ratings.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
                <h3 className="text-xl font-bold text-white">⭐ Verified Reviews</h3>
                <p className="text-gray-300 mt-2">Get real insights from customers before making a decision.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
                <h3 className="text-xl font-bold text-white">📍 Easy Navigation</h3>
                <p className="text-gray-300 mt-2">Use integrated maps to get instant directions.</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-blue-400 mb-3">Contact Us</h2>
            <p className="text-lg text-gray-300">For inquiries or support, reach us at <a href="mailto:support@upliftbiz.com" className="text-blue-500 hover:underline">support@minoritybizfinder.com</a></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}


// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// export default function About() {
//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-700 text-white">
//         <div className="p-8 max-w-4xl mx-auto">
//           <h1 className="text-4xl font-extrabold text-white mb-4 text-shadow-md transform hover:scale-105 transition-all">
//             About Us
//           </h1>
//           <p className="text-xl text-gray-300 mb-6 leading-relaxed tracking-wide opacity-90 hover:opacity-100 transition-all transform hover:scale-105">
//             We are dedicated to supporting Black-owned small businesses by making it easy for you to find and connect with them. Our platform allows users to search for Black-owned shops, restaurants, and other businesses, view ratings and reviews, and get directions seamlessly.
//           </p>

//           <div className="bg-gray-800/90 backdrop-blur-md p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
//             <h2 className="text-3xl font-semibold text-white mb-4 text-gradient">
//               Why Choose Us?
//             </h2>
//             <ul className="list-disc list-inside text-lg text-gray-300 space-y-3">
//               <li className="transition-transform transform hover:translate-x-2 hover:scale-105 hover:text-blue-400">
//                 Find Black-owned businesses near you
//               </li>
//               <li className="transition-transform transform hover:translate-x-2 hover:scale-105 hover:text-blue-400">
//                 Read reviews & ratings
//               </li>
//               <li className="transition-transform transform hover:translate-x-2 hover:scale-105 hover:text-blue-400">
//                 Get real-time directions to businesses
//               </li>
//               <li className="transition-transform transform hover:translate-x-2 hover:scale-105 hover:text-blue-400">
//                 Support local entrepreneurs and the community
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }