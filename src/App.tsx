import Layout from "./components/Layout";
import Intro from "./components/Intro";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Workspace from "./components/Workspace";
import Projects from "./components/Projects";
import About from "./components/About";
import Journey from "./components/Journey";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Dock from "./components/Dock";

function App() {
  return (
    <>
      <Intro />
      <Layout>
        <Hero />
        <Services />
        <Workspace />
        <Projects />
        <About />
        <Journey />
        <Certifications />
        <Contact />
      </Layout>
      <Dock />
    </>
  );
}

export default App;
