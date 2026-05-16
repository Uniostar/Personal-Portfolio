import ContactSection from '../components/contact/ContactSection';

/* Wraps the contact section in a full-page layout with
   the same circuit-grid backdrop used on the hero. */
export default function Contact() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 circuit-grid pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-neon-purple/08 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-neon-cyan/06 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 pt-24">
        <ContactSection />
      </div>
    </div>
  );
}
