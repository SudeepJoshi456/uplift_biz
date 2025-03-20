export default function Footer() {
  return (
    <footer className="bg-gray-900/95 backdrop-blur-md text-gray-300 text-center p-6 border-t border-gray-700/30">
      <p className="text-sm hover:text-white transition-colors duration-300">
        &copy; {new Date().getFullYear()} UpliftBiz. All rights reserved.
      </p>
      <p className="text-xs text-gray-500 mt-2 hover:text-gray-400 transition-colors duration-300">
        Supporting Black-owned businesses, one connection at a time.
      </p>
    </footer>
  );
}