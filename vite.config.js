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
        blog: resolve(__dirname, "blog.html"),
        antarctica: resolve(__dirname, "blog-post-antarctica.html"),
        mardigras: resolve(__dirname, "blog-post-mardigras.html"),
        newzealand: resolve(__dirname, "blog-post-newzealand.html"),
        romaniaCastles: resolve(__dirname, "blog-post-romania-castles.html"),
        patagonia: resolve(__dirname, "blog-post-patagonia.html"),
        photography: resolve(__dirname, "blog-post-photography.html"),
        vietnam: resolve(__dirname, "blog-post-vietnam.html"),

        contact: resolve(__dirname, "contact.html"),
        destinations: resolve(__dirname, "destinations.html"),
        gear: resolve(__dirname, "gear.html"),
        photographyPage: resolve(__dirname, "photography.html"),
        story: resolve(__dirname, "story.html"),
        profile: resolve(__dirname, "profile.html"),
      },
    },
  },
});
