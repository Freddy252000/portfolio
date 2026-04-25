import Layout from "./components/Layout";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";
import Certifications from "./components/Certifications";

function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Projects />
      <Certifications />
      <Contact />
      <ScrollToTop />
    </Layout>
  );
}

export default App;
