const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "..", "public", "images");
fs.mkdirSync(outDir, { recursive: true });

async function solid(name, w, h, color, overlay) {
  const base = sharp({
    create: {
      width: w,
      height: h,
      channels: 3,
      background: color,
    },
  });

  if (!overlay) {
    await base.jpeg({ quality: 88 }).toFile(path.join(outDir, name));
    return;
  }

  const svg = Buffer.from(`
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${overlay.from}" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="${overlay.to}" stop-opacity="0.15"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <g fill="none" stroke="#C5A073" stroke-width="1.2" opacity="0.45">
        <path d="M${w * 0.72} ${h * 0.15} C ${w * 0.55} ${h * 0.35}, ${w * 0.78} ${h * 0.55}, ${w * 0.62} ${h * 0.78}"/>
        <path d="M${w * 0.72} ${h * 0.15} C ${w * 0.85} ${h * 0.4}, ${w * 0.7} ${h * 0.6}, ${w * 0.8} ${h * 0.82}"/>
      </g>
    </svg>
  `);

  await base
    .composite([{ input: svg, blend: "over" }])
    .jpeg({ quality: 90 })
    .toFile(path.join(outDir, name));
}

async function cropFromRef(ref, name, region) {
  const input = path.join(outDir, ref);
  if (!fs.existsSync(input)) return false;
  const meta = await sharp(input).metadata();
  const left = Math.floor(region.left * meta.width);
  const top = Math.floor(region.top * meta.height);
  const width = Math.min(Math.floor(region.width * meta.width), meta.width - left);
  const height = Math.min(Math.floor(region.height * meta.height), meta.height - top);
  await sharp(input)
    .extract({ left, top, width, height })
    .resize(900, 1200, { fit: "cover" })
    .jpeg({ quality: 90 })
    .toFile(path.join(outDir, name));
  return true;
}

(async () => {
  // Soft botanical placeholders matching the palette
  await solid("placeholder-soft.jpg", 900, 1100, "#EDE7DB", {
    from: "#C5A073",
    to: "#1A3C34",
  });
  await solid("placeholder-green.jpg", 900, 700, "#D8E0DA", {
    from: "#1A3C34",
    to: "#C5A073",
  });
  await solid("placeholder-warm.jpg", 900, 700, "#E8DFD0", {
    from: "#C5A073",
    to: "#F5F2EB",
  });
  await solid("article-1.jpg", 800, 560, "#E6EFE8", { from: "#1A3C34", to: "#C5A073" });
  await solid("article-2.jpg", 800, 560, "#EFE6DA", { from: "#C5A073", to: "#1A3C34" });
  await solid("article-3.jpg", 800, 560, "#E9E4D8", { from: "#A8885A", to: "#2A4F45" });
  await solid("article-4.jpg", 800, 560, "#E2EBE4", { from: "#2A4F45", to: "#C5A073" });
  await solid("article-5.jpg", 800, 560, "#F0EADF", { from: "#C5A073", to: "#16332E" });
  await solid("article-6.jpg", 800, 560, "#E7ECDF", { from: "#1A3C34", to: "#D4B896" });
  await solid("service-1.jpg", 700, 480, "#E8EFE9", { from: "#1A3C34", to: "#C5A073" });
  await solid("service-2.jpg", 700, 480, "#EFE6DC", { from: "#C5A073", to: "#1A3C34" });
  await solid("service-3.jpg", 700, 480, "#E5EBE3", { from: "#2A4F45", to: "#C5A073" });
  await solid("service-4.jpg", 700, 480, "#EDE4D6", { from: "#A8885A", to: "#16332E" });
  await solid("office.jpg", 1000, 700, "#E8E2D6", { from: "#C5A073", to: "#1A3C34" });
  await solid("vase.jpg", 800, 1000, "#E9E4DA", { from: "#C5A073", to: "#2A4F45" });
  await solid("clinic-exterior.jpg", 900, 650, "#E4E8E2", { from: "#1A3C34", to: "#C5A073" });
  await solid("plant.jpg", 600, 500, "#DDE6DF", { from: "#1A3C34", to: "#C5A073" });
  await solid("featured.jpg", 900, 700, "#E8EEE8", { from: "#2A4F45", to: "#C5A073" });

  // Try extracting portrait regions from full-page references
  const refs = [
    ["ref-home.jpg", "doctor-home.jpg", { left: 0.08, top: 0.08, width: 0.84, height: 0.28 }],
    ["ref-about.jpg", "doctor-about.jpg", { left: 0.08, top: 0.08, width: 0.84, height: 0.28 }],
    ["ref-approach.jpg", "doctor-approach.jpg", { left: 0.08, top: 0.08, width: 0.84, height: 0.26 }],
    ["ref-contact.jpg", "doctor-contact.jpg", { left: 0.08, top: 0.08, width: 0.84, height: 0.26 }],
    ["ref-services.jpg", "doctor-services.jpg", { left: 0.08, top: 0.42, width: 0.84, height: 0.18 }],
  ];

  for (const [ref, name, region] of refs) {
    try {
      await cropFromRef(ref, name, region);
      console.log("cropped", name);
    } catch (e) {
      console.log("skip", name, e.message);
    }
  }

  console.log("done");
})();
