import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

function ContactContent() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-center mb-10">
        <motion.h1 
          className="font-bebas text-4xl md:text-5xl lg:text-6xl text-[#D8C292] relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          contactez-nous
          <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#D8C292]/60 rounded-full"></span>
        </motion.h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
}

export default ContactContent;