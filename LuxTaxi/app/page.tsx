import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Fleet } from "@/components/fleet";
import { Stats } from "@/components/stats";
import { BookingForm } from "@/components/booking-form";
import { Services } from "@/components/services";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Fleet />
      <Stats />
      <Services />
      <BookingForm />
      <Footer />
    </main>
  );
}
