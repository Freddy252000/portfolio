import { useEffect } from "react";
import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { initSmoothScroll } from "../utils/smoothScroll";

const Layout = ({ children }: { children: ReactNode }) => {
  useEffect(() => initSmoothScroll(), []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-bg text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
