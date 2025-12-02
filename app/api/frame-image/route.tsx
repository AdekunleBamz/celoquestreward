import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#10b981',
          backgroundImage: 'linear-gradient(to bottom right, #10b981, #14b8a6)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 20,
            }}
          >
            🎁 CeloQuest Rewards
          </div>
          <div
            style={{
              fontSize: 40,
              color: '#d1fae5',
              textAlign: 'center',
              maxWidth: 800,
            }}
          >
            Earn CELO Daily • Complete Tasks • Get Rewards
          </div>
          <div
            style={{
              fontSize: 32,
              color: 'white',
              marginTop: 40,
              padding: '20px 40px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 16,
            }}
          >
            Click below to start earning! 👇
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
