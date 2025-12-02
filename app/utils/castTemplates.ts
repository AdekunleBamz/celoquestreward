// Farcaster cast templates about Celo
export const castTemplates = [
  "Just discovered @Celo 🌱 The carbon-negative blockchain making crypto accessible to everyone! #Celo #Web3",
  "Building on @Celo because fast, cheap, and eco-friendly transactions matter! 🌍 #CeloBlockchain #DeFi",
  "Did you know @Celo is carbon-negative? Perfect for sustainable Web3 projects! 🌿 #GreenCrypto #Celo",
  "@Celo's mobile-first approach is bringing crypto to billions! 📱 The future of finance is here. #Celo #Crypto",
  "Love how @Celo makes sending crypto as easy as sending a text! 💚 #Celo #Web3",
  "Impressed by @Celo's focus on financial inclusion and sustainability! 🌍💚 #CeloBlockchain",
  "Building the future on @Celo - where green meets growth! 🌱 #Sustainability #Blockchain",
  "@Celo is proof that blockchain can be fast, cheap, AND eco-friendly! ♻️ #Celo #GreenTech",
  "Fell in love with @Celo's mission: prosperity for everyone, everywhere! 🌎 #Celo #FinancialInclusion",
  "Just completed my first transaction on @Celo! Lightning fast and eco-friendly! ⚡🌿 #Celo",
  "@Celo: Making regenerative finance a reality, not just a concept! 🌱💰 #ReFi #Celo",
  "The @Celo ecosystem is thriving! So many amazing dApps being built! 🚀 #Celo #Web3",
  "Sending stablecoins on @Celo costs pennies! This is how crypto should work! 💚 #Celo",
  "Why I chose @Celo: Mobile-first, carbon-negative, and inclusive by design! 📱🌍 #CeloBlockchain",
  "@Celo is bridging the gap between crypto and everyday users! This is the way! 🌉 #Celo",
  "Real talk: @Celo's validator network is one of the most decentralized out there! 💪 #Celo #Decentralization",
  "Building on @Celo because the community is amazing and supportive! 🤝 #CeloCommunity",
  "@Celo proves you don't have to choose between performance and sustainability! 🌿⚡ #GreenBlockchain",
  "Just staked my first $CELO! Contributing to network security while earning rewards! 💰 #Celo #Staking",
  "The future of money is mobile, accessible, and green - thank you @Celo! 📱🌱 #Celo #FutureOfFinance"
]

export function getRandomCastTemplate(): string {
  return castTemplates[Math.floor(Math.random() * castTemplates.length)]
}
