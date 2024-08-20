import { Link } from "react-router-dom";
import MobileMenu from "./mobile-menu";

export default function Header() {
  return (
    <div>
      <div className="w-full h-[81px]" />
      <header className="fixed w-full h-[81px] top-0 px-3 py-5 border-b border-gray-300 bg-white z-20">
        <div className="relative flex justify-between items-center max-w-screen-xl mx-auto">
          <Link
            href="/"
            className="text-2xl font-semibold text-gray-900 focus:ring-2 ring-violet-500"
          >
            Compare💥
          </Link>
          <div className="flex-1 flex justify-center">
            <ul className="md:flex hidden gap-8">
              <li>
                <div className="underline-offset-2 decoration-2 hover:underline font-medium">
                  Product List
                </div>
              </li>
              <li>
                <div className="underline-offset-2 decoration-2 hover:underline font-medium">
                  Compare List
                </div>
              </li>
            </ul>
          </div>
          <div className="md:inline-block hidden px-4 py-2 bg-violet-500 hover:bg-violet-400 text-white rounded transition">
            Launch Tool
          </div>
          <MobileMenu />
        </div>
      </header>
    </div>
  );
}
