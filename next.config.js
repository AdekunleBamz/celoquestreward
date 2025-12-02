/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {},
  
  // Externalize packages that cause SSR issues
  serverExternalPackages: ['pino', 'pino-pretty'],
  
  webpack: (config, { isServer }) => {
    // Client-side fallbacks for Node.js modules
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
      'pino-pretty': false,
      'lokijs': false,
      'encoding': false,
    }
    
    // Ignore pino-pretty warnings
    config.ignoreWarnings = [
      { module: /node_modules\/pino/ },
    ]
    
    // Handle WalletConnect packages that use browser APIs
    config.externals = config.externals || []
    if (isServer) {
      config.externals.push({
        'utf-8-validate': 'commonjs utf-8-validate',
        'bufferutil': 'commonjs bufferutil',
      })
    }
    
    return config
  },
}

module.exports = nextConfig
