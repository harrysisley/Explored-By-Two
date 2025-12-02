import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),

        // Add all your HTML pages
        blog: resolve(__dirname, "public/blog.html"),
        antarctica: resolve(__dirname, "public/blog-post-antarctica.html"),
        mardigras: resolve(__dirname, "public/blog-post-mardigras.html"),
        newzealand: resolve(__dirname, "public/blog-post-newzealand.html"),
        packing: resolve(__dirname, "public/blog-post-packing.html"),
        patagonia: resolve(__dirname, "public/blog-post-patagonia.html"),
        photography: resolve(__dirname, "public/blog-post-photography.html"),
        vietnam: resolve(__dirname, "public/blog-post-vietnam.html"),

        contact: resolve(__dirname, "public/contact.html"),
        destinations: resolve(__dirname, "public/destinations.html"),
        gear: resolve(__dirname, "public/gear.html"),
        photographyPage: resolve(__dirname, "public/photography.html"),
        story: resolve(__dirname, "public/story.html"),
        profile: resolve(__dirname, "public/profile.html"),
      },
    },
  },
});
