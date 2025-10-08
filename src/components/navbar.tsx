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

// ----------------------------------------
// Mock components (replace with shadcn/ui in production)

type ButtonProps = {
  className?: string;
  variant?: string;
  size?: string;
  onClick?: () => void;
  "aria-label"?: string;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <button
    className={`inline-flex items-center justify-center ${className}`}
    {...props}
  >
    {children}
  </button>
);

type SeparatorProps = {
  orientation?: "vertical" | "horizontal";
  className?: string;
};

const Separator: React.FC<SeparatorProps> = ({
  orientation = "horizontal",
  className = "",
}) => (
  <div
    className={`${
      orientation === "vertical" ? "w-px h-full" : "h-px w-full"
    } bg-gray-300 dark:bg-gray-700 ${className}`}
  />
);

type TooltipProps = {
  children: React.ReactNode;
};

const Tooltip: React.FC<TooltipProps> = ({ children }) => {
  const [show, setShow] = useState(false);
  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className="relative"
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ show?: boolean }>,
              { show }
            )
          : child
      )}
    </div>
  );
};

type TooltipTriggerProps = {
  children: React.ReactNode;
  show?: boolean;
};

const TooltipTrigger: React.FC<TooltipTriggerProps> = ({ children }) => (
  <>{children}</>
);

type TooltipContentProps = {
  children: React.ReactNode;
  show?: boolean;
};

const TooltipContent: React.FC<TooltipContentProps> = ({ children, show }) =>
  show ? (
    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
      {children}
    </div>
  ) : null;

// ----------------------------------------
// Dock Components
// ----------------------------------------

type DockProps = {
  children: React.ReactNode;
  className?: string;
};

const Dock: React.FC<DockProps> = ({ children, className = "" }) => (
  <div
    className={`mx-auto mt-8 flex h-[58px] w-max items-center justify-center gap-2 rounded-2xl border border-gray-200 dark:border-gray-800 p-2 backdrop-blur-md bg-white/80 dark:bg-black/80 ${className}`}
  >
    {children}
  </div>
);

type DockIconProps = {
  children: React.ReactNode;
  className?: string;
};

const DockIcon: React.FC<DockIconProps> = ({ children, className = "" }) => (
  <div
    className={`flex aspect-square cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors p-2 ${className}`}
  >
    {children}
  </div>
);

// ----------------------------------------
// Theme Toggle Component
// ----------------------------------------

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          onClick={toggleTheme}
          variant="ghost"
          size="icon"
          className="size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
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

// ----------------------------------------
// Main Dock Navbar Component
// ----------------------------------------

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
        {/* Navigation Icons */}
        {navItems.map((item) => (
          <DockIcon key={item.label}>
            <Tooltip>
              <TooltipTrigger>
                <a
                  href={item.href}
                  aria-label={item.label}
                  className="size-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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

        {/* Social Links */}
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

        {/* Theme Toggle */}
        <DockIcon>
          <ThemeToggle />
        </DockIcon>
      </Dock>
    </div>
  );
}
