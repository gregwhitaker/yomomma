"use client";

import { useEffect, useState } from "react";

type SiteFooterProps = {
  linkHref: string;
  linkLabel: string;
};

export function SiteFooter({ linkHref, linkLabel }: SiteFooterProps) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const preferredTheme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";

    setTheme(preferredTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-actions">
          <button
            className="theme-toggle"
            data-mode={theme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            onClick={toggleTheme}
          >
            <span className="theme-icon sun" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <circle cx="12" cy="12" r="4.2" />
                <path d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9L5.3 5.3" />
              </svg>
            </span>
            <span className="theme-icon moon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M18.5 14.6A7.6 7.6 0 0 1 9.4 5.5a8.2 8.2 0 1 0 9.1 9.1Z" />
              </svg>
            </span>
            <span className="theme-thumb" aria-hidden="true" />
          </button>
          <span className="footer-separator" aria-hidden="true">
            •
          </span>
          <a className="api-link" href={linkHref}>
            {linkLabel}
          </a>
        </div>
      </div>
    </footer>
  );
}
