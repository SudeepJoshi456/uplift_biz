import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-googleGray text-2xl font-bold">UpliftBiz</h1>
        <div className="space-x-4">
          <Link href="/" className="text-googleBlue hover:text-red-400">Home</Link>
          <Link href="/businesses" className="text-googleBlue hover:text-googleGreen">Businesses</Link>
          <Link href="/about" className="text-googleBlue hover:text-googleYellow">About</Link>
          <Link href="/contact" className="text-googleBlue hover:text-googleRed">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
