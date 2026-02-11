import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'qursor - iOS App Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#f5f5f7',
            letterSpacing: '-0.03em',
            marginBottom: 8,
          }}
        >
          qursor
        </div>
        <div
          style={{
            width: 60,
            height: 3,
            background: 'linear-gradient(90deg, #2997ff, #5ac8fa)',
            borderRadius: 2,
            marginBottom: 20,
          }}
        />
        <div
          style={{
            fontSize: 22,
            color: '#98989d',
            fontWeight: 400,
            letterSpacing: '0.05em',
          }}
        >
          iOS App Portfolio
        </div>
      </div>
    ),
    { ...size }
  );
}
