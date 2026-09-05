import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Oslo Limousine",
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

export default function PrivacyPage() {
  return (
    <main>
      <Navbar transparent={false} />
      <section className="pt-40 pb-16 bg-background">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-4">
            Legal
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-4">
            Last updated: [DATE — pending confirmation]
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            This is a draft. Bracketed placeholders below need to be confirmed
            or filled in before this page is treated as final.
          </p>

          <Section title="1. Who We Are">
            <p>
              This Privacy Policy explains how{" "}
              <strong className="text-foreground">
                [Legal company name, e.g. Oslo Limousine AS]
              </strong>
              , organization number{" "}
              <strong className="text-foreground">[Org. number]</strong>,
              registered at{" "}
              <strong className="text-foreground">
                [Registered business address]
              </strong>{" "}
              (&quot;Oslo Limousine&quot;, &quot;we&quot;, &quot;us&quot;)
              collects, uses, and protects your personal data when you use
              this website or book a ride with us. We are the data
              controller for the personal data described below.
            </p>
          </Section>

          <Section title="2. Data We Collect">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-foreground">Booking details:</strong>{" "}
                full name, email address, phone number, pickup and drop-off
                locations, date and time, vehicle type, passenger count, and
                any notes you provide.
              </li>
              <li>
                <strong className="text-foreground">Payment data:</strong> if
                you choose to pay online, your card and billing details are
                collected and processed directly by our payment provider,
                Stripe — we do not store your full card details ourselves.
              </li>
              <li>
                <strong className="text-foreground">Address & route data:</strong>{" "}
                for distance-based bookings, the pickup and destination
                addresses you enter are sent to Google Maps to show the route
                and calculate distance-based pricing.
              </li>
              <li>
                <strong className="text-foreground">
                  Website usage data:
                </strong>{" "}
                your selected language preference, and [any analytics tool in
                use — currently none integrated; update if one is added].
              </li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Data">
            <p>We use your personal data to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Confirm, schedule, and provide your booked transport;</li>
              <li>Contact you about your booking (confirmation, changes, chauffeur details);</li>
              <li>Process payment for the ride, via our payment provider;</li>
              <li>Comply with legal and accounting obligations (e.g. invoicing records); and</li>
              <li>
                [If applicable] send you offers or updates about our
                services, only with your consent.
              </li>
            </ul>
            <p>
              The legal basis for this processing is performance of a
              contract with you (fulfilling your booking), our legitimate
              interest in running and improving our business, compliance
              with legal obligations, and — for any marketing — your
              consent.
            </p>
          </Section>

          <Section title="4. Who We Share Data With">
            <p>
              We share personal data only where necessary, with:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Our chauffeurs, to carry out your booked ride;</li>
              <li>
                <strong className="text-foreground">Resend</strong>, to send
                transactional booking emails;
              </li>
              <li>
                <strong className="text-foreground">Stripe</strong>, to
                process online payments;
              </li>
              <li>
                <strong className="text-foreground">Google Maps</strong>, to
                geocode addresses, display the route, and calculate
                distance-based pricing;
              </li>
              <li>
                <strong className="text-foreground">[Hosting provider, e.g. Vercel]</strong>,
                which hosts this website; and
              </li>
              <li>
                Public authorities, where required by law.
              </li>
            </ul>
            <p>
              Some of these providers may process data outside Norway/the
              EEA (for example, in the United States). Where that happens, we
              rely on appropriate safeguards such as the EU Standard
              Contractual Clauses.
            </p>
          </Section>

          <Section title="5. How Long We Keep Your Data">
            <p>
              We keep booking and payment records for{" "}
              <strong className="text-foreground">
                [retention period — e.g. 5 years, to satisfy Norwegian
                bookkeeping law (bokføringsloven) — confirm]
              </strong>
              . If you contact us but don&apos;t book a ride, we delete your
              details within{" "}
              <strong className="text-foreground">[period — confirm]</strong>{" "}
              unless you ask us to keep them.
            </p>
          </Section>

          <Section title="6. Your Rights">
            <p>
              Under the GDPR, you have the right to request access to,
              correction of, or deletion of your personal data, to restrict
              or object to our processing, and to receive your data in a
              portable format. To exercise any of these rights, contact us at{" "}
              <a
                href="mailto:theoslolimousine@gmail.com"
                className="text-foreground underline underline-offset-4"
              >
                theoslolimousine@gmail.com
              </a>
              . You also have the right to lodge a complaint with the
              Norwegian Data Protection Authority (Datatilsynet).
            </p>
          </Section>

          <Section title="7. Cookies">
            <p>
              This website uses only the storage strictly necessary for it to
              function (such as remembering your language preference in your
              browser). [Update this section if analytics or marketing
              cookies are added in the future, and add a cookie consent
              banner if required.]
            </p>
          </Section>

          <Section title="8. Security">
            <p>
              We take reasonable technical and organizational measures to
              protect your personal data against unauthorized access, loss,
              or misuse.
            </p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. The
              updated version will be posted on this page with a new
              &quot;last updated&quot; date.
            </p>
          </Section>

          <Section title="10. Contact">
            <p>
              For any privacy questions or requests, contact us at{" "}
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
