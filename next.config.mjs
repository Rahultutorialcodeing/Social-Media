/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'scontent.cdninstagram.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'instagram.famd15-1.fna.fbcdn.net',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'scontent-cgk2-1.cdninstagram.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'scontent-gmp1-1.cdninstagram.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.bagteshfashion.com',
                pathname: '/**',
            }

        ]
    }
};

export default nextConfig;
