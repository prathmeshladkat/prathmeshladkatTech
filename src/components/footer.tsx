import { Button } from "./ui/button";

const Footer = () => {
  return (
    <section className="mt-8 mb-16">
      <div className="w-full mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto text-center px-6">
          <Button>contact</Button>
          <span
            className="font-bold mb-2 leading-tight text-gray-900 dark:text-white whitespace-nowrap block mt-2"
            style={{ fontSize: "48px" }}
          >
            Get in touch
          </span>
          <h2
            className="text-gray-900 dark:text-gray-300 leading-relaxed mb-8"
            style={{ fontSize: "20px" }}
          >
            Want to chat? Just shoot me a dm with a direct question on twitter
            and I&apos;ll respond whenever I can. I will ignore all soliciting.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Footer;
