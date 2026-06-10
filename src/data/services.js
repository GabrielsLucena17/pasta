import calhaImage from "../assets/img/ds-calha.jpg";
import desentupidorImage from "../assets/img/ds-desentupidor.jpg";
import electricianImage from "../assets/img/ds-eletricista.jpg";
import gardenImage from "../assets/img/ds-jardineiro.jpg";
import handymanImage from "../assets/img/ds-marido-aluguel.jpg";
import homeImage from "../assets/img/ds-torneira.jpg";
import plumberImage from "../assets/img/ds-encanador.jpg";
import plasterImage from "../assets/img/ds-gesseiro.jpg";

export const serviceImages = {
  calha: calhaImage,
  desentupidor: desentupidorImage,
  electrician: electricianImage,
  garden: gardenImage,
  handyman: handymanImage,
  home: homeImage,
  plumber: plumberImage,
  plaster: plasterImage,
};

export const services = [
  {
    id: "eletricista",
    name: "Eletricista",
    image: electricianImage,
    alt: "Eletricista trabalhando",
  },
  {
    id: "encanador",
    name: "Encanador",
    image: plumberImage,
    alt: "Encanador atendendo cliente",
  },
  {
    id: "torneira",
    name: "Instalação Torneira",
    image: homeImage,
    alt: "Instalação de torneira",
  },
  {
    id: "calhas",
    name: "Limpeza de calhas",
    image: calhaImage,
    alt: "Limpeza de calhas",
  },
  {
    id: "jardineiro",
    name: "Jardineiro",
    image: gardenImage,
    alt: "Jardineiro",
  },
  {
    id: "gesseiro",
    name: "Gesseiro",
    image: plasterImage,
    alt: "Gesseiro",
  },
];

export const popularServices = services.slice(0, 2);
