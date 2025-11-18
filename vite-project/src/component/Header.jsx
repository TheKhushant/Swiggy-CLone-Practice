// Header.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RxCaretDown } from 'react-icons/rx';
import { IoMdSearch } from 'react-icons/io';
import { CiDiscount1 } from 'react-icons/ci';
import { FiHelpCircle, FiUser, FiShoppingCart } from 'react-icons/fi';
import Sidebar from './Sidebar';
import NavItem from './NavItem';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { icon: <IoMdSearch />, name: 'Search' },
    { icon: <CiDiscount1 />, name: 'Offers', sup: 'New' },
    { icon: <FiHelpCircle />, name: 'Help' },
    { icon: <FiUser />, name: 'Sign In' },
    { icon: <FiShoppingCart />, name: 'Cart', sup: '(3)' },
  ];

  return (
    <>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <header className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 w-28">
              <img 
                src="/images/logo.png" 
                alt="Food Delivery" 
                className="w-full h-auto"
              />
            </div>

            {/* Location Selector */}
            <div className="flex items-center space-x-1 cursor-pointer">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-gray-900 border-b-2 border-gray-900">
                  Nagpur,
                </span>
                <span className="text-gray-600">Maharashtra, India</span>
                <RxCaretDown className="text-orange-500 text-xl" />
              </motion.div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <NavItem key={index} {...item} />
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <RxCaretDown className="text-orange-500 text-xl" />
            </motion.button>
          </div>
        </div>
      </header>
    </>
  );
}