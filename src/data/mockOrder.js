import sinkProblemImage from "../../DesignSystem/img/problems/pia.png";
import sinkProblemImageTwo from "../../DesignSystem/img/problems/pia (2).png";
import faucetProblemImage from "../../DesignSystem/img/problems/torneira.png";
import professionalImage from "../assets/img/ds-encanador.jpg";

export const mockedServiceOrder = {
  id: "#12345",
  code: "15450AD4121S",
  category: "Encanador",
  title: "Vazamento na pia da cozinha",
  shortProblem: "Pia da cozinha vazando",
  description:
    "A pia da cozinha está vazando mesmo com a torneira fechada. A água escorre pela base da torneira e também pinga dentro do armário. Preciso que um profissional verifique a vedação, o sifão e faça o reparo necessário.",
  urgent: true,
  createdAt: "Publicado há 15 min",
  createdAtShort: "Hoje às 14:16",
  location: {
    neighborhood: "Vila Tesouro",
    city: "São José dos Campos",
    state: "SP",
    display: "Vila Tesouro - São José dos Campos, SP",
    short: "São José dos Campos, SP",
  },
  photos: [
    { src: sinkProblemImage, alt: "Vazamento aparente na pia da cozinha" },
    { src: sinkProblemImageTwo, alt: "Água acumulada na parte inferior da pia" },
    { src: faucetProblemImage, alt: "Torneira com sinal de vazamento" },
  ],
  client: {
    name: "Youtan Cliente",
    initials: "YC",
  },
  professional: {
    name: "Ytp Profissional",
    initials: "YP",
    rating: "4.9",
    reviews: "(5)",
    bio: "Profissional especializado em reparos hidráulicos residenciais",
    services: "Vazamentos, sifões, torneiras e manutenção hidráulica",
    image: professionalImage,
  },
  proposal: {
    startDate: "2026-05-17",
    deadline: "2026-05-18",
    price: "R$ 380,00",
    deadlineLabel: "Em até 1 dia útil",
    detail:
      "A proposta inclui deslocamento, avaliação do vazamento, ajuste ou troca da vedação da torneira, revisão do sifão e teste final para garantir que não haja novos pingamentos.",
  },
};

export const mockedChatMessages = [
  {
    from: "client",
    text: "Olá, tudo bem? A pia da cozinha está vazando pela base da torneira e pingando dentro do armário. Você consegue verificar?",
    time: "18:12",
  },
  {
    from: "professional",
    text: "Tudo bem! Consigo sim. Pelas fotos, parece ser vedação da torneira ou conexão do sifão. Eu consigo ir amanhã para avaliar e já fazer o reparo.",
    time: "18:14",
  },
  {
    from: "client",
    text: "Ótimo. O valor da proposta já inclui material simples, como vedação ou fita veda rosca?",
    time: "18:16",
  },
  {
    from: "professional",
    text: "Inclui sim. Se precisar trocar alguma peça maior, eu aviso antes de comprar para você aprovar.",
    time: "18:18",
  },
  {
    from: "client",
    text: "Perfeito, pode manter a proposta. Vou seguir com a confirmação.",
    time: "18:21",
  },
];
