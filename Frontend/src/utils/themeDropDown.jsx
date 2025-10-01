import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";
import UseTheme from "../hooks/UseTheme";
import DropDownBtn from "../components/dropDownBtn";

const ThemeDropdown = () => {
  const [open, setOpen] = useState(false);
  const { lightTheme, darkTheme, detectSystem, theme } = UseTheme();

  const toggleDropdown = () => setOpen((prev) => !prev);

  // Animación para el contenedor
  const menuVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.15, ease: "easeIn" },
    },
  };

  return (
    <div className="relative inline-block text-left">
      {/* Botón */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 font-bold text-sm md:text-lg hover:text-cyan-300"
      >
        <DropDownBtn 
            open={open}
            onClick={toggleDropdown}
            className={`${
                  open ? "menu-dropdown.active" : "menu-dropdown.inactive"
                }`}
        />
      </button>

      {/* Menú desplegable */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute right-0 mt-6 w-40 rounded-xl shadow-lg ring-1 ring-black/10 overflow-hidden z-50 ${theme === 'dark' ? 'bg-black/25' : 'bg-white'}`}
          >
            <ul className="flex flex-col">
              <li>
                <button
                  onClick={() => {
                    lightTheme();
                    setOpen(false);
                  }}
                  className="text-gray-500 flex w-full items-center gap-2 px-4 py-2 hover:bg-cyan-100 dark:hover:bg-stone-700 transition"
                >
                  <FaSun className="text-yellow-500" /> Light
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    darkTheme();
                    setOpen(false);
                  }}
                  className="text-gray-500 flex w-full items-center gap-2 px-4 py-2 hover:bg-cyan-100 dark:hover:bg-stone-700 transition"
                >
                  <FaMoon className="text-indigo-600" /> Dark
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    detectSystem();
                    setOpen(false);
                  }}
                  className="text-gray-500 flex w-full items-center gap-2 px-4 py-2 hover:bg-cyan-100 dark:hover:bg-stone-700 transition"
                >
                  <FaDesktop className="text-gray-600" /> System
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeDropdown;
