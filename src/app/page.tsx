import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  ShieldCheck, 
  CalendarCheck, 
  CreditCard, 
  Clock, 
  ArrowRight,
  Gavel,
  Users,
  Building,
  Building2
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-auditorium");
  const symposiumImage = PlaceHolderImages.find(img => img.id === "event-symposium");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] w-full flex items-center justify-center overflow-hidden">
          <Image
            src={heroImage?.imageUrl || ""}
            alt={heroImage?.description || "Auditorium"}
            fill
            priority
            className="object-cover brightness-50"
            data-ai-hint="auditorium stage"
          />
          <div className="container relative z-10 mx-auto px-4 text-center">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl font-headline">
              Official Government Auditorium <br />
              <span className="text-accent">Booking Portal</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-200 md:text-xl">
              A secure, digital gateway for government departments, NGOs, and citizens to book premium state venues for events, conferences, and cultural programs.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 text-lg px-8 py-6 rounded-md shadow-lg" asChild>
                <Link href="/auth/register">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6 rounded-md" asChild>
                <Link href="/availability">Check Availability</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 font-headline">Transparent & Verified Process</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Digitizing the venue lifecycle from registration to refund.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <ShieldCheck className="h-10 w-10 text-primary" />,
                  title: "Strict Verification",
                  desc: "Multi-tier identity and organization checks ensure prioritized access for authorized users."
                },
                {
                  icon: <CalendarCheck className="h-10 w-10 text-primary" />,
                  title: "Real-time Calendar",
                  desc: "Instant visibility into venue availability with tentative blocking to prevent conflicts."
                },
                {
                  icon: <CreditCard className="h-10 w-10 text-primary" />,
                  title: "Secure Payments",
                  desc: "Direct integration with Government Payment Gateways for rent and security deposits."
                },
                {
                  icon: <Clock className="h-10 w-10 text-primary" />,
                  title: "Automated Refunds",
                  desc: "Post-event clearance leads to immediate, automated processing of security deposits."
                }
              ].map((feature, idx) => (
                <Card key={idx} className="border-none shadow-sm bg-secondary/50 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl font-headline">{feature.title}</CardTitle>
                    <CardDescription className="text-base text-foreground/70">{feature.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-background border-y">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold mb-6 font-headline">User Categories & Priority</h2>
                <div className="space-y-6">
                  <div className="flex gap-4 p-4 rounded-lg bg-white shadow-sm border-l-4 border-primary">
                    <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                      <Building className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Category A: Govt. Departments</h4>
                      <p className="text-sm text-muted-foreground">Highest booking priority. Pay only standard maintenance fees. Direct allotment for state functions.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 rounded-lg bg-white shadow-sm border-l-4 border-accent">
                    <div className="flex-shrink-0 bg-accent/10 p-3 rounded-full">
                      <Users className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Category B: NGOs & Educational</h4>
                      <p className="text-sm text-muted-foreground">Medium priority. Eligible for subsidized tariff rates upon submission of valid documentation.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 rounded-lg bg-white shadow-sm border-l-4 border-gray-300">
                    <div className="flex-shrink-0 bg-gray-100 p-3 rounded-full">
                      <Gavel className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Category C: Private & Commercial</h4>
                      <p className="text-sm text-muted-foreground">Standard priority. Full commercial tariff applies for corporate events and private programs.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={symposiumImage?.imageUrl || ""}
                    alt="Symposium"
                    width={600}
                    height={400}
                    className="object-cover"
                    data-ai-hint="conference hall"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-accent p-6 rounded-lg shadow-xl hidden sm:block">
                  <p className="text-primary font-bold text-2xl">100% Digital</p>
                  <p className="text-primary/80">No more manual paperwork.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Public Availability CTA */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 font-headline text-white">Ready to plan your event?</h2>
            <p className="mb-8 max-w-xl mx-auto text-primary-foreground/80">View the master calendar to see live availability. Secure your preferred dates instantly with our streamlined portal.</p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-accent text-primary hover:bg-accent/90" asChild>
                <Link href="/availability">View Live Calendar</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-6 w-6 text-accent" />
                <span className="text-xl font-bold text-white font-headline">GovBook Portal</span>
              </div>
              <p className="text-sm leading-relaxed">
                The unified digital portal for managing bookings for government-owned auditoriums and state venues. Ensuring transparency, accountability, and efficiency.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/availability" className="hover:text-accent">Public Calendar</Link></li>
                <li><Link href="/guidelines" className="hover:text-accent">Booking Guidelines</Link></li>
                <li><Link href="/tariff" className="hover:text-accent">Tariff Structure</Link></li>
                <li><Link href="/help" className="hover:text-accent">Help & Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal & Compliance</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-accent">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-accent">Terms of Service</Link></li>
                <li><Link href="/refund-policy" className="hover:text-accent">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-xs">
            <p>© {new Date().getFullYear()} Government Information Technology Center. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
