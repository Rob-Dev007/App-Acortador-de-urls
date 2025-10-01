import { FaGithub, FaLink, FaSun, FaMoon, FaDesktop } from "react-icons/fa";
import { Link } from "react-router-dom";
import UseTheme from "../hooks/UseTheme";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeDropdown from "../utils/themeDropDown";

const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);

  const { theme, detectSystem, darkTheme, lightTheme } = UseTheme();

  // Variantes para el stagger
  const menuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header>
      <nav
        className={`bg-gradient-to-r from-indigo-400 to-indigo-500 h-8 w-full flex justify-between items-center py-8 px-3 md:p-8 text-white`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to="/">
            <p className="font-bold text-lg">Small-link</p>
          </Link>
          <FaLink />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:justify-between gap-5 items-center">
          <Link
            to="/login"
            className="font-bold text-sm md:text-lg hover:text-cyan-300"
          >
            Inicia sesión
          </Link>
          <Link
            to="/registrar"
            className="font-bold text-sm md:text-lg hover:text-cyan-300"
          >
            Registrate
          </Link>
          <a
            href="https://github.com/Rob-Dev007/AppWebUrlShortener"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-300"
          >
            <FaGithub size={20} />
          </a>

          {/* Theme dropdown */}
          <h3 className="flex items-center gap-1 font-bold text-sm md:text-lg">
            Tema
            <span>
              <ThemeDropdown />
            </span>
          </h3>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="relative z-50 w-8 h-8 flex flex-col justify-between items-center"
          >
            <span
              className={`h-1 w-full bg-white rounded transition-transform ${
                open ? "rotate-45 translate-y-3" : ""
              }`}
            />
            <span
              className={`h-1 w-full bg-white rounded ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-1 w-full bg-white rounded transition-transform ${
                open ? "-rotate-45 -translate-y-3" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay Menu con stagger */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`lg:hidden fixed inset-0 z-40 flex flex-col items-center justify-center text-white ${
              theme === "dark" ? "bg-stone-900" : "bg-indigo-500"
            }`}
          >
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col gap-6"
            >
              <motion.div variants={itemVariants}>
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="text-2xl font-bold hover:text-cyan-300"
                >
                  Inicia sesión
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  to="/registrar"
                  onClick={toggleMenu}
                  className="text-2xl font-bold hover:text-cyan-300"
                >
                  Regístrate
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <a
                  href="https://github.com/Rob-Dev007/AppWebUrlShortener"
                  target="_blank"
                  rel="noreferrer"
                  className="text-2xl hover:text-cyan-300"
                >
                  <FaGithub />
                </a>
              </motion.div>

              {/* Theme buttons inside mobile menu */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-4 mt-6"
              >
                <button
                  onClick={() => {
                    lightTheme();
                    toggleMenu();
                  }}
                  className="flex items-center gap-2 text-xl hover:text-cyan-300"
                >
                  <FaSun /> Light
                </button>
                <button
                  onClick={() => {
                    darkTheme();
                    toggleMenu();
                  }}
                  className="flex items-center gap-2 text-xl hover:text-cyan-300"
                >
                  <FaMoon /> Dark
                </button>
                <button
                  onClick={() => {
                    detectSystem();
                    toggleMenu();
                  }}
                  className="flex items-center gap-2 text-xl hover:text-cyan-300"
                >
                  <FaDesktop /> System
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
