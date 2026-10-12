import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Github,
  Mail,
  MessageCircle,
} from "lucide-react";
import { whatsappLink, emailLink, WHATSAPP_NUMBER } from "./contact.js";

// Paste your real profile links below. An icon only shows once its url is filled in,
// so visitors never land on a wrong or empty page.
const whatsappReady = /^\d+$/.test(WHATSAPP_NUMBER);

const all = [
  {
    name: "WhatsApp",
    icon: MessageCircle,
    url: whatsappReady ? whatsappLink : "",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/kaycodings/",
  },
  { name: "X (Twitter)", icon: Twitter, url: "https://x.com/DivineOgah2008" },
  { name: "LinkedIn", icon: Linkedin, url: "" },
  { name: "Facebook", icon: Facebook, url: "" },
  { name: "YouTube", icon: Youtube, url: "" },
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/ogahdivine001-tech",
  },
  { name: "Email", icon: Mail, url: emailLink },
];

export const socials = all.filter((s) => s.url);
