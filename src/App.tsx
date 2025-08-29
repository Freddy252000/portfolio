import React from "react";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Projects />
      <Contact />
      <ScrollToTop />
    </Layout>
  );
}

export default App;
