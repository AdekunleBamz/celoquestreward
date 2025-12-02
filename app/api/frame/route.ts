import { NextRequest, NextResponse } from 'next/server'

const FRAME_URL = 'https://celoquestreward.vercel.app'

export async function GET() {
  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${FRAME_URL}/api/frame-image" />
    <meta property="fc:frame:button:1" content="Start Earning" />
    <meta property="fc:frame:post_url" content="${FRAME_URL}/api/frame" />
    <meta property="og:image" content="${FRAME_URL}/api/frame-image" />
    <meta property="og:title" content="CeloQuest Rewards" />
  </head>
  <body></body>
</html>`
  
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  
  // Return a new frame that redirects to the app
  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${FRAME_URL}/api/frame-image" />
    <meta property="fc:frame:button:1" content="Open App" />
    <meta property="fc:frame:button:1:action" content="link" />
    <meta property="fc:frame:button:1:target" content="${FRAME_URL}" />
  </head>
  <body></body>
</html>`

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}
