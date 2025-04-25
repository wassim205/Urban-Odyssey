import { useState } from "react";
import { motion } from "framer-motion";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ isSubmitting: true, isSubmitted: false, error: null });
    
    // Simulate form submission
    try {
      // In a real implementation, you'd send the data to your backend
      // const response = await axios.post('/api/contact', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear the form after successful submission
      setFormData({ name: '', email: '', subject: '', message: '' });
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        error: null
      });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, isSubmitted: false }));
      }, 5000);
    } catch (error) {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: "Une erreur est survenue. Veuillez réessayer plus tard."
      });
    }
  };

  const formFields = [
    { name: 'name', label: 'Nom', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'subject', label: 'Sujet', type: 'text', required: true },
    { name: 'message', label: 'Message', type: 'textarea', required: true, rows: 5 }
  ];

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.5
      }
    })
  };

  return (
    <motion.div 
      className="bg-[#293D36]/30 backdrop-blur-sm p-8 rounded-xl border border-[#D8C292]/20"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-montaga text-2xl text-[#D8C292] mb-6">Envoyez-nous un message</h2>
      
      {formStatus.isSubmitted ? (
        <motion.div 
          className="bg-[#D8C292]/20 border border-[#D8C292]/40 text-[#D8C292] p-4 rounded-lg mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p>Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.</p>
        </motion.div>
      ) : formStatus.error ? (
        <motion.div 
          className="bg-red-500/20 border border-red-500/40 text-red-200 p-4 rounded-lg mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p>{formStatus.error}</p>
        </motion.div>
      ) : null}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {formFields.map((field, index) => (
          <motion.div 
            key={field.name}
            className="relative"
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={inputVariants}
          >
            <label 
              htmlFor={field.name} 
              className="block text-[#D8C292] font-montaga mb-2"
            >
              {field.label} {field.required && <span className="text-[#D8C292]/60">*</span>}
            </label>
            
            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
                rows={field.rows || 4}
                className="w-full px-4 py-3 bg-[#D8C292]/10 border border-[#D8C292]/30 rounded-lg text-[#D8C292] placeholder-[#D8C292]/50 focus:outline-none focus:ring-2 focus:ring-[#D8C292]/40 focus:border-transparent transition-colors duration-300"
                placeholder={`Votre ${field.label.toLowerCase()}...`}
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
                className="w-full px-4 py-3 bg-[#D8C292]/10 border border-[#D8C292]/30 rounded-lg text-[#D8C292] placeholder-[#D8C292]/50 focus:outline-none focus:ring-2 focus:ring-[#D8C292]/40 focus:border-transparent transition-colors duration-300"
                placeholder={`Votre ${field.label.toLowerCase()}...`}
              />
            )}
          </motion.div>
        ))}
        
        <motion.div
          custom={formFields.length}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={inputVariants}
        >
          <button
            type="submit"
            disabled={formStatus.isSubmitting}
            className="w-full bg-[#D8C292] hover:bg-[#D8C292]/90 text-[#293D36] font-montaga font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-70"
          >
            {formStatus.isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-[#293D36]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Envoi en cours...
              </>
            ) : "Envoyer le message"}
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
}

export default ContactForm;