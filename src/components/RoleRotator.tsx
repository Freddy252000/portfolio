import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Types a role, holds it, deletes it, then types the next one. */
const RoleRotator = ({ roles, className = "" }: { roles: string[]; className?: string }) => {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [text, setText] = useState(reduce ? roles[0] : "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) {
      const t = setInterval(() => setI((n) => (n + 1) % roles.length), 2600);
      return () => clearInterval(t);
    }
    const full = roles[i];
    let delay = deleting ? 45 : 85;
    if (!deleting && text === full) delay = 1800;
    if (deleting && text === "") delay = 250;

    const t = setTimeout(() => {
      if (!deleting && text === full) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setI((n) => (n + 1) % roles.length);
      } else setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i, roles, reduce]);

  const shown = reduce ? roles[i] : text;
  return (
    <span className={className}>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true">{shown}</span>
      <span aria-hidden="true" className="ml-1 inline-block h-[0.8em] w-[3px] translate-y-[0.08em] animate-blink rounded-full bg-accent align-baseline" />
    </span>
  );
};

export default RoleRotator;
