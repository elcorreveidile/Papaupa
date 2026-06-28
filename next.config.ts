import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Fija la raíz del proyecto (hay un lockfile suelto en el home que confundía la inferencia).
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
