import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const FRAME_URL = 'https://celoquestreward.vercel.app'
  
  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${FRAME_URL}/api/frame-image" />
    <meta property="fc:frame:button:1" content="Start Earning CELO" />
    <meta property="fc:frame:button:1:action" content="link" />
    <meta property="fc:frame:button:1:target" content="${FRAME_URL}" />
    <meta property="og:image" content="${FRAME_URL}/api/frame-image" />
    <meta property="og:title" content="CeloQuest Rewards" />
    <meta property="og:description" content="Earn CELO by completing daily tasks" />
  </head>
  <body>
    <h1>CeloQuest Rewards</h1>
  </body>
</html>`
  
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}
