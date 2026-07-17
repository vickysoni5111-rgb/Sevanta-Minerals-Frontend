import QuartzImg from './assets/Quartz.png';
import FineQuartzBg from './assets/fine-quartz-powder.png';
import ConsistentImg from './assets/consistent-performance.png';
import ReliableSupplyImg from './assets/reliable-supply.png';

import GlassImg from './assets/glass.png';
import StoneImg from './assets/engineered-stone.png';
import C1Img from './assets/c1.png';
import MarbleImg from './assets/marbal.png';
import AdhesivesImg from './assets/construction-chemicals-and-adhesives.png';
import EpoxyImg from './assets/epoxy-flooring-and-grouts.png';

import Quartz200Img from './assets/pic2.png';
import MainBgImg from './assets/main.png';
import IndustryImg from './assets/industry.png';
import PlasticsImg from './assets/plastics.png';
import SilicaQuartzPowderImg from './assets/silica-quartz-powder.png'; 

import Salt1Img from './assets/salt1.png';
import GundImg from './assets/gund.png';
import GuttiImg from './assets/gutti.png';
import RetImg from './assets/ret.png';
import SodiumImg from './assets/sodium.png';
import DetergentImg from './assets/detergent.png';
import CeramicsImg from './assets/ceramics.png';
import TableTopImg from './assets/table-top.png';

// New images added for the 300 Mesh page redesign
import BottomBannerImg from './assets/bottom.png';
import GritsGrainsImg from './assets/quartz-grits-and-grains.png';
import Pic2SaltImg from './assets/pic2.png';
import SaltImg from './assets/salt.png';
import TexturedCoatingsImg from './assets/textured-architectural-coatings.png';

export const products = {
  "quartz-powder-200-mesh": {
    name: "Quartz Powder",
    mesh: "200 Mesh",
    image: Quartz200Img,
    tagline: "Optically Sorted Snow-White Grains",
    specs: "100-700 µm | Fe₂O₃ < 0.01%",
    description: "High-purity grains processed through advanced optical sorting and high-intensity magnetic separation. Engineered for superior transparency and minimal black spots.",
    isSpecial200Mesh: true,
    fullHeroBg: QuartzImg,
    secondSectionBg: FineQuartzBg,
    consistentImg: ConsistentImg,
    reliableImg: ReliableSupplyImg,
    sliderImages: [GlassImg, StoneImg, C1Img, MarbleImg, AdhesivesImg, EpoxyImg]
  },

  "quartz-powder-250-mesh": {
    name: "Quartz Powder",
    mesh: "250 Mesh",
    image: QuartzImg,
    tagline: "Ultra-Fine Industrial Grade Solution",
    specs: "45-60 µm | Fe₂O₃ < 0.02%",
    description: "Premium grade 250 Mesh Quartz Powder, finely milled for excellent chemical resistance.",
    isSpecial250Mesh: true,
    fineQuartzBg: FineQuartzBg,
    industryImg: IndustryImg,
    silicaBg: SilicaQuartzPowderImg,
    appCards: [
      { title: "Salt Industry", img: Salt1Img },
      { title: "Glass / Foundry", img: GundImg },
      { title: "Gutti Ceramic Filler", img: GuttiImg },
      { title: "Refractories / Sand", img: RetImg },
      { title: "Sodium Silicate", img: SodiumImg },
      { title: "Detergent Formulation", img: DetergentImg },
      { title: "Premium Ceramics", img: CeramicsImg },
      { title: "Table Tops", img: TableTopImg }
    ]
  },

  "quartz-powder-300-mesh": {
    name: "Quartz Powder",
    mesh: "300 Mesh",
    image: PlasticsImg,
    tagline: "Super-Fine Micronized Powder",
    specs: "Sub-45 µm | High Silica Purity",
    description: "Our ultra-fine 300 Mesh Quartz Powder is processed under strict quality control.",
    isSpecial300Mesh: true,
    heroBg: MainBgImg,
    industryImg: IndustryImg,
    // New fields for the added sections below the Technical Profile grid
    bottomBannerImg: BottomBannerImg,
    gritsGrainsImg: GritsGrainsImg,
    saltBenchmarkImg: Pic2SaltImg,
    saltIndustryImg: SaltImg,
    texturedCoatingsImg: TexturedCoatingsImg
  }
};