import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/portfolio";
import { scrollToSection } from "../utils/smoothScroll";

const marquee = ["React Native", "TypeScript", "React", "Mobile apps", "Web apps", "UI/UX design", "Figma"];

const Footer = () => (
  <footer className="relative mt-12 overflow-hidden border-t border-line/10">
    <div className="flex overflow-hidden border-b border-line/10 py-5" aria-hidden="true">
      <div className="flex shrink-0 animate-marquee gap-10 whitespace-nowrap pr-10 font-display text-3xl font-semibold text-muted/30 md:text-5xl">
        {[...marquee, ...marquee].map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            {w} <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>

    <div className="container-x pb-28 pt-16">
      <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-accent">Have a project in mind?</p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#contact");
            }}
            className="group mt-4 flex items-center gap-3 font-display text-4xl font-semibold md:text-6xl"
          >
            Let's build something
            <ArrowUpRight className="h-10 w-10 text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 md:h-14 md:w-14" />
          </a>
        </div>
        <div className="flex gap-2">
          {[
            { label: "GitHub", href: profile.github, Icon: Github },
            { label: "LinkedIn", href: profile.linkedin, Icon: Linkedin },
            { label: "Email", href: `mailto:${profile.email}`, Icon: Mail },
          ].map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-12 w-12 place-items-center rounded-full border border-line/10 text-muted transition-colors hover:border-accent/50 hover:text-accent"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-14 flex flex-col justify-between gap-3 border-t border-line/10 pt-6 text-sm text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>Designed & built by Freddy · React · Three.js</p>
      </div>
    </div>
  </footer>
);

export default Footer;
