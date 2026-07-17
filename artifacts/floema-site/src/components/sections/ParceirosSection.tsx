import { motion } from "framer-motion";
import logoCarrinho  from "@assets/image_1780391470570.png";
import logoSucoma    from "@assets/image_1780391556771.png";
import logoNoble     from "@assets/image_1_1780391743801.png";
import logoAgt       from "@assets/image_2_1780391759740.png";
import logoCfm       from "@assets/image_3_1780391778427.png";
import logoJmas      from "@assets/image_4_1780391793814.png";
import logoBioprev   from "@assets/image_1780391882163.png";
import logoYoba      from "@assets/image_6_1780392078746.png";
import logoAldeia      from "@assets/image_1780392699971.png";
import logoHma         from "@assets/image_1780392954482.png";
import logoOcolil      from "@assets/image_1780393050404.png";
import logoTchissola   from "@assets/ChatGPT_Image_2_de_jun._de_2026,_10_37_44_1_1780393102918.png";
import logoSonangalp   from "@assets/image_8_1780393190380.png";
import logoGranisul    from "@assets/image_9_1780393311051.png";
import logoWix         from "@assets/image_1780393362613.png";
import logoLubafrica   from "@assets/image_10_1780393567039.png";
import logoJambo       from "@assets/image_11_1780393653615.png";
import logoGroup2      from "@assets/Group_2_1780393968510.png";
import logoAngostone   from "@assets/image_13_1780394045997.png";
import logoAndaimes    from "@assets/image_1780394305539.png";
import logoLiberatos   from "@assets/Gemini_Generated_Image_ddemvbddemvbddem_1_1780394376935.png";
import logoGirassol      from "@assets/image_1780394586799.png";
import logoPumangol      from "@assets/image_15_1780394660962.png";
import logoAngola        from "@assets/image_1780394698602.png";
import logoPlanasul      from "@assets/image_16_1780394769545.png";
import logoMetalosul     from "@assets/image_17_1780394882779.png";
import logoBoiVerde      from "@assets/image_18_1780395087642.png";
import logoOuroVerde     from "@assets/image_19_1780395214382.png";
import logoTchimbolelo   from "@assets/{A6CD87C3-8D82-402E-9926-B0F1BC28201C}_1_1780395413717.png";
import logoAdra          from "@assets/image_20_1780395539424.png";
import logoProTuning     from "@assets/image_22_1780395677753.png";
import { useLang } from "../../i18n";
import { FADE_UP, REVEAL_ROW } from "../../lib/motion-variants";

type PartnerItem = { name: string; logo: string };

const PARCEIROS_ROW1: PartnerItem[] = [
  { name: "Carrinho",             logo: logoCarrinho   },
  { name: "Sonangalp",            logo: logoSonangalp  },
  { name: "Noble Group",          logo: logoNoble      },
  { name: "Lubafrica",            logo: logoLubafrica  },
  { name: "AGT",                  logo: logoAgt        },
  { name: "Aldeia Nova",          logo: logoAldeia     },
  { name: "JMAS",                 logo: logoJmas       },
  { name: "Jambo",                logo: logoJambo      },
  { name: "BioPrev",              logo: logoBioprev    },
  { name: "Fazenda Boi Verde",    logo: logoBoiVerde   },
  { name: "Fazenda Ouro Verde",   logo: logoOuroVerde  },
];

const PARCEIROS_ROW2: PartnerItem[] = [
  { name: "Hipermaquinas Angola", logo: logoHma        },
  { name: "CFM",                  logo: logoCfm        },
  { name: "Granisul",             logo: logoGranisul   },
  { name: "Angostone",            logo: logoAngostone  },
  { name: "Sucoma",               logo: logoSucoma     },
  { name: "WIX Filters",          logo: logoWix        },
  { name: "Andaimes Carvalho",    logo: logoAndaimes   },
  { name: "Jardins da Yoba",      logo: logoYoba       },
  { name: "OCOLIL",               logo: logoOcolil     },
  { name: "Fazenda Tchimbolelo",  logo: logoTchimbolelo},
  { name: "ADRA",                 logo: logoAdra       },
];

