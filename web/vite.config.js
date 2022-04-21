const { resolve } = require("path");
const { defineConfig } = require("vite");
const reactRefresh = require("@vitejs/plugin-react-refresh");

module.exports = defineConfig({
	root: resolve(__dirname, "./src/"),
	publicDir: resolve(__dirname, "./public/"),
	cacheDir: resolve(__dirname, "./cache/"),
	plugins: [reactRefresh()],
	server: {
		host: "0.0.0.0",
		proxy: {
			"/api": process.env.API_URL || "http://localhost:6969",
		},
	},
	build: {
		outDir: resolve(__dirname, "./dist/"),
		emptyOutDir: true,
		rollupOptions: {
			input: {
				root: resolve(__dirname, "./src/index.html"),
				app: resolve(__dirname, "./src/app/index.html"),
			},
		},
	},
});
