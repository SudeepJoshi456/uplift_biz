import Link from "next/link";
import { User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-gray-900/95 backdrop-blur-md shadow-2xl p-4 border-b border-gray-700/30">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold hover:text-gray-300 transition-colors duration-300 transform hover:scale-105">
          UpliftBiz
        </h1>
        <div className="space-x-6 flex items-center">
          <Link
            href="/home"
            className="text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-110"
          >
            Home
          </Link>
          <Link
            href="/categories"
            className="text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-110"
          >
            Categories
          </Link>
          <Link
            href="/about"
            className="text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-110"
          >
            About
          </Link>
          <div className="ml-4 cursor-pointer">
            <User className="w-8 h-8 text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-110" />
          </div>
        </div>
      </div>
    </nav>
  );
}


// import Link from "next/link";

// export default function Navbar() {
//   return (
//     <nav className="bg-gray-900/95 backdrop-blur-md shadow-2xl p-4 border-b border-gray-700/30">
//       <div className="max-w-6xl mx-auto flex justify-between items-center">
//         <h1 className="text-white text-2xl font-bold hover:text-gray-300 transition-colors duration-300 transform hover:scale-105">
//           UpliftBiz
//         </h1>
//         <div className="space-x-6">
//           <Link
//             href="/"
//             className="text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-110"
//           >
//             Home
//           </Link>
//           <Link
//             href="/categories"
//             className="text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-110"
//           >
//             Categories
//           </Link>
//           <Link
//             href="/about"
//             className="text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-110"
//           >
//             About
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }