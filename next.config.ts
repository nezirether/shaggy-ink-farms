import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/chickens", destination: "/poultry/the-flock", permanent: true },
      { source: "/eggs", destination: "/poultry/eggs", permanent: true },
      {
        source: "/poultry/hatching-eggs",
        destination: "/poultry/hatching-eggs-and-stock",
        permanent: true,
      },
      { source: "/farm-journal", destination: "/journal", permanent: true },
      {
        source: "/farm-journal/:slug",
        destination: "/journal/:slug",
        permanent: true,
      },
      { source: "/learn/garden-planning", destination: "/plan", permanent: true },
      { source: "/learn/know-your-growing-zone", destination: "/learn/zones", permanent: true },
      { source: "/growing-guide", destination: "/learn", permanent: true },
      {
        source: "/growing-guide/zones/:zone",
        destination: "/learn/zones/:zone",
        permanent: true,
      },
      {
        source: "/growing-guide/local/:slug",
        destination: "/learn/local/:slug",
        permanent: true,
      },
      {
        source: "/garden-planner",
        destination: "/plan/garden-planner",
        permanent: true,
      },
      {
        source: "/homestead-projects",
        destination: "/journal?category=builds-projects",
        permanent: true,
      },
      { source: "/youtube", destination: "/watch", permanent: true },
      { source: "/garden/cut-flowers", destination: "/flowers", permanent: true },
    ];
  },
};

export default nextConfig;
