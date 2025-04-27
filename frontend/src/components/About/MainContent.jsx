import React, { useEffect } from "react";
import city from "./../../images/City.png";
import AOS from "aos";
import "aos/dist/aos.css";

function MainContent() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      offset: 120,
    });
  }, []);

  return (
    <div className="">
      <h1
        data-aos="fade-up"
        data-aos-delay="100"
        className="font-bebas text-[#313131] text-center mt-6 md:mt-20 text-4xl md:text-5xl lg:text-6xl px-4"
      >
        À Propos de Urban Odyssey
      </h1>

      <div className="grid gap-10 md:gap-20">
        {/* First section */}
        <div className="px-6 md:ml-14 mt-6 md:mt-8 space-y-4 md:space-y-6">
          <h2
            data-aos="fade-right"
            data-aos-delay="200"
            className="text-[#A45A3D] font-bebas text-3xl md:text-4xl lg:text-5xl"
          >
            Qui suis-je ?
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-[#313131] font-gentiumBook text-lg md:text-2xl lg:text-4xl md:mr-16"
          >
            Je m'appelle Wassim El Mourabit, un passionné de technologie et de
            développement web. Ayant toujours été intéressé par l'exploration et
            la découverte, j'ai conçu Urban Odyssey pour offrir aux voyageurs et
            aux résidents locaux une manière innovante et immersive de découvrir
            leur environnement. Mon objectif est de créer une plateforme
            intuitive et accessible qui permet à chacun de sortir des sentiers
            battus et de vivre des expériences uniques.
          </p>
        </div>

        {/* City background section */}
        <div
          data-aos="zoom-in-up"
          className="relative bg-cover bg-center overflow-hidden w-full"
          style={{ backgroundImage: `url(${city})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#293D36] bg-opacity-60 pointer-events-none"></div>

          <div className="relative z-10">
            {/* Pourquoi Urban Odyssey */}
            <div className="p-6 md:p-14 space-y-4 md:space-y-8">
              <h2
                data-aos="fade-right"
                className="font-bebas text-3xl md:text-4xl lg:text-5xl text-[#D8C292]"
              >
                Pourquoi Urban Odyssey ?
              </h2>
              <p
                data-aos="fade-up"
                data-aos-delay="100"
                className="font-gentiumBook text-white text-lg md:text-2xl lg:text-4xl"
              >
                De nombreuses personnes, qu'elles soient touristes ou habitants,
                visitent souvent les mêmes attractions populaires sans explorer
                toute la richesse qu'une ville a à offrir. Urban Odyssey est né
                de cette observation et a pour mission de révolutionner la
                manière dont nous explorons les villes. En combinant
                recommandations personnalisées et informations pratiques sur les
                transports et les services de proximité, notre plateforme permet
                à chaque utilisateur de découvrir des lieux inédits et
                authentiques.
              </p>
            </div>

            {/* Notre Vision */}
            <div className="p-6 md:p-14 space-y-4 md:space-y-8">
              <h2
                data-aos="fade-right"
                className="font-bebas text-3xl md:text-4xl lg:text-5xl text-[#D8C292]"
              >
                Notre Vision
              </h2>
              <p
                data-aos="fade-up"
                data-aos-delay="100"
                className="font-gentiumBook text-white text-lg md:text-2xl lg:text-4xl"
              >
                Urban Odyssey ne se contente pas de répertorier les lieux
                emblématiques ; il propose une expérience immersive qui valorise
                la culture locale et les trésors cachés. Nous souhaitons rendre
                l'exploration urbaine plus accessible et personnalisée, en
                intégrant des fonctionnalités interactives telles que des avis
                d'utilisateurs, des cartes dynamiques et des options de
                transport adaptées à chaque visiteur.
              </p>
            </div>

            {/* Nos Objectifs */}
            <div className="p-6 md:p-14 space-y-4 md:space-y-8">
              <h2
                data-aos="fade-right"
                className="font-bebas text-3xl md:text-4xl lg:text-5xl text-[#D8C292]"
              >
                Nos Objectifs
              </h2>
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="font-gentiumBook text-white text-lg md:text-2xl lg:text-4xl"
              >
                <ul className="list-disc pl-6 space-y-2 md:space-y-4">
                  <li data-aos="fade-up" data-aos-delay="150">
                    Offrir des recommandations pertinentes et personnalisées.
                  </li>
                  <li data-aos="fade-up" data-aos-delay="200">
                    Permettre aux utilisateurs de trouver des informations de
                    transport en temps réel.
                  </li>
                  <li data-aos="fade-up" data-aos-delay="250">
                    Intégrer des lieux culturels et religieux pour une
                    exploration enrichie.
                  </li>
                  <li data-aos="fade-up" data-aos-delay="300">
                    Proposer des avis et conseils d'autres utilisateurs pour une
                    expérience collaborative.
                  </li>
                  <li data-aos="fade-up" data-aos-delay="350">
                    Fournir une interface intuitive et rapide pour faciliter la
                    navigation.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Pour Qui section */}
        <div className="px-6 md:ml-14 space-y-4 md:space-y-6">
          <h2
            data-aos="fade-right"
            className="text-[#A45A3D] font-bebas text-3xl md:text-4xl lg:text-5xl"
          >
            Pour Qui ?
          </h2>
          <div className="font-gentiumBook text-lg md:text-2xl lg:text-4xl text-[#313131]">
            <p data-aos="fade-up" data-aos-delay="100" className="mb-2">
              Urban Odyssey s'adresse à tous ceux qui souhaitent explorer une
              ville autrement :
            </p>
            <ul className="list-disc pl-16 space-y-2 md:space-y-4">
              <li data-aos="fade-up" data-aos-delay="150">
                Touristes en quête de nouvelles découvertes.
              </li>
              <li data-aos="fade-up" data-aos-delay="200">
                Résidents locaux voulant redécouvrir leur propre ville.
              </li>
              <li data-aos="fade-up" data-aos-delay="250">
                Voyageurs solo, en famille ou entre amis cherchant des
                recommandations adaptées à leurs préférences.
              </li>
              <li data-aos="fade-up" data-aos-delay="300">
                Entreprises locales désireuses de se faire connaître et
                d'attirer plus de visiteurs.
              </li>
            </ul>
          </div>
        </div>

        {/* Nos Fonctionnalités Clés section */}
        <div className="px-6 md:ml-14 space-y-4 md:space-y-6">
          <h2
            data-aos="fade-right"
            className="text-[#A45A3D] font-bebas text-3xl md:text-4xl lg:text-5xl"
          >
            Nos Fonctionnalités Clés
          </h2>
          <div className="font-gentiumBook text-lg md:text-2xl lg:text-4xl text-[#313131]">
            <ul className="list-disc pl-8 space-y-2 md:space-y-4">
              <li data-aos="fade-up" data-aos-delay="150">
                <span className="font-semibold">
                  Recommandations Personnalisées :
                </span>{" "}
                Découvrez des lieux adaptés à vos goûts et centres d'intérêt.
              </li>
              <li data-aos="fade-up" data-aos-delay="200">
                <span className="font-semibold">
                  Informations sur les Transports :
                </span>{" "}
                Accédez à des itinéraires, tarifs et options de transport
                pratiques.
              </li>
              <li data-aos="fade-up" data-aos-delay="250">
                <span className="font-semibold">
                  Avis et Notes des Utilisateurs :
                </span>{" "}
                Partagez vos expériences et consultez les retours d'autres
                explorateurs.
              </li>
              <li data-aos="fade-up" data-aos-delay="300">
                <span className="font-semibold">Cartes Interactives :</span>{" "}
                Naviguez facilement et planifiez vos trajets en un clic.
              </li>
              <li data-aos="fade-up" data-aos-delay="350">
                <span className="font-semibold">Contenu Collaboratif :</span>{" "}
                Contribuez à enrichir la plateforme en ajoutant de nouveaux
                lieux et avis.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer with conclusion text overlapping */}
        <div className="relative">
          {/* SVG Footer */}
          <div className="w-full" data-aos="fade-up">
            <img
              src="/src/assets/footer/footer.svg"
              alt="footer"
              className="w-full object-cover"
            />
          </div>

          {/* Overlapping conclusion text */}
          <div className="absolute top-2/4 left-0 right-0 z-10 px-6 md:px-14 text-center">
            <p
              data-aos="zoom-in"
              className="font-bebas text-[#D8C292] text-2xl md:text-3xl lg:text-4xl max-w-full mx-auto drop-shadow-2xl"
            >
              Urban Odyssey est plus qu'un simple guide touristique, c'est une
              invitation à l'aventure urbaine, à la découverte et à
              l'exploration personnalisée. Rejoignez-nous et transformez chaque
              sortie en une expérience inoubliable !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
