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
  Building2,
  AlertTriangle,
  FileText,
  Download,
  Ban
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
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-200 md:text-xl font-medium">
              750-Seater Auditorium | Sector-62, SAS Nagar. <br className="hidden md:block" />
              Department of Rural Development & Panchayats, Government of Punjab.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 text-lg px-8 py-7 rounded-md shadow-2xl font-bold uppercase tracking-wider" asChild>
                <Link href="/availability">Check Slot Availability <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-7 rounded-md font-bold" asChild>
                <Link href="/auth/register">Apply for Verification</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Critical Notice Bar */}
        <div className="bg-destructive/15 border-y border-destructive/20 py-5">
          <div className="container mx-auto px-4 flex items-center gap-4">
            <div className="bg-destructive p-1.5 rounded-full">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            <p className="text-sm font-black text-destructive uppercase tracking-tight">
              SECTION 1.1 MANDATE: Verbal bookings are strictly prohibited. Bookings accepted only via online portal at least 30 days prior.
            </p>
          </div>
        </div>

        {/* Venue Overview Grid */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-black font-headline text-primary uppercase">Official Venue Standards</h2>
              <div className="w-24 h-1 bg-accent mx-auto"></div>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Enforcing Section 3, 7, and 8 of the Official Terms & Conditions for Vikas Bhawan Complex.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Users className="h-10 w-10 text-primary" />,
                  title: "750 Capacity",
                  desc: "Strictly enforced. 25 seats reserved for Departmental Authorities as per Section 8.2."
                },
                {
                  icon: <Clock className="h-10 w-10 text-primary" />,
                  title: "Defined Slots",
                  desc: "Slot 1: 9 AM - 2 PM | Slot 2: 5 PM - 10 PM. Handover 2.5 hours prior (Section 3.3)."
                },
                {
                  icon: <ShieldCheck className="h-10 w-10 text-primary" />,
                  title: "Statutory Permits",
                  desc: "Police, Fire, and Copyright licences must be submitted 4 days prior (Section 6.3)."
                },
                {
                  icon: <Ban className="h-10 w-10 text-primary" />,
                  title: "Strict Prohibitions",
                  desc: "No food/catering inside the hall. No smoking/alcohol. Zero tolerance (Section 11)."
                }
              ].map((feature, idx) => (
                <Card key={idx} className="border-none shadow-lg bg-secondary/30 hover:-translate-y-2 transition-transform duration-300">
                  <CardHeader>
                    <div className="mb-4 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm">{feature.icon}</div>
                    <CardTitle className="text-xl font-headline font-black uppercase tracking-tight">{feature.title}</CardTitle>
                    <CardDescription className="text-sm text-foreground/70 leading-relaxed font-bold uppercase text-[10px]">{feature.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Strict Prohibitions & Liabilities */}
        <section className="py-24 bg-secondary/40 border-y">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 space-y-8">
                <h2 className="text-3xl font-black font-headline text-primary uppercase">Critical Organiser Responsibilities</h2>
                <div className="space-y-4">
                  {[
                    "Section 11.8: Catering strictly prohibited inside the auditorium premises.",
                    "Section 14.4: 10% rent surcharge applied for any Collaboration/Association.",
                    "Section 14.5: Sponsor standees limited to 6'x3' size (₹2,000 per unit).",
                    "Section 3.6: Extension beyond 2 hours billed as a full-day booking.",
                    "Section 13.2: User cancellations result in 100% forfeiture of all fees."
                  ].map((rule, idx) => (
                    <div key={idx} className="flex gap-4 p-5 rounded-xl bg-white shadow-sm border-l-8 border-accent">
                      <div className="flex-shrink-0 bg-accent/20 p-2 rounded-full">
                        <Info className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-xs font-black text-primary/80 uppercase tracking-tight">{rule}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button variant="outline" className="border-primary text-primary font-bold px-6 py-6 rounded-xl" asChild>
                    <Link href="/guidelines"><FileText className="mr-2 h-5 w-5" /> Terms & Conditions (PDF)</Link>
                  </Button>
                  <Button variant="outline" className="border-primary text-primary font-bold px-6 py-6 rounded-xl" asChild>
                    <Link href="/guidelines"><Download className="mr-2 h-5 w-5" /> Mandatory Forms</Link>
                  </Button>
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
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
                <div className="absolute -bottom-8 -right-8 bg-primary p-10 rounded-2xl shadow-2xl hidden sm:block border-b-8 border-accent">
                  <p className="text-accent font-black text-4xl mb-1">30 DAYS</p>
                  <p className="text-white text-xs font-bold uppercase tracking-widest opacity-80">Min. Advance (Sec 1.1)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Contact */}
        <section className="py-24 bg-primary text-white text-center">
          <div className="container mx-auto px-4 space-y-6">
            <h2 className="text-4xl font-black font-headline text-white uppercase tracking-tight">Vikas Bhawan Complex, Sector-62</h2>
            <p className="max-w-xl mx-auto text-primary-foreground/80 font-medium italic text-lg">SAS Nagar (Mohali), Punjab - 160062</p>
            <div className="flex justify-center gap-6 pt-4">
              <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 font-bold px-10 py-7 text-lg shadow-xl uppercase tracking-widest" asChild>
                <Link href="/tariff">Official Tariff Card</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-950 text-gray-400 py-16 border-t-4 border-accent">
        <div className="container mx-auto px-4 text-center space-y-4">
          <div className="flex justify-center mb-6">
            <Building2 className="h-10 w-10 text-accent/50" />
          </div>
          <p className="text-sm font-black uppercase tracking-widest text-gray-200">Department of Rural Development & Panchayats</p>
          <p className="text-xs opacity-60">Government of Punjab, SAS Nagar. Authorized Personnel Access Only.</p>
          <p className="text-[10px] mt-8 opacity-40 uppercase tracking-tighter">© {new Date().getFullYear()} Official State Booking Portal. Sections 1-15 strictly applied.</p>
        </div>
      </footer>
    </div>
  );
}
