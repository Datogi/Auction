// NavigationBar.js
import ItemContext from "@/Context/ItemContext";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const NavigationBar = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const ctx = useContext(ItemContext);
  useEffect(() => {
    session ? ctx.setIsAdmin(true) : ctx.setIsAdmin(false);
  }, [session]);
  const handleSignIn = () => {
    signIn();
  };

  const handleSignOut = () => {
    signOut();
  };
  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-blue-500 px-4 py-2 h-1/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            className="h-16 w-16"
            src="https://static.vecteezy.com/system/resources/thumbnails/024/043/963/small/book-icon-clipart-transparent-background-free-png.png"
          />
        </div>
        <div className="flex items-center">
          {session ? (
            <>
              <img
                onClick={handleToggleDropdown}
                src={session.user.image}
                alt="User Avatar"
                className="w-8 h-8 rounded-full mx-3"
              />

              <div className="relative inline-block text-left">
                {/* Dropdown content */}
                {isDropdownOpen && (
                  <div className="z-20 origin-top-right absolute right-0 mt-8 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      {/* Sign Out button */}
                      {session && (
                        <div className="">
                          <Link
                            href="/"
                            className=" block border-b-2 border-b-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                            role="menuitem"
                          >
                            Home
                          </Link>
                          <Link
                            href="/addBook"
                            className="z-20 block border-b-2 border-b-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                            role="menuitem"
                          >
                            Add book
                          </Link>
                          <button
                            onClick={handleSignOut}
                            className="z-20 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                            role="menuitem"
                          >
                            Sign Out
                          </button>
                        </div>
                      )}

                      {/* Add Information button */}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            // If user is not signed in
            <>
              <button
                onClick={handleSignIn}
                className="text-white hover:text-gray-300 mr-4"
              >
                Sign In
              </button>
              <button
                onClick={handleSignIn}
                className="text-white hover:text-gray-300"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
