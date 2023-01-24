/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    experimental: {
        appDir: true,
    },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'loremflickr.com',
            },
            {
                protocol: 'https',
                hostname: '*.storage.eu-central-1.nhost.run',
            },
        ],
    },
}

module.exports = nextConfig
