import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/

// console.log(import.meta);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target:
            env.VITE_REACT_APP_PROD === "true"
              ? "http://18.233.100.220:8080"
              : "http://localhost:8080", // Replace with your API endpoint
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          secure: false,
        },
      },
    },
  };
});

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": {
//         target: import.meta.env.VITE_REACT_APP_PROD
//           ? "http://18.233.100.220:8080"
//           : "http://localhost:8080", // Replace with your API endpoint
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ""),
//       },
//     },
//   },
// });
