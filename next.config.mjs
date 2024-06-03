/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wowfy.in',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: '192.168.1.9',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: '172.20.10.4',
        port: '',
        pathname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Specify the source path pattern
        destination: 'https://wowfy.in/doutya_ambition/api/:path*', // Corrected the destination to include /api/
      },
    ];
  },
  // output: "export",
};

export default nextConfig;
