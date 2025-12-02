import { NextRequest, NextResponse } from 'next/server'

const FRAME_URL = process.env.NEXT_PUBLIC_FRAME_URL || 'https://celoquestreward.vercel.app'

export async function GET() {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${FRAME_URL}/frame-image.png" />
        <meta property="fc:frame:button:1" content="🎁 Start Earning CELO" />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta property="fc:frame:button:1:target" content="${FRAME_URL}" />
        <meta property="og:image" content="${FRAME_URL}/frame-image.png" />
        <meta property="og:title" content="CeloQuest Rewards - Earn CELO Daily" />
        <meta property="og:description" content="Complete tasks, earn points, claim CELO rewards on Celo blockchain" />
      </head>
      <body>
        <h1>CeloQuest Rewards</h1>
        <p>Earn CELO by completing daily tasks!</p>
      </body>
    </html>
  `
  
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ message: 'Frame action received' })
}
