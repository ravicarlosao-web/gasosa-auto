import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { NavLogo } from "../components/layout/NavLogo";
import infraHeroImg        from "@assets/20250903_123036_1780417176290.jpg";
import infraLubangoExt    from "@assets/20250903_123815_1780417632798.jpg";
import infraLubangoAerial from "@assets/20250903_124326_1780417637563.jpg";
import infraHuamboExt     from "@assets/20250903_124447_1780417641736.jpg";
import infraLuandaFachada from "@assets/WhatsApp_Image_2025-09-05_at_17.29.30_(2)_1780420633119.jpeg";
import infraLuandaLoja1   from "@assets/WhatsApp_Image_2025-09-05_at_17.29.31_1780420592748.jpeg";
import infraLuandaLoja2   from "@assets/WhatsApp_Image_2025-09-05_at_17.29.32_(5)_1780420596544.jpeg";
import infraLuandaOfic1   from "@assets/WhatsApp_Image_2025-09-05_at_17.29.31_(6)_1780420686105.jpeg";
import infraFuturas       from "@assets/20250903_123030_1780417662829.jpg";
import nergyImg3 from "@assets/IMG_20250903_113401_1780387574299.jpg";
import nergyImg4 from "@assets/IMG_20250903_111532_1780387597136.jpg";
import nergyImg5 from "@assets/1000015282_1780387656692.jpg";
import nergyImg6 from "@assets/WhatsApp_Image_2025-09-03_at_11.33.28_(2)_1780387695350.jpeg";
import { LazyImage } from "../components/ui/lazy-image";
import { NavThemeCtx } from "../lib/nav-theme";
import { NavPill } from "../components/layout/NavPill";
import { LangDropdown } from "../components/layout/LangDropdown";
import { MobileMenu } from "../components/layout/MobileMenu";
import { Footer } from "../components/layout/Footer";
import { useLang } from "../i18n";
import { useSEO } from "../lib/use-seo";

type NoticiaBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "image"; src: string; caption?: string };

