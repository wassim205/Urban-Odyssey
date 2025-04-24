import ReviewCard from "./ReviewCard";

function MainContent() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-center mb-10">
        <h1 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-[#D8C292] relative">
          témoignage
          <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#D8C292]/60 rounded-full"></span>
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <ReviewCard
          name="Sophie Martin"
          days="2"
          avatar="https://avatar.iran.liara.run/public/girl?username=Lily"
          review="J'ai été impressionnée par la qualité du service et l'attention portée aux détails. L'expérience utilisateur est fluide et intuitive, et l'équipe est toujours à l'écoute pour répondre aux besoins."
        />
        <ReviewCard
          name="Thomas Dubois"
          days="5"
          avatar="https://avatar.iran.liara.run/public/boy?username=Ash"
          review="Une plateforme que je recommande sans hésitation ! Le service client est exceptionnel et les fonctionnalités proposées répondent parfaitement à mes attentes professionnelles."
        />
        <ReviewCard
          name="Marie Leclerc"
          days="1"
          avatar="https://avatar.iran.liara.run/public/girl?username=Emma"
          review="Excellente expérience de bout en bout. La plateforme est intuitive, élégante et performante. Je suis particulièrement satisfaite de la réactivité de l'équipe technique."
        />
        <ReviewCard
          name="Jean Moreau"
          days="7"
          avatar="https://avatar.iran.liara.run/public/boy?username=Max"
          review="Service impeccable qui a dépassé mes attentes. L'interface est non seulement belle mais aussi très fonctionnelle. Je l'utilise quotidiennement pour mon entreprise."
        />
        <ReviewCard
          name="Claire Petit"
          days="3"
          avatar="https://avatar.iran.liara.run/public/girl?username=Sophie"
          review="Je suis cliente depuis plusieurs mois et je ne peux que recommander ce service. L'équipe est à l'écoute et les mises à jour régulières améliorent constamment l'expérience."
        />
        <ReviewCard
          name="Antoine Bernard"
          days="4"
          avatar="https://avatar.iran.liara.run/public/boy?username=Tom"
          review="Un service qui allie esthétique et performance. La prise en main est rapide et l'interface est agréable à utiliser. Le rapport qualité-prix est excellent."
        />
      </div>
    </div>
  );
}

export default MainContent;
