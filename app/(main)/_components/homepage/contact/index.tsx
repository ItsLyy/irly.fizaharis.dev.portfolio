/**
 * Custom Modules
 */
import MediaSocials from "../../media-socials";
import Form from "./form";

const Contact = () => {
  return (
    <section id="contact" className="scroll-mt-16 space-y-6 pt-2">
      <div className="border-border/60 flex items-center gap-2 border-b pb-2 font-mono text-xs font-semibold tracking-wider uppercase">
        <span className="text-accent">[CONTACT]</span>
        <h2 className="text-faint">LET&apos;S CONNECT</h2>
      </div>
      <header className="space-y-4">
        <div>
          <h3 className="text-foreground text-xl font-medium">
            Have an idea worth building?
          </h3>
          <p className="text-muted mt-1 text-sm leading-relaxed">
            I&apos;m currently available for full-stack engineering roles,
            high-impact contract work, and custom digital product development.
            Let&apos;s discuss how we can build something valuable together.
          </p>
        </div>
        <MediaSocials className="w-fit" />
      </header>
      <Form />
    </section>
  );
};

export default Contact;