const NOTICIAS_ARTICLES: {
  img: string;
  categoria: string;
  titulo: string;
  resumo: string;
  data: string;
  featured?: boolean;
  conteudo: NoticiaBlock[];
}[] = [
  {
    img: infraHeroImg,
    categoria: "Institucional",
    titulo: "Gasosa Auto Agro inaugura nova instalação no Huambo",
    resumo: "A nova estrutura no Huambo reforça a capacidade de resposta nas províncias do planalto central, com mais de 3 000 m² dedicados a armazém, loja e oficina.",
    data: "3 de Junho de 2026",
    featured: true,
    conteudo: [
      { type: "paragraph", text: "A inauguração das novas instalações no Huambo marca um passo decisivo na estratégia de expansão nacional da Gasosa Auto Agro. Com mais de 3 000 m² de área construída, a unidade integra um amplo armazém, uma loja equipada com toda a gama de produtos da empresa e uma oficina de serviços rápidos com equipamento de diagnóstico de última geração." },
      { type: "image", src: infraHuamboExt, caption: "Exterior das novas instalações no Huambo" },
      { type: "heading", text: "Investimento no coração de Angola" },
      { type: "paragraph", text: "O Huambo, cidade de referência do planalto central, representa um mercado estratégico para a Gasosa Auto Agro. A região concentra uma actividade agrícola e industrial crescente, e a nova unidade posiciona a empresa como parceiro de proximidade para cooperativas, empresas de construção, frotas e particulares." },
      { type: "paragraph", text: "A unidade passa a disponibilizar toda a gama de lubrificantes Nergytech, Petronas, Castrol e Galp, ferramentas agrícolas Pangulino e peças para veículos ligeiros, pesados e industriais — com stock permanente e atendimento especializado." },
    ],
  },
  {
    img: nergyImg3,
    categoria: "Automóvel",
    titulo: "Nova parceria Nergytech consolida liderança no sector energético",
    resumo: "Gasosa Auto Agro renova e amplia o acordo exclusivo com a Nergytech em Angola, trazendo novas referências de baterias e acessórios ao mercado nacional.",
    data: "26 de Maio de 2026",
    conteudo: [
      { type: "paragraph", text: "A Gasosa Auto Agro renova e amplia o acordo de representação exclusiva com a Nergytech em Angola para o período 2025-2027. O novo contrato alarga o âmbito da parceria a toda a gama de produtos Nergytech, incluindo baterias de alto desempenho, sistemas de iluminação e acessórios para veículos ligeiros, pesados e industriais." },
      { type: "image", src: nergyImg4, caption: "Gama de baterias Nergytech disponíveis nas lojas Gasosa Auto Agro" },
      { type: "heading", text: "Uma parceria de referência" },
      { type: "paragraph", text: "A Nergytech é reconhecida internacionalmente pela qualidade e durabilidade dos seus produtos. Com a Gasosa Auto Agro como representante exclusivo em Angola, os clientes angolanos têm acesso garantido às mais recentes referências da marca em stock permanente nas três unidades da empresa: Luanda, Lubango e Huambo." },
      { type: "paragraph", text: "Para 2025, estão previstas acções de formação técnica para a equipa da Gasosa Auto Agro e campanhas de comunicação conjunta, reforçando o posicionamento das duas marcas no mercado angolano." },
    ],
  },
  {
    img: infraHuamboExt,
    categoria: "Agrícola",
    titulo: "Pangulino lança nova linha de ferramentas para o campo angolano",
    resumo: "A marca própria da Gasosa Auto Agro apresenta uma gama de ferramentas desenvolvidas especificamente para as condições do solo angolano.",
    data: "20 de Maio de 2026",
    conteudo: [
      { type: "paragraph", text: "A Pangulino, marca própria da Gasosa Auto Agro, apresenta uma nova linha de ferramentas agrícolas desenvolvida especificamente para as condições do solo e do clima angolano. A gama inclui enxadas, saracotes, catanas, pás e utensílios de irrigação, produzidos com materiais resistentes ao desgaste e às temperaturas elevadas." },
      { type: "image", src: nergyImg5, caption: "Nova gama de ferramentas Pangulino para uso agrícola" },
      { type: "heading", text: "Desenvolvida para o campo angolano" },
      { type: "paragraph", text: "O desenvolvimento desta nova linha resultou de um processo de pesquisa junto de agricultores e cooperativas nas províncias do Cuando Cubango, Bié e Huambo. As ferramentas foram testadas em condições reais durante vários meses, antes de serem lançadas comercialmente." },
      { type: "paragraph", text: "A Pangulino está disponível nas três unidades da Gasosa Auto Agro e numa rede crescente de distribuidores parceiros, tornando estas ferramentas acessíveis a agricultores em todo o território nacional — com qualidade que rivaliza com marcas internacionais, a preços adaptados ao mercado angolano." },
    ],
  },
  {
    img: infraLuandaFachada,
    categoria: "Institucional",
    titulo: "Gasosa presente na FILDA 2025 com stand de 200 m²",
    resumo: "Com presença de destaque na Feira Internacional de Luanda, a Gasosa Auto Agro apresentou as suas marcas representadas e a gama Pangulino ao público angolano.",
    data: "12 de Maio de 2026",
    conteudo: [
      { type: "paragraph", text: "A Gasosa Auto Agro marcou presença na Feira Internacional de Luanda 2025 (FILDA) com um stand de mais de 200 m², onde apresentou ao público a sua vasta gama de produtos e serviços. O espaço, cuidadosamente desenhado para reflectir os valores da empresa, recebeu milhares de visitantes ao longo dos cinco dias de feira." },
      { type: "image", src: infraLuandaLoja1, caption: "Stand da Gasosa Auto Agro na FILDA 2025" },
      { type: "heading", text: "Apresentação das marcas representadas" },
      { type: "paragraph", text: "No stand, estiveram em destaque as marcas Nergytech, Petronas, Castrol e Galp, bem como a gama completa de produtos Pangulino. A participação na FILDA reforça o compromisso da Gasosa Auto Agro com o desenvolvimento económico de Angola e com a visibilidade das marcas internacionais que representa no país." },
    ],
  },
  {
    img: infraLubangoExt,
    categoria: "Institucional",
    titulo: "Expansão no Lubango: mais de 10 000 m² ao serviço do sul de Angola",
    resumo: "As novas instalações no Lubango representam o maior investimento em infraestrutura da história da empresa, servindo as províncias do sul e centro do país.",
    data: "5 de Abril de 2026",
    conteudo: [
      { type: "paragraph", text: "O Lubango consolida-se como o maior polo de distribuição da Gasosa Auto Agro fora de Luanda. As novas instalações, com mais de 10 000 m² de área construída, integram lojas, armazéns de grande capacidade e oficinas técnicas especializadas, posicionando a empresa como o principal fornecedor do sul e centro de Angola." },
      { type: "image", src: infraLubangoAerial, caption: "Vista aérea das instalações no Lubango" },
      { type: "heading", text: "Infra-estrutura ao serviço das províncias do sul" },
      { type: "paragraph", text: "A unidade do Lubango serve as províncias da Huíla, Namibe, Cunene e Cuando Cubango, garantindo proximidade e agilidade na resposta às necessidades de clientes empresariais e particulares. A oficina técnica está equipada com tecnologia de diagnóstico avançado para veículos ligeiros e pesados." },
      { type: "paragraph", text: "O investimento no Lubango reflecte a visão estratégica da Gasosa Auto Agro de descentralizar os seus serviços e estar presente onde os clientes estão — com a mesma qualidade e rigor de sempre." },
    ],
  },
  {
    img: infraLuandaLoja1,
    categoria: "Institucional",
    titulo: "30 anos de compromisso com Angola e o desenvolvimento nacional",
    resumo: "Três décadas de presença no mercado angolano, com uma trajetória marcada pelo crescimento, inovação e compromisso com os parceiros e clientes.",
    data: "20 de Março de 2026",
    conteudo: [
      { type: "paragraph", text: "Fundada em 2016 em Luanda com capital próprio, a Gasosa Auto Agro celebra uma trajetória de crescimento consistente assente na confiança dos seus clientes e na qualidade dos produtos e serviços que oferece. Ao longo destes anos, a empresa passou de uma pequena loja em Luanda a uma referência nacional com presença em três províncias." },
      { type: "image", src: infraLuandaLoja2, caption: "Loja de Luanda — a primeira unidade da Gasosa Auto Agro" },
      { type: "heading", text: "Uma empresa construída para durar" },
      { type: "paragraph", text: "O crescimento da Gasosa Auto Agro reflecte a diversificação da economia angolana e o desenvolvimento dos sectores automóvel, agrícola e industrial no país. A empresa apostou sempre na formação das suas equipas, na qualidade dos produtos e na proximidade com os clientes — valores que continuam a guiar cada decisão." },
      { type: "paragraph", text: "Com mais de 30 parceiros e clientes de referência, uma marca própria consolidada (Pangulino) e a representação exclusiva da Nergytech em Angola, a Gasosa Auto Agro olha para o futuro com ambição e solidez." },
    ],
  },
  {
    img: nergyImg4,
    categoria: "Automóvel",
    titulo: "Nova gama de baterias Nergytech disponível nas nossas lojas",
    resumo: "A Gasosa Auto Agro passa a disponibilizar a mais recente gama de baterias de alta performance da Nergytech em todas as suas unidades a nível nacional.",
    data: "15 de Fevereiro de 2026",
    conteudo: [
      { type: "paragraph", text: "A Gasosa Auto Agro anuncia a chegada da mais recente gama de baterias de alta performance da Nergytech a todas as suas unidades a nível nacional. A nova linha inclui baterias para veículos ligeiros, SUV, veículos comerciais e de utilização industrial, com tecnologias AGM e EFB para veículos com sistema start-stop." },
      { type: "image", src: nergyImg3, caption: "Nova gama de baterias Nergytech de alta performance" },
      { type: "heading", text: "Tecnologia para o exigente mercado angolano" },
      { type: "paragraph", text: "As novas baterias Nergytech foram desenvolvidas para resistir às condições climáticas exigentes de Angola, incluindo temperaturas elevadas e estradas de difícil acessibilidade. Com garantia alargada e suporte técnico especializado nas lojas da Gasosa Auto Agro, o cliente tem a segurança de um produto de topo com assistência local." },
    ],
  },
  {
    img: nergyImg5,
    categoria: "Automóvel",
    titulo: "Oficina Luanda reforça capacidade de serviços rápidos",
    resumo: "A unidade de Luanda amplia a sua capacidade de atendimento com novos equipamentos de diagnóstico e uma equipa técnica especializada.",
    data: "8 de Fevereiro de 2026",
    conteudo: [
      { type: "paragraph", text: "A oficina de serviços rápidos da loja de Luanda foi renovada e ampliada, passando a contar com novos equipamentos de diagnóstico electrónico compatíveis com as mais recentes plataformas de veículos. A equipa técnica foi reforçada com especialistas em sistemas de injecção, transmissão e electricidade automóvel." },
      { type: "image", src: infraLuandaOfic1, caption: "Nova área de oficina e diagnóstico em Luanda" },
      { type: "heading", text: "Serviço rápido, sem compromissos de qualidade" },
      { type: "paragraph", text: "O conceito de serviço rápido da Gasosa Auto Agro garante intervenções de rotina — mudanças de óleo, filtros, baterias e inspecção de travões — num prazo máximo de 60 minutos, sem necessidade de marcação prévia. Com uma equipa de técnicos certificados, a unidade de Luanda está preparada para servir frotas empresariais e clientes particulares." },
    ],
  },
  {
    img: nergyImg6,
    categoria: "Automóvel",
    titulo: "Gasosa firma parcerias com as maiores marcas do sector automóvel",
    resumo: "Novos acordos de representação reforçam o portefólio da Gasosa Auto Agro, garantindo aos clientes angolanos acesso às melhores marcas do sector.",
    data: "22 de Janeiro de 2026",
    conteudo: [
      { type: "paragraph", text: "A Gasosa Auto Agro anuncia a assinatura de novos acordos de representação e distribuição com marcas de referência do sector automóvel internacional. Os contratos abrangem lubrificantes, filtros, acessórios e componentes de manutenção — alargando significativamente a oferta disponível nas lojas da empresa." },
      { type: "heading", text: "Portefólio reforçado para responder a todas as necessidades" },
      { type: "paragraph", text: "Com este reforço do portefólio, a Gasosa Auto Agro passa a cobrir praticamente todas as necessidades de manutenção e reparação de veículos presentes no mercado angolano. Os novos produtos estarão disponíveis em stock permanente nas unidades de Luanda, Lubango e Huambo." },
    ],
  },
  {
    img: infraLuandaLoja2,
    categoria: "Agrícola",
    titulo: "Equipamentos agrícolas Pangulino chegam ao interior do país",
    resumo: "A rede de distribuição da gama Pangulino expande-se para novas províncias, aproximando o agricultor angolano das ferramentas que precisa.",
    data: "10 de Janeiro de 2026",
    conteudo: [
      { type: "paragraph", text: "A marca Pangulino expande a sua rede de distribuição para novas províncias de Angola, tornando os seus equipamentos agrícolas acessíveis a agricultores e cooperativas em regiões anteriormente dependentes de importações irregulares ou de longa distância. A expansão faz parte da estratégia de democratização do acesso a ferramentas de qualidade no sector primário angolano." },
      { type: "image", src: infraFuturas, caption: "Distribuição de equipamentos Pangulino no interior do país" },
      { type: "heading", text: "Mais perto do agricultor angolano" },
      { type: "paragraph", text: "A Gasosa Auto Agro estabeleceu parcerias com distribuidores locais nas províncias do Malanje, Lunda Norte, Lunda Sul e Moxico para assegurar a disponibilidade regular dos produtos Pangulino. Cada distribuidor recebe formação técnica sobre os produtos e acesso a suporte pós-venda da empresa." },
    ],
  },
  {
    img: infraLuandaOfic1,
    categoria: "Industrial",
    titulo: "Sector industrial: Gasosa reforça oferta de equipamentos pesados",
    resumo: "A nova gama de equipamentos industriais consolida a presença da empresa nos sectores de construção, mineração e agro-indústria.",
    data: "5 de Janeiro de 2026",
    conteudo: [
      { type: "paragraph", text: "A Gasosa Auto Agro reforça a sua presença no sector industrial com a introdução de uma nova gama de lubrificantes e fluidos de alta performance para equipamentos pesados, compressores, geradores e maquinaria agroindustrial. A oferta responde a uma necessidade crescente de clientes nos sectores de construção, mineração e transformação agro-alimentar." },
      { type: "heading", text: "Soluções para a indústria angolana" },
      { type: "paragraph", text: "Com stock permanente e atendimento especializado nas unidades de Luanda, Lubango e Huambo, a Gasosa Auto Agro garante tempos de resposta rápidos e apoio técnico qualificado para clientes industriais. A equipa técnica está capacitada para recomendar os produtos mais adequados para cada aplicação específica." },
    ],
  },
  {
    img: infraFuturas,
    categoria: "Press",
    titulo: "Jornal de Angola destaca crescimento da Gasosa Auto Agro",
    resumo: "O Jornal de Angola dedica reportagem especial ao percurso e visão estratégica da Gasosa Auto Agro no contexto da diversificação económica angolana.",
    data: "28 de Dezembro de 2025",
    conteudo: [
      { type: "paragraph", text: "O Jornal de Angola publicou uma extensa reportagem sobre a trajectória e visão estratégica da Gasosa Auto Agro, destacando o papel da empresa como um caso de sucesso empresarial angolano no contexto da diversificação económica do país. A peça jornalística, publicada na edição de fim de ano, sublinha o crescimento consistente da empresa desde a sua fundação em 2016." },
      { type: "heading", text: "Reconhecimento nacional" },
      { type: "paragraph", text: "A reportagem destaca a criação da marca própria Pangulino, a parceria exclusiva com a Nergytech e a expansão nacional como marcos que distinguem a Gasosa Auto Agro no panorama empresarial angolano. A administração da empresa falou sobre a visão para os próximos anos, incluindo planos de expansão para novas províncias e o desenvolvimento de novas linhas de produto." },
    ],
  },
];

