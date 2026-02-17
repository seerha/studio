
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
  Info,
  Users,
  Building,
  Building2,
  AlertTriangle
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
        <section className="relative h-[650px] w-full flex items-center justify-center overflow-hidden">
          {heroImage?.imageUrl && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description || "Vikas Bhawan Auditorium"}
              fill
              priority
              className="object-cover brightness-50"
              data-ai-hint="auditorium stage"
            />
          )}
          <div className="container relative z-10 mx-auto px-4 text-center">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl font-headline">
              Vikas Bhawan Complex <br />
              <span className="text-accent">Official Booking Portal</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-200 md:text-xl">
              750-Seater Premium Auditorium at Sector-62, SAS Nagar. <br className="hidden md:block" />
              Authorized gateway for Government Departments and Registered Organizations.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 text-lg px-8 py-6 rounded-md shadow-lg font-bold" asChild>
                <Link href="/availability">Check Slot Availability <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6 rounded-md" asChild>
                <Link href="/auth/register">Apply for Verification</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Critical Notice Bar */}
        <div className="bg-destructive/10 border-y border-destructive/20 py-4">
          <div className="container mx-auto px-4 flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-destructive shrink-0" />
            <p className="text-sm font-bold text-destructive">
              CRITICAL NOTICE: Verbal bookings are strictly prohibited. All requests must be submitted online at least 30 days prior.
            </p>
          </div>
        </div>

        {/* Venue Overview Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 font-headline">Modern Venue Infrastructure</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Standardized amenities for professional conferences, cultural plays, and state functions.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Users className="h-10 w-10 text-primary" />,
                  title: "750 Capacity",
                  desc: "Strict limit of 750 persons. 25 specific seats reserved for Departmental authorities."
                },
                {
                  icon: <Clock className="h-10 w-10 text-primary" />,
                  title: "Two-Slot System",
                  desc: "Slot 1: 9:00 AM - 2:00 PM | Slot 2: 5:00 PM - 10:00 PM. No overlap permitted."
                },
                {
                  icon: <ShieldCheck className="h-10 w-10 text-primary" />,
                  title: "Statutory Compliance",
                  desc: "Mandatory Fire, Police, and Copyright licenses required 4 days before event."
                },
                {
                  icon: <Building className="h-10 w-10 text-primary" />,
                  title: "Tech Integrated",
                  desc: "Centralized HVAC, Professional Sound (75dB limit), and Basic Lighting included."
                }
              ].map((feature, idx) => (
                <Card key={idx} className="border-none shadow-sm bg-secondary/30 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl font-headline">{feature.title}</CardTitle>
                    <CardDescription className="text-sm text-foreground/70">{feature.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Strict Rules Section */}
        <section className="py-20 bg-background border-y">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold mb-6 font-headline">Mandatory Compliance Rules</h2>
                <div className="space-y-4">
                  {[
                    "Zero Plastic Zone: Single-use plastic is strictly banned.",
                    "No Catering Inside: Food consumption forbidden in main hall.",
                    "Vacuuming Requirement: Handover requires 30-min exit window.",
                    "Strict Cancellation: Fees forfeited for user cancellations.",
                    "Reserved Seating: 25 seats must remain vacant for authorities."
                  ].map((rule, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-lg bg-white shadow-sm border-l-4 border-accent">
                      <div className="flex-shrink-0 bg-accent/10 p-1.5 rounded-full">
                        <Info className="h-4 w-4 text-accent" />
                      </div>
                      <p className="text-sm font-medium">{rule}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Button variant="link" className="text-primary font-bold p-0" asChild>
                    <Link href="/guidelines">Read Complete Terms & Conditions (PDF)</Link>
                  </Button>
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  {symposiumImage?.imageUrl && (
                    <Image
                      src={symposiumImage.imageUrl}
                      alt={symposiumImage.description || "Auditorium Interior"}
                      width={600}
                      height={400}
                      className="object-cover"
                      data-ai-hint="conference hall"
                    />
                  )}
                </div>
                <div className="absolute -bottom-6 -right-6 bg-primary p-8 rounded-lg shadow-xl hidden sm:block">
                  <p className="text-accent font-bold text-3xl">30 Days</p>
                  <p className="text-white text-sm">Minimum Advance Booking</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Link */}
        <section className="py-20 bg-primary text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 font-headline text-white">Vikas Bhawan Complex, Sector-62</h2>
            <p className="mb-8 max-w-xl mx-auto text-primary-foreground/80 italic">SAS Nagar (Mohali), Punjab - 160062</p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 font-bold" asChild>
                <Link href="/tariff">View Official Tariff Card</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs">© 2026 Department of Rural Development & Panchayats, Government of Punjab.</p>
        </div>
      </footer>
    </div>
  );
}
