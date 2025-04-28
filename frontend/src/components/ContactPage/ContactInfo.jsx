import { motion } from "framer-motion";
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

function ContactInfo() {
  const contactItems = [
    { 
      icon: <PhoneIcon className="w-6 h-6" />, 
      title: "Téléphone", 
      content: "+33 1 23 45 67 89",
      href: "tel:+33123456789" 
    },
    { 
      icon: <EnvelopeIcon className="w-6 h-6" />, 
      title: "Email", 
      content: "contact@example.com",
      href: "mailto:contact@example.com" 
    },
    { 
      icon: <MapPinIcon className="w-6 h-6" />, 
      title: "Adresse", 
      content: "123 Avenue des Champs-Élysées, 75008 Paris, France",
      href: "https://maps.google.com/?q=123+Avenue+des+Champs-Élysées,+75008+Paris,+France" 
    },
    { 
      icon: <ClockIcon className="w-6 h-6" />, 
      title: "Heures d'ouverture", 
      content: "Lun - Ven: 9h - 18h | Sam: 10h - 16h",
      href: null 
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <motion.div 
      className="bg-[#293D36]/30 backdrop-blur-sm p-8 rounded-xl border border-[#D8C292]/20"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-montaga text-2xl text-[#D8C292] mb-6">Nos Informations</h2>
      <p className="text-[#D8C292]/80 font-montaga mb-8">
        Nous sommes à votre disposition pour toute question ou demande de renseignement. N'hésitez pas à nous contacter par le moyen qui vous convient le mieux.
      </p>
      
      <div className="space-y-6">
        {contactItems.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-start gap-4"
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <div className="mt-1 p-2 rounded-full bg-[#D8C292]/10 text-[#D8C292]">
              {item.icon}
            </div>
            <div>
              <h3 className="text-[#D8C292] font-montaga text-lg">{item.title}</h3>
              {item.href ? (
                <a 
                  href={item.href} 
                  className="text-[#D8C292]/80 hover:text-[#D8C292] transition-colors duration-300"
                  target={item.title === "Adresse" ? "_blank" : undefined}
                  rel={item.title === "Adresse" ? "noopener noreferrer" : undefined}
                >
                  {item.content}
                </a>
              ) : (
                <p className="text-[#D8C292]/80">{item.content}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-10">
        <h3 className="font-montaga text-xl text-[#D8C292] mb-4">Suivez-nous</h3>
        <div className="flex gap-4">
          {['facebook', 'twitter', 'instagram', 'linkedin'].map((social, index) => (
            <motion.a
              key={social}
              href={`#${social}`}
              className="w-10 h-10 rounded-full bg-[#D8C292]/10 text-[#D8C292] flex items-center justify-center hover:bg-[#D8C292] hover:text-[#293D36] transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <span className="sr-only">{social}</span>
              {/* Simple letter as placeholder for social icons */}
              {social.charAt(0).toUpperCase()}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default ContactInfo;