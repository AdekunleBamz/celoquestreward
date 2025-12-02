/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Exclude test files and unnecessary files from bundling
    config.module.rules.push({
      test: /\.test\.(js|mjs|ts|tsx)$/,
      loader: 'ignore-loader'
    })
    
    config.module.rules.push({
      test: /node_modules\/thread-stream\/(test|bench)/,
      loader: 'ignore-loader'
    })

    // Fix for WalletConnect issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        encoding: false,
      }
    }

    return config
  },
  // Disable Turbopack (use webpack instead)
  experimental: {
    turbo: undefined,
  },
}

module.exports = nextConfig
