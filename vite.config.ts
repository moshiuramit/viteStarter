
// vite.config.js
import { resolve } from "path";
import { defineConfig, PluginOption } from "vite";


const fullReloadAlways: PluginOption = {
  name: 'full-reload-always',
  handleHotUpdate({ server }) {
    server.ws.send({ type: "full-reload" })
    return []
  },
} as PluginOption

export default defineConfig({
  plugins: [
    fullReloadAlways,
    // ViteMinifyPlugin({
    //   exclude: [/\.html$/]
    // }),

  ],
  base: "./", // Ensures relative paths for assets
	root: "src",
	publicDir: "public",
  css: {
    devSourcemap: true // this one
  },
  build: {
    outDir: "../dist",
		assetsDir: "assets",
		emptyOutDir: true,
    //minify: false, // Disable Minification for Now 
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        about: resolve(__dirname, "src/about.html"),
      },
    },
  },
  server: {
    open: "/", // Ensure the dev server opens the index file at the root
    watch: {
      // usePolling: true,
    },
    // watch: {
    //   // Add custom paths to watch for full page refreshes
    //   additionalPaths: (watcher) => {
    //     watcher.add('src/scss/**.scss');
    //   }
    // }
  }
});
