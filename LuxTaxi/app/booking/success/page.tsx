import Link from "next/link";
import Stripe from "stripe";
import { CheckCircle2, XCircle } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

async function getSession(sessionId: string) {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    return await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return null;
  }
}

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const session = session_id ? await getSession(session_id) : null;
  const paid = session?.payment_status === "paid";

  return (
    <main>
      <Navbar transparent={false} />
      <section className="pt-40 pb-24 lg:pb-32 bg-card min-h-screen">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="flex flex-col items-center gap-8">
            <div
              className={`flex h-24 w-24 items-center justify-center rounded-full ${
                paid ? "bg-accent/10" : "bg-destructive/10"
              }`}
            >
              {paid ? (
                <CheckCircle2 className="h-12 w-12 text-accent" />
              ) : (
                <XCircle className="h-12 w-12 text-destructive" />
              )}
            </div>
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
                {paid ? "Payment Received" : "We Couldn't Confirm This Payment"}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
                {paid
                  ? "Thank you — your ride is booked. A confirmation email is on its way to you."
                  : "We couldn't verify this payment session. If you were charged, please contact us and we'll sort it out right away."}
              </p>
              {paid && session?.amount_total != null && (
                <p className="mt-4 text-foreground font-medium">
                  {(session.amount_total / 100).toLocaleString("nb-NO")} kr charged
                </p>
              )}
            </div>
            <Button
              asChild
              variant="outline"
              className="mt-4 border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300"
            >
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
