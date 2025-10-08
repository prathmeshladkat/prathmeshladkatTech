import React, { useState } from "react";
import {
  Home,
  PenTool,
  Github,
  Linkedin,
  Twitter,
  Sun,
  Moon,
} from "lucide-react";

// Mock components - replace with your actual shadcn components
const Button = ({ children, className, variant, size, ...props }) => (
  <button
    className={`inline-flex items-center justify-center ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Separator = ({ orientation, className }) => (
  <div
    className={`${
      orientation === "vertical" ? "w-px h-full" : "h-px w-full"
    } bg-gray-300 dark:bg-gray-700 ${className}`}
  />
);

const Tooltip = ({ children }) => {
  const [show, setShow] = useState(false);
  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className="relative"
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { show })
      )}
    </div>
  );
};

const TooltipTrigger = ({ children, show }) => children;

const TooltipContent = ({ children, show }) =>
  show ? (
    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
      {children}
    </div>
  ) : null;

// Dock Components (simplified version)
const Dock = ({ children, className = "" }) => {
  return (
    <div
      className={`mx-auto mt-8 flex h-[58px] w-max items-center justify-center gap-2 rounded-2xl border border-gray-200 dark:border-gray-800 p-2 backdrop-blur-md bg-white/80 dark:bg-black/80 ${className}`}
    >
      {children}
    </div>
  );
};

const DockIcon = ({ children, className = "" }) => {
  return (
    <div
      className={`flex aspect-square cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors p-2 ${className}`}
    >
      {children}
    </div>
  );
};

// Theme Toggle Component
const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    // In your real app, this would call your theme provider's setTheme function
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          onClick={toggleTheme}
          variant="ghost"
          size="icon"
          className="size-12 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="size-4" />
          ) : (
            <Sun className="size-4" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{theme === "light" ? "Dark" : "Light"} Mode</p>
      </TooltipContent>
    </Tooltip>
  );
};

// Main Dock Demo Component
export default function DockNavbar() {
  const navItems = [
    { href: "#", icon: Home, label: "Home" },
    { href: "#", icon: PenTool, label: "Blog" },
  ];

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/prathmeshladkat", icon: Github },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/prathmesh-ladkat/",
      icon: Linkedin,
    },
    { name: "X", url: "#", icon: Twitter },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <Dock>
        {navItems.map((item) => (
          <DockIcon key={item.label}>
            <Tooltip>
              <TooltipTrigger>
                <a
                  href={item.href}
                  aria-label={item.label}
                  className="size-10  rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <item.icon className="size-3 text-gray-700 dark:text-gray-300" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}

        <Separator orientation="vertical" className="h-full py-2" />

        {socialLinks.map((social) => (
          <DockIcon key={social.name}>
            <Tooltip>
              <TooltipTrigger>
                <a
                  href={social.url}
                  aria-label={social.name}
                  className="size-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <social.icon className="size-3 text-gray-700 dark:text-gray-300" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>{social.name}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}

        <DockIcon>
          <ThemeToggle />
        </DockIcon>
      </Dock>
    </div>
  );
}
