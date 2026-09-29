const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// ============================================================================
// Majestic Travel Favicon Generation
// Brand Colors:
// - Deep Majestic Navy: #26345C (and #1E2A4A)
// - Radiant Amber/Gold: #F9B82E (and #FFD269)
// - Pure High-Contrast White: #FFFFFF
//
// Symbolism:
// - Luxury Navy squircle with Gold accent border (stands out on dark & light tabs)
// - Bold, elegant 'M' Monogram (Majestic) in Gold
// - Interlocking 'T' Monogram (Travel) + North Star Navigation Needle in Crisp White
// ============================================================================

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#283760"/>
      <stop offset="100%" stop-color="#19233D"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFD466"/>
      <stop offset="100%" stop-color="#F9B82E"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Container: Deep Navy Squircle with Gold Border for perfect visibility on all tab themes -->
  <rect x="5" y="5" width="118" height="118" rx="28" fill="url(#bgGrad)" stroke="#F9B82E" stroke-width="5"/>

  <!-- Compass / North Star at top in Crisp White -->
  <g filter="url(#shadow)">
    <polygon points="64,15 67,23 75,25 68,29 70,37 64,32 58,37 60,29 53,25 61,23" fill="#FFFFFF"/>
  </g>

  <!-- Bold 'M' (Majestic) in warm radiant Gold -->
  <g filter="url(#shadow)">
    <path d="M 23,96 L 23,36 L 43,65 L 64,43 L 85,65 L 105,36 L 105,96 L 89,96 L 89,61 L 74,77 L 54,77 L 39,61 L 39,96 Z" fill="url(#goldGrad)"/>
  </g>

  <!-- 'T' (Travel) Monogram & Compass Mast in Pure White -->
  <g filter="url(#shadow)">
    <path d="M 44,35 L 84,35 L 84,45 L 70,45 L 70,89 L 58,89 L 58,45 L 44,45 Z" fill="#FFFFFF"/>
  </g>

  <!-- Center Navigational Pivot -->
  <circle cx="64" cy="56" r="3" fill="#283760"/>
  <circle cx="64" cy="56" r="1.5" fill="#F9B82E"/>
</svg>`;

// Standard ICO file generator from PNG buffers
function createIco(pngBuffers) {
  const count = pngBuffers.length;
  // Header: 6 bytes
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(count, 4);

  // Directory entries: 16 bytes each
  const entries = [];
  let currentOffset = 6 + 16 * count;

  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // colors
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8);
    entry.writeUInt32LE(currentOffset, 12);
    entries.push(entry);
    currentOffset += item.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers.map(p => p.buffer)]);
}

async function run() {
  const rootDir = path.resolve(__dirname, '..');
  const appDir = path.join(rootDir, 'src', 'app');
  const publicDir = path.join(rootDir, 'public');

  // 1. Generate PNGs at required resolutions
  const png16 = await sharp(Buffer.from(svgContent)).resize(16, 16).png().toBuffer();
  const png32 = await sharp(Buffer.from(svgContent)).resize(32, 32).png().toBuffer();
  const png48 = await sharp(Buffer.from(svgContent)).resize(48, 48).png().toBuffer();
  const png180 = await sharp(Buffer.from(svgContent)).resize(180, 180).png().toBuffer(); // apple-touch-icon
  const png192 = await sharp(Buffer.from(svgContent)).resize(192, 192).png().toBuffer(); // android-chrome-192
  const png512 = await sharp(Buffer.from(svgContent)).resize(512, 512).png().toBuffer(); // android-chrome-512

  // Multi-resolution ICO (16x16, 32x32, 48x48)
  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
  ]);

  // 2. Write files to src/app (App Router convention)
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'icon.svg'), svgContent);
  fs.writeFileSync(path.join(appDir, 'icon.png'), png32);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), png180);

  // 3. Write files to public/ (Direct static serving fallback)
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent);
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent);
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), png16);
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), png32);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);
  fs.writeFileSync(path.join(publicDir, 'android-chrome-192x192.png'), png192);
  fs.writeFileSync(path.join(publicDir, 'android-chrome-512x512.png'), png512);

  // 4. Remove default Vercel svg if present
  const vercelSvg = path.join(publicDir, 'vercel.svg');
  if (fs.existsSync(vercelSvg)) {
    fs.unlinkSync(vercelSvg);
    console.log('Removed vercel.svg from public/');
  }

  // 5. Create webmanifest for PWA / Android / bookmarks
  const manifest = {
    name: 'Majestic Voyages',
    short_name: 'Majestic Travel',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    theme_color: '#26345C',
    background_color: '#26345C',
    display: 'standalone'
  };
  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));

  console.log('All Majestic Travel favicons and icons successfully generated!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
