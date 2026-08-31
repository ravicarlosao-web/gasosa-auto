import nergyImg3 from "@assets/IMG_20250903_113401_1780387574299.jpg";
import nergyImg4 from "@assets/IMG_20250903_111532_1780387597136.jpg";
import nergyImg5 from "@assets/1000015282_1780387656692.jpg";
import nergyImg6 from "@assets/WhatsApp_Image_2025-09-03_at_11.33.28_(2)_1780387695350.jpeg";
import historiaHuamboImg from "@assets/WhatsApp_Image_2026-08-17_at_19.35.54_1786993459379.jpeg";
import lubangoExpansionImg from "@assets/WhatsApp_Image_2026-08-31_at_13.01.40_1788178460544.jpeg";
import luandaPresenceImg from "@assets/WhatsApp_Image_2026-08-31_at_13.28.25_1788179389141.jpeg";
import automovelSectorImg from "@assets/WhatsApp_Image_2026-08-25_at_12.16.49_1787656706644.jpeg";
import industrialSectorImg from "@assets/WhatsApp_Image_2026-08-26_at_14.11.13_1787750854865.jpeg";

export const MILESTONE_STATIC = [
  { year: "2004", image: historiaHuamboImg },
  { year: "2016", image: lubangoExpansionImg },
  { year: "2026", image: luandaPresenceImg },
];

export const SECTORES_DATA = [
  {
    key: "automovel",
    name: "Automóvel",
    subtitle: "",
    description:
      "Fornecemos peças, acessórios e lubrificantes de alta performance para veículos ligeiros, pesados e industriais. Com marcas de referência internacional como Nergytech, Petronas, Castrol e Galp, garantimos qualidade e durabilidade em cada produto — para frotas empresariais e particulares.",
    tagline: "Alta performance para cada veículo",
    thumbnail: automovelSectorImg,
    image: automovelSectorImg,
  },
  {
    key: "agricola",
    name: "Agrícola",
    subtitle: "Equipamentos que trabalham tanto quanto o agricultor",
    description:
      "Apoiamos o desenvolvimento do sector rural angolano com máquinas, ferramentas e equipamentos agrícolas de alta durabilidade. Através da nossa marca própria Pangulino, oferecemos produtos desenvolvidos para as condições do campo angolano — robustos, fiáveis e acessíveis.",
    tagline: "Soluções para o campo angolano",
    thumbnail: "/agricola-sector.png",
    image: "/agricola-sector.png",
  },
  {
    key: "industrial",
    name: "Industrial",
    subtitle: "",
    description:
      "Soluções para operações industriais.\n\nLubrificantes, materiais de manutenção e ferramentas para diferentes aplicações industriais. Soluções fiáveis, com disponibilidade e suporte especializado.",
    tagline: "",
    thumbnail: industrialSectorImg,
    image: industrialSectorImg,
  },
] as const;

export const NOTICIAS_IMGS = [nergyImg3, nergyImg4, nergyImg5, nergyImg6];
