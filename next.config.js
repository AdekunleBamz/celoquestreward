/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use stable webpack instead of experimental Turbopack
  reactStrictMode: true,
  // Add empty turbopack config to acknowledge we have webpack config
  turbopack: {},
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        http: false,
        https: false,
        zlib: false,
        path: false,
        os: false,
      }
    }
    
    // Handle optional peer dependencies from @wagmi/connectors
    config.resolve.alias = {
      ...config.resolve.alias,
      '@base-org/account': false,
      '@gemini-wallet/core': false,
      '@metamask/sdk': false,
      'porto': false,
      '@safe-global/safe-apps-sdk': false,
      '@safe-global/safe-apps-provider': false,
    }
    
    return config
  },
}

module.exports = nextConfig
