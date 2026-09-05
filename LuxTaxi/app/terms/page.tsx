import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms of Service | Oslo Limousine",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="py-8 border-b border-border last:border-b-0">
      <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
        {title}
      </h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <main>
      <Navbar transparent={false} />
      <section className="pt-40 pb-16 bg-background">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-4">
            Legal
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground mb-4">
            Last updated: [DATE — pending confirmation]
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            This is a draft. Bracketed placeholders below need to be confirmed
            or filled in before this page is treated as final.
          </p>

          <Section title="1. About These Terms">
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your use of the
              website and booking services provided by{" "}
              <strong className="text-foreground">
                [Legal company name, e.g. Oslo Limousine AS]
              </strong>
              , organization number{" "}
              <strong className="text-foreground">[Org. number]</strong>,
              registered at{" "}
              <strong className="text-foreground">
                [Registered business address]
              </strong>{" "}
              (&quot;Oslo Limousine&quot;, &quot;we&quot;, &quot;us&quot;). By
              submitting a booking request through this website, you agree to
              these Terms.
            </p>
          </Section>

          <Section title="2. Our Services">
            <p>
              Oslo Limousine provides chauffeured passenger transport in and
              around Oslo, Norway, including airport transfers, hourly
              charters, corporate and event transport, and custom
              multi-vehicle transport for larger groups.
            </p>
          </Section>

          <Section title="3. Bookings">
            <p>
              Booking requests must be submitted at least 24 hours before the
              scheduled ride. Submitting the booking form is a request, not a
              confirmed reservation — our team will contact you to confirm
              availability, typically within 30 minutes during business
              hours.
            </p>
            <p>
              Please ensure the pickup location, drop-off location, date,
              time, and passenger count you provide are accurate. Additional
              waiting time, extra stops, or a change in passenger count may
              affect the final fare.
            </p>
          </Section>

          <Section title="4. Pricing & Payment">
            <p>
              Current rates for each vehicle category are published on our{" "}
              <a href="/pricing" className="text-foreground underline underline-offset-4">
                Pricing
              </a>{" "}
              page and form part of these Terms. Standard rides are charged
              based on a base fare plus a per-kilometer and per-minute rate,
              subject to the listed minimum fare. Hourly charters and
              Gardemoen Airport transfers are charged at the published fixed
              rate; if a Gardemoen trip continues beyond Oslo, the fare is
              adjusted based on the actual destination. All prices are in
              Norwegian kroner (NOK) and include VAT unless stated otherwise.
            </p>
            <p>
              Payment must be completed at least 5 hours before your
              scheduled ride[, using our online payment provider, Stripe —
              pending confirmation of final payment flow]. [Describe accepted
              payment methods and whether a deposit or full fare is charged
              at booking.]
            </p>
          </Section>

          <Section title="5. Cancellations, Changes & No-Shows">
            <p>
              [Placeholder — needs your cancellation policy, e.g.: Cancellations
              made more than 24 hours before pickup are free of charge.
              Cancellations made within 24 hours may be charged [X]% of the
              fare. A no-show, or failure to be reachable at the pickup
              location for more than [X] minutes, may be charged the full
              fare.]
            </p>
          </Section>

          <Section title="6. Passenger Conduct">
            <p>
              Passengers are expected to treat our chauffeurs and vehicles
              with respect. We reserve the right to refuse or end a ride, at
              our discretion and without refund, in cases of abusive
              behavior, intoxication that endangers safety, or damage to the
              vehicle. Any cost of damage or required cleaning caused by a
              passenger may be charged to the passenger.
            </p>
          </Section>

          <Section title="7. Liability">
            <p>
              We carry [insurance type / policy details — pending
              confirmation] for our vehicles and passengers as required under
              Norwegian law. To the extent permitted by law, Oslo Limousine is
              not liable for indirect losses (such as missed flights or
              connections) except where caused by our gross negligence or
              willful misconduct. Nothing in these Terms limits liability
              that cannot be excluded under Norwegian law.
            </p>
          </Section>

          <Section title="8. Force Majeure">
            <p>
              We are not liable for delays or failure to perform caused by
              circumstances beyond our reasonable control, including severe
              weather, road closures, traffic accidents, or other events
              outside our control.
            </p>
          </Section>

          <Section title="9. Governing Law & Disputes">
            <p>
              These Terms are governed by Norwegian law. Any dispute that
              cannot be resolved directly shall be subject to the exclusive
              jurisdiction of the Norwegian courts, with{" "}
              <strong className="text-foreground">[Oslo District Court — confirm]</strong>{" "}
              as the agreed venue.
            </p>
          </Section>

          <Section title="10. Changes to These Terms">
            <p>
              We may update these Terms from time to time. The updated
              version will be posted on this page with a new &quot;last
              updated&quot; date and applies to bookings made after that
              date.
            </p>
          </Section>

          <Section title="11. Contact">
            <p>
              Questions about these Terms can be sent to{" "}
              <a
                href="mailto:theoslolimousine@gmail.com"
                className="text-foreground underline underline-offset-4"
              >
                theoslolimousine@gmail.com
              </a>{" "}
              or +47 484 20 389.
            </p>
          </Section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
