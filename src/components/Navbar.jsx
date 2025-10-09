import { cn } from "@/lib/utils";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Scroll handler
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);

      setShowNavbar(
        currentScrollY < lastScrollY || currentScrollY <= 60
      );

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme handler
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5",
        showNavbar ? "top-0" : "-top-28"
      )}
      style={{ transition: "top 0.3s" }}
    >
      <div className="container flex items-center justify-between">
        <a className="text-xl font-bold text-primary flex items-center" href="#hero">
          <span className="relative z-10">
            <span className="text-glow text-foreground">Tawanda_M</span> Portfolio
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}

          {/* Desktop Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors duration-300"
          >
            {isDarkMode ? (
              <Sun className="h-6 w-6 text-yellow-300" />
            ) : (
              <Moon className="h-6 w-6 text-blue-900" />
            )}
          </button>
        </div>

        {/* Mobile nav button */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile menu */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-all duration-300 md:hidden",
            isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col items-center space-y-8 text-xl">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}

            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full transition-colors duration-300"
            >
              {isDarkMode ? (
                <Sun className="h-6 w-6 text-yellow-300" />
              ) : (
                <Moon className="h-6 w-6 text-blue-900" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
