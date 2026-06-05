import { motion } from "framer-motion";
import angolaMapRaw from "@assets/angola_1780611247454.svg?raw";

export function AngolaMap() {
  const Y = "#F5A000";

  const styledSvg = angolaMapRaw
    .replace(
      'width="612.3866" height="684.8916"',
      'viewBox="0 0 612.3866 684.8916" width="100%" style="display:block;height:auto;"'
    )
    .replace(
      /(<svg[^>]*>)/,
      '$1<style>' +
        'path{fill:#003591;stroke:rgba(255,255,255,0.18);stroke-width:0.6;stroke-linejoin:round;}' +
        'path#AO-LUA{fill:#F5A000;}' +
        'path#AO-HUA{fill:#F5A000;}' +
        'path#AO-HUI{fill:#F5A000;}' +
      '</style>'
    );

  const cities = [
    { id: "Luanda",  cx: 81,  cy: 228, label: "LUANDA",  pillW: 74 },
    { id: "Huambo",  cx: 199, cy: 408, label: "HUAMBO",  pillW: 78 },
    { id: "Lubango", cx: 163, cy: 522, label: "HUÍLA",   pillW: 66 },
  ] as const;

  return (
    <motion.div
      style={{ position: "relative", width: "100%" }}
      initial={{ opacity: 0, x: 28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <div dangerouslySetInnerHTML={{ __html: styledSvg }} />

      <svg
        viewBox="0 0 612.3866 684.8916"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {cities.map(({ id, cx, cy, label, pillW }) => (
          <g key={id}>
            <circle cx={cx} cy={cy} r={6} fill={Y} />
            <circle cx={cx} cy={cy} r={2.5} fill="#111111" />
            <rect x={cx - pillW / 2} y={cy + 11} width={pillW} height={21} rx={10.5} fill={Y} />
            <text x={cx} y={cy + 25.5} textAnchor="middle" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="700" fill="#111111" letterSpacing="0.08em">
              {label}
            </text>
          </g>
        ))}
      </svg>
    </motion.div>
  );
}
