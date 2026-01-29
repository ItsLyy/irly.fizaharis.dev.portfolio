import MediaSocials from "../../media-socials";
import Form from "./form";

const Contact = () => {
  return (
    <section className="space-y-8">
      <header className="space-y-6">
        <div>
          <h3 className="text-xl font-medium">Let's Connect</h3>
          <p className="text-app-200">
            I’m currently looking for new opportunities, my inbox is always
            open.
          </p>
        </div>
        <MediaSocials className="w-fit" />
      </header>
      <Form />
    </section>
  );
};

export default Contact;
