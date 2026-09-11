import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MobileCta } from "@/components/MobileCta";
import { Process } from "@/components/Process";
import { ServiceAreas } from "@/components/ServiceAreas";
import { Services } from "@/components/Services";
import { WhyUs } from "@/components/WhyUs";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Process />
        <ServiceAreas />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}
