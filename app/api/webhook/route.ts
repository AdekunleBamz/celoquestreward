// Farcaster Frame Webhook
// Handles frame interactions and returns the next frame

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log('Farcaster Webhook Received:', body)

    // Validate the frame message
    // Note: Add your validation logic here for production
    // const { isValid, message } = await getFrameMessage(body);
    // if (!isValid) {
    //   return new NextResponse('Invalid Frame', { status: 400 });
    // }
    
    // Here you can handle different button clicks
    // const buttonIndex = message.button;
    // switch (buttonIndex) {
    //   case 1:
    //     // Handle button 1 click
    //     break;
    //   case 2:
    //     // Handle button 2 click
    //     break;
    // }

    // For now, we'll return a simple frame
    const frame = {
      'fc:frame': 'vNext',
      'fc:frame:image': 'https://celoquestreward.vercel.app/og-image.png',
      'fc:frame:button:1': 'Open App',
      'fc:frame:button:1:action': 'link',
      'fc:frame:button:1:target': 'https://celoquestreward.vercel.app',
    }

    const headers = {
      'Content-Type': 'text/html',
    }

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>CeloQuest Frame</title>
          <meta property="og:title" content="CeloQuest Frame" />
          ${Object.entries(frame).map(([key, value]) => `<meta property="${key}" content="${value}" />`).join('\n')}
        </head>
        <body>
          <h1>Welcome to CeloQuest!</h1>
          <p>Open the app to start your quest.</p>
        </body>
      </html>
    `

    return new NextResponse(html, { status: 200, headers })
  } catch (error) {
    console.error('Farcaster Webhook Error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
