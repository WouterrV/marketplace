/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'loremflickr.com',
            },
        ],
    },
}

module.exports = nextConfig
