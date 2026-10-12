// Add real clients here. Save each logo in client/public/logos/.
//
//   name      alt text, and the label shown beside the logo when showName is true
//   logo      path to the file in public/logos/. Leave it out to show the name as text for now.
//   url       optional: makes the entry a link (opens in a new tab)
//   original  true for coloured logos or logos with a solid background (shown as they are)
//             leave it out for white-friendly logos on a transparent background (turned white)
//   showName  true for icon-only logos, to show the business name next to the icon
//   serif     true to show a name-only entry in a serif typeface
//
// While this list is empty, the Trusted by bar shows placeholder labels.
export const clients = [
  {
    name: "BusinessHub",
    logo: "/logos/businesshub.png",
    url: "https://businesshubng.vercel.app",
    original: true,
    showName: true,
  },
  {
    name: "PrimeHomes",
    logo: "/logos/primehomes.svg",
    url: "https://primehomesestate.vercel.app",
    original: true,
    showName: true,
  },
  {
    name: "Verve Store",
    logo: "/logos/verve.svg",
    url: "https://vervestore.vercel.app",
    original: true,
    showName: true,
  },
  {
    // Recreated from the amber "S" mark on the Sacred Touch site. Replace with the real file if you have one.
    name: "Sacred Touch Schools",
    logo: "/logos/sacred-touch.png",
    url: "https://sacredtouchschools.vercel.app",
    original: true,
    showName: true,
  },
];