function NoticiaDrawer({
  article,
  onClose,
}: {
  article: (typeof NOTICIAS_ARTICLES)[0] | null;
  onClose: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [winW, setWinW] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1280);
  const { t: drawerLang } = useLang();
  const drawerT = drawerLang.noticias;

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = winW < 768;

  useEffect(() => {
    if (article && scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [article]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = article ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [article]);

  return (
    <AnimatePresence>
      {article && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.52)", zIndex: 300, cursor: "pointer" }}
          />

          <motion.div
            ref={scrollRef}
            initial={isMobile ? { y: "100%" } : { x: "100%" }}
            animate={isMobile
              ? { y: 0, transition: { type: "tween", duration: 0.62, ease: [0.16, 1, 0.3, 1] } }
              : { x: 0, transition: { type: "tween", duration: 0.78, ease: [0.16, 1, 0.3, 1] } }
            }
            exit={isMobile
              ? { y: "100%", transition: { type: "tween", duration: 0.36, ease: [0.4, 0, 1, 1] } }
              : { x: "100%", transition: { type: "tween", duration: 0.42, ease: [0.4, 0, 1, 1] } }
            }
            style={isMobile ? {
              position: "fixed", bottom: 0, left: 0, width: "100%", height: "92vh",
              borderRadius: "20px 20px 0 0", background: "#ffffff", zIndex: 301,
              overflowY: "auto", fontFamily: "'Poppins', sans-serif",
            } : {
              position: "fixed", top: 0, right: 0, width: "clamp(320px, 55vw, 860px)",
              height: "100vh", background: "#ffffff", zIndex: 301,
              overflowY: "auto", fontFamily: "'Poppins', sans-serif",
            }}
          >
            {isMobile && (
              <div style={{ display: "flex", justifyContent: "center", paddingTop: "14px", paddingBottom: "2px", flexShrink: 0 }}>
                <div style={{ width: "40px", height: "4px", borderRadius: "99px", background: "rgba(0,0,0,0.18)" }} />
              </div>
            )}

            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              style={{
                position: "sticky", top: isMobile ? "12px" : "20px", float: "right",
                marginRight: "20px", marginTop: isMobile ? "12px" : "20px",
                width: "44px", height: "44px", borderRadius: "50%", background: "#111111",
                color: "#ffffff", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, flexShrink: 0,
              }}
            >
              <X style={{ width: "16px", height: "16px" }} />
            </motion.button>

            <div style={{ clear: "both", padding: "clamp(48px, 7vh, 80px) clamp(28px, 5vw, 64px) clamp(24px, 4vh, 40px)", textAlign: "center" }}>
              <span style={{ display: "inline-block", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", color: "rgba(0,0,0,0.6)", background: "rgba(0,0,0,0.08)", padding: "5px 14px", borderRadius: "99px", marginBottom: "22px", textTransform: "uppercase" }}>
                {article.categoria}
              </span>

              <h1 style={{ fontSize: "clamp(1.45rem, 1.0rem + 2.2vw, 2.6rem)", fontWeight: 500, color: "#111111", lineHeight: 1.18, letterSpacing: "-0.025em", margin: "0 auto 16px", maxWidth: "600px" }}>
                {article.titulo}
              </h1>

              <p style={{ fontSize: "0.8rem", color: "rgba(0,0,0,0.38)", marginBottom: "36px", letterSpacing: "0.02em" }}>
                {article.data}
              </p>

              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", color: "rgba(0,0,0,0.38)", letterSpacing: "0.04em" }}>
                {drawerT.continuarLer}
              </div>
            </div>

            <div style={{ width: "100%", overflow: "hidden" }}>
              <LazyImage
                src={article.img}
                alt={article.titulo}
                aspectRatio="16/9"
                loading="lazy"
                shimmerColor="#e8e0d8"
              />
            </div>

            <div style={{ padding: "clamp(28px, 5vw, 56px) clamp(28px, 5vw, 64px) clamp(56px, 9vw, 100px)" }}>
              <p style={{ fontSize: "clamp(1rem, 0.88rem + 0.5vw, 1.2rem)", color: "#111111", lineHeight: 1.8, marginBottom: "40px", fontWeight: 400 }}>
                {article.resumo}
              </p>

              {article.conteudo.map((block, i) =>
                block.type === "heading" ? (
                  <h2 key={i} style={{ fontSize: "clamp(1.05rem, 0.9rem + 0.75vw, 1.45rem)", fontWeight: 500, color: "#111111", margin: "44px 0 18px", letterSpacing: "-0.02em", lineHeight: 1.3 }}>
                    {block.text}
                  </h2>
                ) : block.type === "paragraph" ? (
                  <p key={i} style={{ fontSize: "clamp(0.88rem, 0.82rem + 0.28vw, 1rem)", color: "rgba(0,0,0,0.68)", lineHeight: 1.82, marginBottom: "28px" }}>
                    {block.text}
                  </p>
                ) : block.type === "image" ? (
                  <div key={i} style={{ margin: "40px 0" }}>
                    <div style={{ borderRadius: "12px", overflow: "hidden" }}>
                      <img src={block.src} alt={block.caption ?? ""} loading="lazy" decoding="async" style={{ width: "100%", display: "block", objectFit: "cover" }} />
                    </div>
                    {block.caption && (
                      <p style={{ fontSize: "0.7rem", color: "rgba(0,0,0,0.36)", textAlign: "center", marginTop: "10px", letterSpacing: "0.02em" }}>
                        {block.caption}
                      </p>
                    )}
                  </div>
                ) : null
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function NoticiasCategorySection({
  titulo,
  articles,
  viewport,
  onSelect,
}: {
  titulo: string;
  articles: typeof NOTICIAS_ARTICLES;
  viewport: { once: boolean; amount: number };
  onSelect?: (a: (typeof NOTICIAS_ARTICLES)[0]) => void;
}) {
  const PAD = { paddingLeft: "clamp(20px, 5vw, 80px)", paddingRight: "clamp(20px, 5vw, 80px)" };
  const WRAP = { maxWidth: "1400px", margin: "0 auto", ...PAD };
  const { t: catLang } = useLang();
  const [winW, setWinW] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1280));
  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section style={{ ...WRAP, marginBottom: "clamp(64px, 9vw, 120px)" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "20px", marginBottom: "clamp(24px, 3.5vw, 44px)" }}>
        <motion.h2
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: "clamp(1.5rem, 1rem + 2.5vw, 3.2rem)", fontWeight: 500, color: "#111111", letterSpacing: "-0.025em", margin: 0, lineHeight: 1 }}
        >
          {titulo}
        </motion.h2>
        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ fontSize: "clamp(0.78rem, 0.7rem + 0.3vw, 0.92rem)", color: "rgba(0,0,0,0.45)", textDecoration: "none", whiteSpace: "nowrap", transition: "color 0.2s", letterSpacing: "0.01em" }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#111111")}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(0,0,0,0.45)")}
        >
          {catLang.noticias.verTodos}
        </motion.a>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: winW < 580 ? "1fr" : winW < 900 ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
          gap: "clamp(10px, 1.8vw, 20px)",
        }}
      >
        {articles.map((article, i) => (
          <motion.article
            key={i}
            onClick={() => onSelect?.(article)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: i * 0.07 }}
            style={{
              borderRadius: "14px", overflow: "hidden", background: "#f5f5f5",
              cursor: "pointer", display: "flex", flexDirection: "column",
              gridRow: i === 0 && winW >= 900 ? "span 2" : undefined,
            }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <LazyImage
              src={article.img}
              alt={article.titulo}
              aspectRatio={i === 0 ? "3/4" : "4/3"}
              loading="lazy"
              shimmerColor="#e8e0d8"
              wrapperStyle={{ flexShrink: 0 }}
              imgStyle={{ transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            />
            <div style={{ padding: "clamp(14px, 1.8vw, 22px)", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
              <h3 style={{ fontSize: i === 0 ? "clamp(1rem, 0.85rem + 0.9vw, 1.45rem)" : "clamp(0.88rem, 0.78rem + 0.5vw, 1.08rem)", fontWeight: 600, color: "#111111", lineHeight: 1.28, letterSpacing: "-0.015em", margin: 0 }}>
                {article.titulo}
              </h3>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "10px" }}>
                <span style={{ fontSize: "0.74rem", color: "rgba(0,0,0,0.38)" }}>{article.data}</span>
                <span style={{ fontSize: "0.95rem", color: "rgba(0,0,0,0.35)" }}>→</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function NoticiasPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<(typeof NOTICIAS_ARTICLES)[0] | null>(null);
  const [winW, setWinW] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1280);
  const { t } = useLang();

  useSEO({
    title: "Notícias e Novidades — Gasosa Auto Agro",
    description: "Notícias, novidades e actualidades da Gasosa Auto Agro — empresa angolana líder em peças automóveis, lubrificantes Nergytech e ferramentas agrícolas Pangulino.",
    path: "/notícias",
    breadcrumb: { name: "Notícias", path: "/notícias" },
  });

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = winW < 640;
  const isTablet = winW >= 640 && winW < 1024;
  const tn = t.noticias;

  const filterDefs = [
    { value: "Todos",         label: tn.filterAll },
    { value: "Automóvel",     label: tn.filterAutomovel },
    { value: "Agrícola",      label: tn.filterAgricola },
    { value: "Industrial",    label: tn.filterIndustrial },
    { value: "Institucional", label: tn.filterInstitucional },
    { value: "Press",         label: tn.filterPress },
  ];

  const filtered = activeFilter === "Todos"
    ? NOTICIAS_ARTICLES
    : NOTICIAS_ARTICLES.filter(a => a.categoria === activeFilter);

  const latest = filtered.slice(0, 3);
  const institucional = NOTICIAS_ARTICLES.filter(a => a.categoria === "Institucional").slice(0, 3);
  const automovel    = NOTICIAS_ARTICLES.filter(a => a.categoria === "Automóvel").slice(0, 3);

  const viewport = { once: true, amount: 0.12 } as const;
  const PAD = { paddingLeft: "clamp(20px, 5vw, 80px)", paddingRight: "clamp(20px, 5vw, 80px)" };
  const WRAP = { maxWidth: "1400px", margin: "0 auto", ...PAD };

  return (
    <div className="w-full flex flex-col" style={{ fontFamily: "'Poppins', sans-serif", background: "#ffffff" }}>

      {/* ── Header ── */}
      <NavThemeCtx.Provider value={false}>
        <header
          className="fixed top-0 left-0 right-0 z-50"
          style={{
            background: "rgba(245,239,233,0.92)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
        <div
          className="w-full flex items-center justify-between"
          style={{
            maxWidth: "1600px",
            margin: "0 auto",
            padding: "clamp(12px, 2vh, 22px) clamp(16px, 2vw, 32px)",
          }}
        >
          <Link href="/" className="flex items-center">
            <NavLogo style={{ height: "clamp(38px, 5.5vw, 58px)" }} />
          </Link>
          <nav className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {t.nav.map((item) => (
                <NavPill key={item} item={item} />
              ))}
            </div>
            <LangDropdown />
          </nav>
          <button
            className="lg:hidden"
            style={{ padding: "clamp(6px, 1.2vw, 10px)", color: "#111111", background: "none", border: "none", cursor: "pointer" }}
            onClick={() => setMobileMenuOpen(true)}
            aria-label={t.mobile.openMenu}
          >
            <Menu style={{ width: "clamp(20px, 3vw, 26px)", height: "clamp(20px, 3vw, 26px)" }} />
          </button>
        </div>
        </header>
      </NavThemeCtx.Provider>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* ── Intro ── */}
      <section style={{ paddingTop: "clamp(130px, 18vh, 200px)", paddingBottom: "clamp(56px, 7vw, 96px)", textAlign: "center", ...PAD }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 28 }}
          style={{ fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.14em", color: "rgba(0,0,0,0.4)", marginBottom: "28px" }}
        >
          {tn.pageLabel}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 22, delay: 0.07 }}
          style={{ fontSize: "clamp(1.55rem, 0.9rem + 2.8vw, 3.4rem)", fontWeight: 500, color: "#111111", lineHeight: 1.18, letterSpacing: "-0.025em", maxWidth: "1060px", margin: "0 auto 44px" }}
        >
          {tn.pageTitle}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 26, delay: 0.18 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: isMobile ? "flex-start" : "center",
            overflowX: isMobile ? "auto" : "visible",
            flexWrap: isMobile ? "nowrap" : "wrap",
            gap: "0",
            paddingBottom: isMobile ? "4px" : "0",
            paddingLeft: isMobile ? "clamp(20px, 5vw, 80px)" : "0",
            paddingRight: isMobile ? "clamp(20px, 5vw, 80px)" : "0",
            marginLeft: isMobile ? "clamp(-20px, -5vw, -80px)" : "0",
            marginRight: isMobile ? "clamp(-20px, -5vw, -80px)" : "0",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          } as React.CSSProperties}
        >
          {filterDefs.map(({ value, label }, i) => {
            const isActive = value === activeFilter;
            return (
              <button
                key={value}
                onClick={() => setActiveFilter(value)}
                style={{
                  fontSize: "clamp(0.72rem, 0.65rem + 0.3vw, 0.88rem)",
                  fontWeight: isActive ? 600 : 400,
                  background: isActive ? "#111111" : "transparent",
                  color: isActive ? "#ffffff" : "rgba(0,0,0,0.55)",
                  border: isActive ? "1.5px solid #111111" : "1.5px solid transparent",
                  borderRadius: "99px",
                  padding: "5px 18px",
                  cursor: "pointer",
                  marginRight: i < filterDefs.length - 1 ? "10px" : "0",
                  marginBottom: isMobile ? "0" : "8px",
                  transition: "all 0.2s ease",
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: "0.01em",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {label}
              </button>
            );
          })}
        </motion.div>
      </section>

      {/* ── Últimos Artigos ── */}
      <section style={{ ...WRAP, marginBottom: "clamp(64px, 9vw, 120px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "clamp(24px, 3vw, 40px)" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "rgba(0,0,0,0.5)", letterSpacing: "0.04em" }}>{tn.ultimosArtigos}</span>
          <span style={{ fontSize: "0.85rem", color: "rgba(0,0,0,0.35)" }}>↓</span>
        </div>

        {latest.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
              gap: "clamp(12px, 2vw, 24px)",
            }}
          >
            {latest[0] && (
              <motion.article
                onClick={() => setSelectedArticle(latest[0])}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ type: "spring", stiffness: 85, damping: 22 }}
                style={{ gridColumn: isMobile ? "1" : "span 2", borderRadius: "16px", overflow: "hidden", background: "#f5f5f5", cursor: "pointer", display: "flex", flexDirection: "column" }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.99 }}
              >
                <LazyImage
                  src={latest[0].img}
                  alt={latest[0].titulo}
                  aspectRatio="16/9"
                  loading="lazy"
                  shimmerColor="#e8e0d8"
                  wrapperStyle={{ flexShrink: 0 }}
                  imgStyle={{ transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div style={{ padding: "clamp(20px, 2.5vw, 32px)", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.14em", color: "#F5A000", textTransform: "uppercase" }}>{latest[0].categoria}</span>
                  <h2 style={{ fontSize: "clamp(1.15rem, 0.9rem + 1.2vw, 1.9rem)", fontWeight: 600, color: "#111111", lineHeight: 1.25, letterSpacing: "-0.02em", margin: 0 }}>{latest[0].titulo}</h2>
                  <p style={{ fontSize: "clamp(0.82rem, 0.76rem + 0.2vw, 0.95rem)", color: "rgba(0,0,0,0.5)", lineHeight: 1.65, margin: 0 }}>{latest[0].resumo}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" }}>
                    <span style={{ fontSize: "0.78rem", color: "rgba(0,0,0,0.4)" }}>{latest[0].data}</span>
                    <span style={{ fontSize: "1rem", color: "rgba(0,0,0,0.4)" }}>→</span>
                  </div>
                </div>
              </motion.article>
            )}

            {latest.slice(1).map((article, i) => (
              <motion.article
                key={i}
                onClick={() => setSelectedArticle(article)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ type: "spring", stiffness: 85, damping: 22, delay: (i + 1) * 0.07 }}
                style={{ borderRadius: "16px", overflow: "hidden", background: "#f5f5f5", cursor: "pointer", display: "flex", flexDirection: "column" }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.99 }}
              >
                <LazyImage
                  src={article.img}
                  alt={article.titulo}
                  aspectRatio="4/3"
                  loading="lazy"
                  shimmerColor="#e8e0d8"
                  wrapperStyle={{ flexShrink: 0 }}
                  imgStyle={{ transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div style={{ padding: "clamp(16px, 2vw, 24px)", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                  <span style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.14em", color: "#F5A000", textTransform: "uppercase" }}>{article.categoria}</span>
                  <h3 style={{ fontSize: "clamp(0.95rem, 0.82rem + 0.6vw, 1.2rem)", fontWeight: 600, color: "#111111", lineHeight: 1.3, letterSpacing: "-0.015em", margin: 0 }}>{article.titulo}</h3>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "12px" }}>
                    <span style={{ fontSize: "0.76rem", color: "rgba(0,0,0,0.4)" }}>{article.data}</span>
                    <span style={{ fontSize: "1rem", color: "rgba(0,0,0,0.4)" }}>→</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      <NoticiasCategorySection titulo={tn.categoriaInstitucional} articles={institucional} viewport={viewport} onSelect={setSelectedArticle} />
      <NoticiasCategorySection titulo={tn.categoriaAutomovel} articles={automovel} viewport={viewport} onSelect={setSelectedArticle} />

      {/* ── Newsletter ── */}
      <section style={{ paddingTop: "clamp(80px, 12vw, 160px)", paddingBottom: "clamp(80px, 12vw, 160px)", textAlign: "center", ...PAD }}>
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.7 }} style={{ marginBottom: "28px", color: "rgba(0,0,0,0.2)", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1 }}>↖</motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          style={{ fontSize: "clamp(1.8rem, 1.2rem + 3vw, 4rem)", fontWeight: 500, color: "#111111", lineHeight: 1.2, letterSpacing: "-0.025em", maxWidth: "680px", margin: "0 auto 40px" }}
        >
          {tn.newsletterTitle}
        </motion.h2>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={e => { e.preventDefault(); if (email.trim()) setSubscribed(true); }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}
        >
          {subscribed ? (
            <motion.p initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ fontSize: "1rem", fontWeight: 500, color: "#003591" }}>
              {tn.newsletterSuccess}
            </motion.p>
          ) : (
            <>
              <div style={{ position: "relative", width: "100%", maxWidth: "480px" }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={tn.emailPlaceholder}
                  required
                  style={{ width: "100%", padding: "16px 24px", borderRadius: "99px", border: "1.5px solid rgba(0,0,0,0.15)", background: "transparent", fontSize: "0.93rem", color: "#111111", fontFamily: "'Poppins', sans-serif", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#111111")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)")}
                />
              </div>
              <button
                type="submit"
                style={{ padding: "14px 36px", borderRadius: "99px", background: "#111111", color: "#ffffff", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.06em", border: "none", cursor: "pointer", fontFamily: "'Poppins', sans-serif", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#003591")}
                onMouseLeave={e => (e.currentTarget.style.background = "#111111")}
              >
                {tn.subscribeBtn}
              </button>
            </>
          )}
          <p style={{ fontSize: "0.72rem", color: "rgba(0,0,0,0.4)", maxWidth: "400px", lineHeight: 1.6, margin: 0 }}>
            {tn.privacyText}{" "}
            <a href="#" style={{ color: "rgba(0,0,0,0.55)", textDecoration: "underline" }}>{tn.privacyLink}</a>.
          </p>
        </motion.form>
      </section>

      <Footer />
      <NoticiaDrawer article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  );
}
