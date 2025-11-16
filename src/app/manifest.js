export default function manifest() {
  return {
    name: "Deshfix",
    short_name: "Deshfix",
    description: "Deshfix - Lets Fix Bharat",
    start_url: "/",
    display: "standalone",
    theme_color: "#fef7e1",
    background_color: "#001331",
    icons: [
      {
        purpose: "maskable",
        sizes: "512x512",
        src: "/icon512_maskable.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "512x512",
        src: "/icon512_rounded.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "16x16",
        src: "/favicon-16x16.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "32x32",
        src: "/favicon-32x32.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "192x192",
        src: "/android-chrome-192x192.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "512x512",
        src: "/android-chrome-512x512.png",
        type: "image/png",
      },
    ],
  };
}
