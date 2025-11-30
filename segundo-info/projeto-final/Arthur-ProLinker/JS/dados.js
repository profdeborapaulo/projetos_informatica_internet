const profissionais = [
  // Designer Gráfica e Ilustradora
  {
    id: 1,
    name: "Marina Alves",
    job: "Designer Gráfica e Ilustradora",
    description: "Especialista em identidade visual, logotipos e ilustrações digitais criativas.",
    price: "R$ 120/hora",
    image: "https://img.freepik.com/vetores-premium/homem-vazio-avatar-casual-e-estilo-de-negocios-vector-foto-placeholder-para-redes-sociais-retoma_885953-434.jpg",
    trabalhos: [
      { client: "Padaria Sabor & Arte", title: "Criação de Logotipo", details: "Novo design moderno e minimalista para a marca." },
      { client: "Loja do João", title: "Design de Cartão de Visita", details: "Cartões com design limpo e identidade visual padronizada." }
    ]
  },
  {
    id: 2,
    name: "Lucas Pereira",
    job: "Designer Gráfica e Ilustradora",
    description: "Criação de peças publicitárias e layouts para redes sociais e websites.",
    price: "R$ 90/hora",
    image: "https://img.freepik.com/vetores-premium/homem-vazio-avatar-casual-e-estilo-de-negocios-vector-foto-placeholder-para-redes-sociais-retoma_885953-434.jpg",
    trabalhos: [
      { client: "Studio Fit", title: "Campanha Instagram", details: "Série de artes para postagens fitness." },
      { client: "Café Aroma", title: "Cardápio Digital", details: "Design otimizado para tablets e smartphones." }
    ]
  },
  {
    id: 3,
    name: "Amanda Rocha",
    job: "Designer Gráfica e Ilustradora",
    description: "Design criativo voltado para pequenas empresas e marcas pessoais.",
    price: "R$ 80/hora",
    image: "https://img.freepik.com/vetores-premium/homem-vazio-avatar-casual-e-estilo-de-negocios-vector-foto-placeholder-para-redes-sociais-retoma_885953-434.jpg",
    trabalhos: [
      { client: "Boutique Bela", title: "Identidade Visual Completa", details: "Cores, logotipo e paleta visual da marca." },
      { client: "Livraria Horizonte", title: "Capa de Livro", details: "Criação de arte exclusiva para lançamento editorial." }
    ]
  },
  {
    id: 4,
    name: "Diego Nascimento",
    job: "Designer Gráfica e Ilustradora",
    description: "Freelancer experiente em motion design e identidade visual digital.",
    price: "R$ 100/hora",
    image: "https://img.freepik.com/vetores-premium/homem-vazio-avatar-casual-e-estilo-de-negocios-vector-foto-placeholder-para-redes-sociais-retoma_885953-434.jpg",
    trabalhos: [
      { client: "TechUp", title: "Logo e Animação", details: "Animação de logotipo para vídeos institucionais." },
      { client: "PetShop Amigo Fiel", title: "Campanha Visual", details: "Pacote de banners e cartazes promocionais." }
    ]
  },

  //Reforma
  {
    id: 5,
    name: "Carlos Menezes",
    job: "Reforma",
    description: "Atendimento rápido e seguro em instalações e reparos elétricos.",
    price: "R$ 150/serviço",
    image: "https://img.freepik.com/vetores-premium/homem-vazio-avatar-casual-e-estilo-de-negocios-vector-foto-placeholder-para-redes-sociais-retoma_885953-434.jpg",
    trabalhos: [
      { client: "Condomínio Jardim Verde", title: "Instalação de Iluminação", details: "Projeto de iluminação LED em áreas comuns." },
      { client: "Maria Souza", title: "Troca de Disjuntores", details: "Atualização completa do quadro de energia." }
    ]
  },
  {
    id: 6,
    name: "Juliana Ribeiro",
    job: "Reforma",
    description: "Serviços de manutenção, automação e instalação elétrica residencial.",
    price: "R$ 130/serviço",
    image: "https://img.freepik.com/vetores-premium/homem-vazio-avatar-casual-e-estilo-de-negocios-vector-foto-placeholder-para-redes-sociais-retoma_885953-434.jpg",
    trabalhos: [
      { client: "Casa da Praia", title: "Instalação de Tomadas", details: "Revisão e instalação de pontos novos de energia." },
      { client: "João Batista", title: "Automação Residencial", details: "Sistema de controle de iluminação via aplicativo." }
    ]
  },
  {
    id: 7,
    name: "Renato Silva",
    job: "Reforma",
    description: "Mais de 10 anos de experiência com instalações elétricas e reformas.",
    price: "R$ 140/serviço",
    image: "https://img.freepik.com/vetores-premium/homem-vazio-avatar-casual-e-estilo-de-negocios-vector-foto-placeholder-para-redes-sociais-retoma_885953-434.jpg",
    trabalhos: [
      { client: "Residência Oliveira", title: "Reforma Elétrica", details: "Substituição de toda a fiação antiga." },
      { client: "Construtora Lima", title: "Instalação Predial", details: "Execução de sistema elétrico em prédio de 5 andares." }
    ]
  },
  {
    id: 8,
    name: "Patrícia Duarte",
    job: "Reforma",
    description: "Especialista em soluções elétricas sustentáveis e econômicas.",
    price: "R$ 160/serviço",
    image: "https://img.freepik.com/vetores-premium/homem-vazio-avatar-casual-e-estilo-de-negocios-vector-foto-placeholder-para-redes-sociais-retoma_885953-434.jpg",
    trabalhos: [
      { client: "Escola Criar+", title: "Iluminação Eficiente", details: "Troca por lâmpadas LED e sensores de presença." },
      { client: "Farmácia Vida", title: "Correção de Circuitos", details: "Redução no consumo de energia em 18%." }
    ]
  },
  //Mecânica
{
  id: 9,
  name: "Roberto Lima",
  job: "Mecânico",
  description: "Especialista em manutenção e reparos automotivos gerais.",
  price: "R$ 100/hora",
  image: "https://img.freepik.com/vetores-premium/homem-vazio-avatar-casual-e-estilo-de-negocios-vector-foto-placeholder-para-redes-sociais-retoma_885953-434.jpg",
  trabalhos: [
    { client: "Oficina AutoCar", title: "Reparo do motor", details: "Diagnóstico e reparo completo do motor." },
    { client: "Cliente Particular", title: "Troca de óleo", details: "Manutenção preventiva com óleo sintético." }
  ]
},
{
  id: 10,
  name: "Fernanda Sousa",
  job: "Mecânico",
  description: "Manutenção elétrica e mecânica de veículos leves e pesados.",
  price: "R$ 110/hora",
  image: "https://img.freepik.com/vetores-premium/homem-vazio-avatar-casual-e-estilo-de-negocios-vector-foto-placeholder-para-redes-sociais-retoma_885953-434.jpg",
  trabalhos: [
    { client: "Frota TransLog", title: "Revisão elétrica", details: "Inspeção e reparo dos sistemas elétricos." },
    { client: "Cliente Particular", title: "Alinhamento e balanceamento", details: "Melhora na dirigibilidade e segurança." }
  ]
},
{
  id: 11,
  name: "Paulo Rodrigues",
  job: "Mecânico",
  description: "Serviços rápidos e confiáveis de mecânica geral.",
  price: "R$ 95/hora",
  image: "https://img.freepik.com/vetores-premium/homem-vazio-avatar-casual-e-estilo-de-negocios-vector-foto-placeholder-para-redes-sociais-retoma_885953-434.jpg",
  trabalhos: [
    { client: "Oficina MotorFlex", title: "Substituição de freios", details: "Instalação de peças originais." },
    { client: "Cliente Particular", title: "Reparo na suspensão", details: "Ajustes para conforto e segurança." }
  ]
},
{
  id: 12,
  name: "Luciana Silva",
  job: "Mecânico",
  description: "Especialista em diagnósticos eletrônicos automotivos.",
  price: "R$ 120/hora",
  image: "https://img.freepik.com/vetores-premium/homem-vazio-avatar-casual-e-estilo-de-negocios-vector-foto-placeholder-para-redes-sociais-retoma_885953-434.jpg",
  trabalhos: [
    { client: "AutoCenter", title: "Diagnóstico computacional", details: "Leitura e correção de falhas." },
    { client: "Cliente Particular", title: "Instalação de sensores", details: "Modernização de veículos antigos." }
  ]
},

//Saúde
{
  id: 13,
  name: "Dra. Ana Costa",
  job: "Profissional de Saúde",
  description: "Médica clínica geral com foco em atendimento humanizado.",
  price: "R$ 150/consulta",
  image: "https://img.freepik.com/vetores-premium/homem-vazio-avatar-casual-e-estilo-de-negocios-vector-foto-placeholder-para-redes-sociais-retoma_885953-434.jpg",
  trabalhos: [
    { client: "Clínica Vida", title: "Atendimento ambulatorial", details: "Consulta e acompanhamento de pacientes." },
    { client: "Paciente Particular", title: "Avaliação geral", details: "Exames e diagnóstico clínico." }
  ]
},
{
  id: 14,
  name: "Carlos Eduardo",
  job: "Profissional de Saúde",
  description: "Fisioterapeuta especializado em reabilitação esportiva.",
  price: "R$ 100/sessão",
  image: "https://img.freepik.com/vetores-premium/homem-vazio-avatar-casual-e-estilo-de-negocios-vector-foto-placeholder-para-redes-sociais-retoma_885953-434.jpg",
  trabalhos: [
    { client: "Academia Fit", title: "Reabilitação de atletas", details: "Tratamentos personalizados para lesões." },
    { client: "Paciente Particular", title: "Fisioterapia domiciliar", details: "Atendimento confortável e prático." }
  ]
},
{
  id: 15,
  name: "Mariana Albuquerque",
  job: "Profissional de Saúde",
  description: "Nutricionista focada em alimentação saudável e esportiva.",
  price: "R$ 120/consulta",
  image: "https://img.freepik.com/vetores-premium/homem-vazio-avatar-casual-e-estilo-de-negocios-vector-foto-placeholder-para-redes-sociais-retoma_885953-434.jpg",
  trabalhos: [
    { client: "Clube Esportivo", title: "Plano alimentar personalizado", details: "Dietas focadas em performance." },
    { client: "Paciente Particular", title: "Consultoria nutricional", details: "Orientações para hábitos saudáveis." }
  ]
},
{
  id: 16,
  name: "Dr. Felipe Martins",
  job: "Profissional de Saúde",
  description: "Dentista com ênfase em estética e saúde bucal.",
  price: "R$ 200/consulta",
  image: "https://img.freepik.com/vetores-premium/homem-vazio-avatar-casual-e-estilo-de-negocios-vector-foto-placeholder-para-redes-sociais-retoma_885953-434.jpg",
  trabalhos: [
    { client: "Clínica Sorriso", title: "Tratamento ortodôntico", details: "Aparelhos e correção dental." },
    { client: "Paciente Particular", title: "Clareamento dental", details: "Procedimento estético seguro." }
  ]
}

];
