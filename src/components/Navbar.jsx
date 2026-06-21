import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Our Team", path: "/counsellors" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "Contact Us", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <img
              src="/images/sukoonlogowhite.webp"
              alt="Sukoon World Logo"
              className="h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-105 rounded-lg"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium text-sm transition-colors duration-200 relative group ${isActive(item.path)
                    ? "text-primary"
                    : "text-gray-600 hover:text-primary"
                  }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-[-4px] left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out ${isActive(item.path) ? "scale-x-100" : ""
                    }`}
                ></span>
              </Link>
            ))}

            {user ? (
              <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white">
                <Link to={user.role === 'admin' ? '/admin' : '/my-bookings'}>My Dashboard</Link>
              </Button>
            ) : (
              <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white">
                <Link to="/my-bookings">Login / Sign Up</Link>
              </Button>
            )}

            <Button
              asChild
              className="bg-primary hover:bg-primary/90 rounded-full"
            >
              <Link to="/book">Book a Session</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-gray-100"
          >
            <div className="flex flex-col space-y-4 px-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-medium transition-colors duration-200 ${isActive(item.path)
                      ? "text-primary"
                      : "text-gray-600 hover:text-primary"
                    }`}
                >
                  {item.name}
                </Link>
              ))}

              {user ? (
                <Button asChild variant="outline" className="rounded-full w-fit border-primary text-primary">
                  <Link to={user.role === 'admin' ? '/admin' : '/my-bookings'} onClick={() => setIsOpen(false)}>My Dashboard</Link>
                </Button>
              ) : (
                <Button asChild variant="outline" className="rounded-full w-fit border-primary text-primary">
                  <Link to="/my-bookings" onClick={() => setIsOpen(false)}>Login / Sign Up</Link>
                </Button>
              )}

              <Button
                asChild
                className="bg-primary hover:bg-primary/90 rounded-full w-fit"
              >
                <Link to="/book" onClick={() => setIsOpen(false)}>
                  Book a Session
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
