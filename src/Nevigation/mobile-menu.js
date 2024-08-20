import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FiList, FiLayers } from "react-icons/fi";

export default function Sidebar() {
  const [sidebarActive, setSidebarActive] = useState(false);
  const sidebar = useRef(null);
  const toggleButton = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { compareList = [] } = location.state || {}; 

  const handleAddMore = () => {
    navigate("/", { state: { compareList } }); 
  };

  const handleCompare = () => {
    navigate("/compare", { state: { compareList } }); 
  };

  useEffect(() => {
    if (!sidebarActive) return;

    function handleClick(event) {
      if (
        sidebar.current &&
        !sidebar.current.contains(event.target) &&
        !toggleButton.current.contains(event.target)
      ) {
        setSidebarActive(false);
      }
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [sidebarActive]);

  useEffect(() => {
    setSidebarActive(false);
  }, [location.pathname]);

  return (
    <div className="relative">
      <button
        aria-label="Toggle sidebar"
        ref={toggleButton}
        onClick={() => setSidebarActive(!sidebarActive)}
        className="focus:ring-2 ring-violet-500 my-2 lg:hidden" 
      >
        {!sidebarActive ? (
          <svg
            className="w-6 h-6 text-gray-900 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-gray-900 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </button>
      {sidebarActive && (
        <div
          ref={sidebar}
          className="fixed top-0 left-0 h-full w-64 bg-white text-gray-900 shadow z-30 lg:hidden" 
        >
          <ul className="py-4">
            <div className="text-2xl px-6 py-3 font-semibold text-gray-900 focus:ring-2 ring-violet-500">
              Compare App💥
            </div>
            <li className="px-4 py-2 flex items-center gap-2">
              <FiLayers className="text-gray-600" />

              <button
                onClick={handleAddMore}
                className="block p-3 hover:bg-gray-100"
              >
                Product Details
              </button>
            </li>
            <li className="px-4 py-2 flex items-center gap-2">
              <FiList className="text-gray-600" />
              <button
                onClick={handleCompare}
                className="block p-3 hover:bg-gray-100"
                disabled={compareList.length === 0} 
              >
                Compare Products
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
