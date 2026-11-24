import { useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { profile } from "../data/portfolio";
import { Gradient, Reveal, SectionHeading } from "./ui";

// EmailJS config (these IDs are public by design)
const EMAILJS_SERVICE_ID = "service_r01ay3b";
const EMAILJS_TEMPLATE_ID = "template_nkz2dda";
const EMAILJS_PUBLIC_KEY = "acYtEFfF91u3bik1q";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type ContactForm = z.infer<typeof contactSchema>;

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactForm) => {
    setStatus("idle");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
          to_email: profile.email,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("sent");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    }
  };

  const contactInfo = [
    { Icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, tint: "bg-accent/10 text-accent" },
    { Icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone}`, tint: "bg-accent2/10 text-accent2" },
    { Icon: MapPin, label: "Location", value: profile.location, tint: "bg-pink-500/10 text-pink-500" },
  ];

  const field = (name: keyof ContactForm, label: string, input: ReactNode) => (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      {input}
      {errors[name] && <p className="mt-1.5 text-xs text-danger">{errors[name]?.message}</p>}
    </div>
  );

  return (
    <section id="contact" className="section">
      <div className="container-x">
        <SectionHeading
          label="Contact"
          title={
            <>
              Let's build something <Gradient>great together</Gradient>
            </>
          }
          intro="Hiring, collaborating, or have an app idea? Send me a message and I'll get back to you quickly."
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="space-y-3">
            {contactInfo.map(({ Icon, label, value, href, tint }) => {
              const body = (
                <>
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${tint}`}>
                    <Icon size={20} />
                  </span>
                  <span>
                    <span className="block text-xs font-medium text-muted">{label}</span>
                    <span className="block text-lg font-semibold text-ink">{value}</span>
                  </span>
                </>
              );
              return href ? (
                <a key={label} href={href} className="panel flex items-center gap-4 p-4 transition-all hover:-translate-y-0.5 hover:border-accent/40">
                  {body}
                </a>
              ) : (
                <div key={label} className="panel flex items-center gap-4 p-4">
                  {body}
                </div>
              );
            })}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="panel !bg-surface p-6 shadow-[0_30px_80px_-40px_rgb(var(--accent)/0.5)] sm:p-8">
              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="sent"
                    className="py-12 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 14 }}>
                      <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-emerald-500" />
                    </motion.div>
                    <h3 className="text-2xl font-bold">Message sent!</h3>
                    <p className="mt-2 text-muted">Thanks for reaching out. I'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    noValidate
                  >
                    {status === "error" && (
                      <div className="flex items-start gap-3 rounded-xl border border-danger/30 bg-danger/10 p-4">
                        <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
                        <p className="text-sm text-danger">
                          Failed to send message. Please try again or email me directly at {profile.email}.
                        </p>
                      </div>
                    )}
                    <div className="grid gap-5 md:grid-cols-2">
                      {field("name", "Your name", <input id="name" {...register("name")} className="field" placeholder="Jane Smith" autoComplete="name" />)}
                      {field("email", "Email", <input id="email" type="email" {...register("email")} className="field" placeholder="jane@company.com" autoComplete="email" />)}
                    </div>
                    {field("subject", "Subject", <input id="subject" {...register("subject")} className="field" placeholder="What's this about?" />)}
                    {field("message", "Message", <textarea id="message" rows={5} {...register("message")} className="field resize-none" placeholder="Tell me about your project…" />)}
                    <button type="submit" disabled={isSubmitting} className="btn-accent w-full py-4">
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" /> Sending…
                        </>
                      ) : (
                        <>
                          <Send size={16} /> Send message
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
