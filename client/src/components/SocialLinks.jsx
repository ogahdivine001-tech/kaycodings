import { socials } from "../lib/socials.js";

export default function SocialLinks({ className = "" }) {
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {socials.map(({ name, icon: Icon, url }) => {
        const external = url.startsWith("http");
        return (
          <li key={name}>
            <a
              href={url}
              aria-label={name}
              title={name}
              data-cursor="open"
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-gradient text-white hover:brightness-110 hover:-translate-y-0.5 transition-all"
            >
              <Icon size={18} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
