export type Lang = "PT" | "EN" | "ES";

export const translations = {
  PT: {
    nav: ["QUEM SOMOS", "SECTORES", "INFRAESTRUTURAS", "PARCEIROS", "CONTACTOS"],
    hero: {
      title1: "Referência angolana no",
      title2: "sector automóvel e agrícola.",
      subtitle: "Qualidade e confiança para quem impulsiona Angola — nos campos, nas estradas e nas indústrias.",
      cardText1: "Uma empresa construída",
      cardText2: "para durar.",
      contactBtn: "CONTACTE-NOS",
      technicianAlt: "Técnico Gasosa Auto Agro",
      contactAlt: "Contacte-nos",
    },
    historia: {
      heading: "Uma trajetória marcada pela dedicação, excelência e crescimento.",
      milestones: [
        {
          label: "Fundação",
          subtitle: "O início em Luanda",
          description:
            "Fundação da Gasosa Auto Agro em Luanda, com capital próprio e foco no fornecimento de peças, acessórios e lubrificantes para o sector automóvel e agrícola angolano.",
        },
        {
          label: "Marca própria",
          subtitle: "Nasce a Pangulino",
          description:
            "Criação da marca própria Pangulino, inspirada no pangolim — símbolo de resistência e protecção. Uma linha de ferramentas e equipamentos agrícolas de alta durabilidade, desenvolvida para o mercado angolano.",
        },
        {
          label: "Expansão nacional",
          subtitle: "De Luanda ao interior do país",
          description:
            "Consolidação da presença nacional com a abertura de instalações no Lubango e no Huambo — mais de 10.000 m² de infraestrutura no Lubango, com lojas, armazéns e oficinas ao serviço das províncias do sul e centro do país.",
        },
      ],
      currentLabel: "HOJE — 2025",
      currentText:
        "Consolidados como referência nacional no sector automóvel, agrícola e industrial, com representação exclusiva da marca Nergytech em Angola, parceria com mais de 30 clientes e empresas de referência — e uma visão clara para o futuro.",
    },
    mobile: {
      openMenu: "Abrir menu",
    },
  },

  EN: {
    nav: ["ABOUT US", "SECTORS", "INFRASTRUCTURE", "PARTNERS", "CONTACTS"],
    hero: {
      title1: "Angola's reference in the",
      title2: "automotive and agricultural sector.",
      subtitle:
        "Quality and trust for those who drive Angola forward — in the fields, on the roads and in industry.",
      cardText1: "A company built",
      cardText2: "to last.",
      contactBtn: "CONTACT US",
      technicianAlt: "Gasosa Auto Agro technician",
      contactAlt: "Contact us",
    },
    historia: {
      heading: "A journey marked by dedication, excellence and growth.",
      milestones: [
        {
          label: "Foundation",
          subtitle: "The beginning in Luanda",
          description:
            "Foundation of Gasosa Auto Agro in Luanda, with own capital and focus on supplying parts, accessories and lubricants for the Angolan automotive and agricultural sector.",
        },
        {
          label: "Own brand",
          subtitle: "Pangulino is born",
          description:
            "Creation of the Pangulino own brand, inspired by the pangolin — a symbol of resilience and protection. A line of highly durable agricultural tools and equipment, developed for the Angolan market.",
        },
        {
          label: "National expansion",
          subtitle: "From Luanda to the interior",
          description:
            "Consolidation of national presence with the opening of facilities in Lubango and Huambo — more than 10,000 m² of infrastructure in Lubango, with shops, warehouses and workshops serving the southern and central provinces.",
        },
      ],
      currentLabel: "TODAY — 2025",
      currentText:
        "Established as a national reference in the automotive, agricultural and industrial sector, with exclusive representation of the Nergytech brand in Angola, partnerships with more than 30 leading clients and companies — and a clear vision for the future.",
    },
    mobile: {
      openMenu: "Open menu",
    },
  },

  ES: {
    nav: ["QUIÉNES SOMOS", "SECTORES", "INFRAESTRUCTURAS", "SOCIOS", "CONTACTOS"],
    hero: {
      title1: "Referencia angoleña en el",
      title2: "sector automovilístico y agrícola.",
      subtitle:
        "Calidad y confianza para quienes impulsan Angola — en los campos, en las carreteras y en las industrias.",
      cardText1: "Una empresa construida",
      cardText2: "para durar.",
      contactBtn: "CONTÁCTENOS",
      technicianAlt: "Técnico de Gasosa Auto Agro",
      contactAlt: "Contáctenos",
    },
    historia: {
      heading: "Una trayectoria marcada por la dedicación, la excelencia y el crecimiento.",
      milestones: [
        {
          label: "Fundación",
          subtitle: "El inicio en Luanda",
          description:
            "Fundación de Gasosa Auto Agro en Luanda, con capital propio y enfoque en el suministro de piezas, accesorios y lubricantes para el sector automovilístico y agrícola angoleño.",
        },
        {
          label: "Marca propia",
          subtitle: "Nace Pangulino",
          description:
            "Creación de la marca propia Pangulino, inspirada en el pangolín — símbolo de resistencia y protección. Una línea de herramientas y equipos agrícolas de alta durabilidad, desarrollada para el mercado angoleño.",
        },
        {
          label: "Expansión nacional",
          subtitle: "De Luanda al interior del país",
          description:
            "Consolidación de la presencia nacional con la apertura de instalaciones en Lubango y Huambo — más de 10.000 m² de infraestructura en Lubango, con tiendas, almacenes y talleres al servicio de las provincias del sur y centro del país.",
        },
      ],
      currentLabel: "HOY — 2025",
      currentText:
        "Consolidados como referencia nacional en el sector automovilístico, agrícola e industrial, con representación exclusiva de la marca Nergytech en Angola, asociación con más de 30 clientes y empresas de referencia — y una visión clara para el futuro.",
    },
    mobile: {
      openMenu: "Abrir menú",
    },
  },
} as const;