const PARCEIROS_ROW3: PartnerItem[] = [
  { name: "Grupo Liberatos",      logo: logoLiberatos  },
  { name: "Fazenda Tchissola",    logo: logoTchissola  },
  { name: "Group 2",              logo: logoGroup2     },
  { name: "Fazenda Girassol",     logo: logoGirassol   },
  { name: "Pumangol",             logo: logoPumangol   },
  { name: "Angola",               logo: logoAngola     },
  { name: "Planasul",             logo: logoPlanasul   },
  { name: "Metalosul",            logo: logoMetalosul  },
  { name: "ProTuning",            logo: logoProTuning  },
];

function LogoChip({ item }: { item: PartnerItem }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 18px",
        background: "#ffffff",
        borderRadius: "12px",
        flexShrink: 0,
        boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
        border: "1px solid rgba(0,0,0,0.06)",
        height: "56px",
        minWidth: "90px",
        maxWidth: "190px",
      }}
    >
      <img
        src={item.logo}
        alt={item.name}
        style={{ height: "34px", width: "auto", maxWidth: "150px", objectFit: "contain", display: "block" }}
      />
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
  speed = "60s",
}: {
  items: PartnerItem[];
  direction: "rtl" | "ltr";
  speed?: string;
}) {
  const quad = [...items, ...items, ...items, ...items];
  const cls = direction === "rtl" ? "marquee-rtl" : "marquee-ltr";

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div
        className={cls}
        style={{ display: "flex", gap: "14px", width: "max-content", animationDuration: speed }}
      >
        {quad.map((item, i) => (
          <LogoChip key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

export function ParceirosSection() {
  const { t } = useLang();
  const viewport = { once: false, amount: 0.18 } as const;

  return (
    <section
      style={{
        background: "#ffffff",
        fontFamily: "'Poppins', sans-serif",
        paddingTop: "clamp(64px, 9vw, 120px)",
        paddingBottom: "clamp(72px, 10vw, 140px)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          paddingLeft: "clamp(20px, 5vw, 64px)",
          paddingRight: "clamp(20px, 5vw, 64px)",
          marginBottom: "clamp(44px, 6vw, 80px)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <motion.span
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            custom={0}
            style={{ display: "inline-block", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.16em", color: "#003591", marginBottom: "18px" }}
          >
            {t.parceiros.tag}
          </motion.span>
        </div>

        <div style={{ overflow: "hidden" }}>
          <motion.h2
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            custom={0.1}
            style={{ fontSize: "clamp(2rem, 1.4rem + 2.8vw, 4rem)", fontWeight: 700, color: "#111111", lineHeight: 1.08, letterSpacing: "-0.035em", margin: "0 0 18px" }}
          >
            {t.parceiros.heading}
          </motion.h2>
        </div>

        <div style={{ overflow: "hidden" }}>
          <motion.p
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            custom={0.22}
            style={{ fontSize: "clamp(0.93rem, 0.8rem + 0.5vw, 1.15rem)", color: "rgba(0,0,0,0.55)", lineHeight: 1.65, maxWidth: "560px", margin: 0 }}
          >
            {t.parceiros.subheading}
          </motion.p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {[
          { items: PARCEIROS_ROW1, dir: "rtl" as const, speed: "58s", delay: 0.0 },
          { items: PARCEIROS_ROW2, dir: "ltr" as const, speed: "48s", delay: 0.1 },
          { items: PARCEIROS_ROW3, dir: "rtl" as const, speed: "68s", delay: 0.2 },
        ].map(({ items, dir, speed, delay }, idx) => (
          <motion.div
            key={idx}
            variants={REVEAL_ROW}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            custom={delay}
          >
            <MarqueeRow items={items} direction={dir} speed={speed} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
