"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, ShieldAlert, CalendarX, FileText, Scale, Volume2, Leaf, Coffee, Camera, ShieldCheck, Clock, Users, ReceiptText, AlertTriangle } from "lucide-react";

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="mb-12 space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl shadow-lg">
              <ShieldCheck className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-black font-headline text-primary uppercase tracking-tighter">Official Terms & Conditions</h1>
          </div>
          <p className="text-xl text-muted-foreground font-bold pl-12 uppercase tracking-tight border-l-4 border-accent">
            750-Seater Auditorium, Vikas Bhawan Complex, SAS Nagar. <br />
            <span className="text-sm opacity-60">Dept. of Rural Development & Panchayats, Government of Punjab</span>
          </p>
        </div>

        <Alert className="mb-12 border-primary bg-primary/5 p-6 rounded-2xl shadow-sm">
          <Info className="h-6 w-6 text-primary" />
          <AlertTitle className="text-primary font-black text-xl uppercase tracking-tighter mb-2">Online Booking Mandate (SRS 1.1)</AlertTitle>
          <AlertDescription className="text-primary/80 font-bold leading-relaxed">
            Booking is purely on online mode through this authorized portal. Verbal bookings or manual applications are strictly rejected. 
            Bookings must be initiated between **30 days** and **12 months** in advance.
          </AlertDescription>
        </Alert>

        <div className="space-y-16">
          {/* Statutory Requirements */}
          <section className="space-y-8">
            <div className="flex items-center gap-4 border-b-4 border-primary/10 pb-4">
              <div className="bg-primary text-white p-3 rounded-2xl shadow-xl">
                <FileText className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-black uppercase text-primary">1. Statutory Compliance & Licensing</h2>
            </div>
            <Card className="border-none shadow-2xl bg-white rounded-3xl overflow-hidden">
              <CardContent className="p-10">
                <div className="mb-8 p-5 bg-destructive/5 border-l-8 border-destructive rounded-r-2xl">
                  <p className="text-sm font-black text-destructive uppercase tracking-widest">Mandatory Document Deadlines</p>
                  <p className="text-xs font-bold text-destructive/80 mt-1">Organizers MUST upload valid licenses at least 4 days prior to the event.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "Police Permission", desc: "Approved letter from local SSP office (SAS Nagar)." },
                    { title: "Fire Safety Audit", desc: "Completed checklist as per Municipal standards." },
                    { title: "Traffic Police NOC", desc: "Required for gatherings exceeding 500 persons." },
                    { title: "Copyright (IPRS)", desc: "Mandatory for music/performance involving intellectual property." },
                    { title: "Excise Permit", desc: "Strictly for permitted Govt. events only. No private consumption." },
                    { title: "Performance License", desc: "Required for commercial/ticketed theatrical plays." }
                  ].map((doc, i) => (
                    <div key={i} className="flex gap-4 p-5 border-2 border-primary/5 rounded-2xl bg-secondary/20">
                      <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
                      <div className="space-y-1">
                        <p className="text-sm font-black text-primary uppercase">{doc.title}</p>
                        <p className="text-xs font-bold text-muted-foreground leading-relaxed">{doc.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Strict Prohibitions */}
          <section className="space-y-8">
            <div className="flex items-center gap-4 border-b-4 border-primary/10 pb-4">
              <div className="bg-primary text-white p-3 rounded-2xl shadow-xl">
                <ShieldAlert className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-black uppercase text-primary">2. Operational Prohibitions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <CalendarX className="h-6 w-6 text-destructive" />,
                  title: "Strict No Subletting",
                  desc: "Booking is non-transferable. Subletting or misrepresentation of organization will result in immediate disqualification and total fee forfeiture."
                },
                {
                  icon: <Volume2 className="h-6 w-6 text-destructive" />,
                  title: "Noise Control Protocols",
                  desc: "Loudspeakers are prohibited outside the building. Interior sound levels must strictly stay below 75dB as per venue standards."
                },
                {
                  icon: <Coffee className="h-6 w-6 text-destructive" />,
                  title: "No Catering / Food / Alcohol",
                  desc: "Strictly NO eating inside the main hall. Consumption of alcohol, tobacco, or smoking is a legal offense on premises."
                },
                {
                  icon: <Leaf className="h-6 w-6 text-destructive" />,
                  title: "Zero Physical Alteration",
                  desc: "No pasting of posters on walls, stage, or upholstery. Use of nails, adhesives, or structural modifications is forbidden."
                }
              ].map((item, i) => (
                <Card key={i} className="border-none shadow-xl bg-destructive/5 rounded-3xl overflow-hidden hover:scale-105 transition-transform">
                  <CardHeader className="pb-4 pt-8">
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded-xl shadow-sm">{item.icon}</div>
                      <CardTitle className="text-lg font-black uppercase text-primary tracking-tighter">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs font-bold text-muted-foreground leading-relaxed px-8 pb-8">
                    {item.desc}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Policy & Cancellations */}
          <section className="space-y-8">
            <div className="flex items-center gap-4 border-b-4 border-primary/10 pb-4">
              <div className="bg-primary text-white p-3 rounded-2xl shadow-xl">
                <Scale className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-black uppercase text-primary">3. Policy, Slots & Penalties</h2>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border-2 border-primary/10 rounded-2xl px-6 bg-white shadow-sm overflow-hidden">
                <AccordionTrigger className="font-black text-primary uppercase text-sm hover:no-underline py-6">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-accent" />
                    Slot Timelines & Handover (SRS 2.0)
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-bold leading-relaxed pb-8 pl-8 text-xs uppercase tracking-tight">
                  Slot 1: 9:00 AM - 2:00 PM (Handover at 6:30 AM). <br />
                  Slot 2: 5:00 PM - 10:00 PM (Handover at 2:30 PM). <br />
                  Premise must be vacated strictly 30 mins after slot end for preparation. Extension beyond 2 hours results in automatic full-day rent charge.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-2 border-primary/10 rounded-2xl px-6 bg-white shadow-sm overflow-hidden">
                <AccordionTrigger className="font-black text-primary uppercase text-sm hover:no-underline py-6">
                  <div className="flex items-center gap-3">
                    <ReceiptText className="h-5 w-5 text-accent" />
                    Forfeiture & Refund Policy
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-bold leading-relaxed pb-8 pl-8 text-xs uppercase tracking-tight">
                  <span className="text-destructive font-black underline">User Cancellation:</span> All hire charges and security deposit stand 100% forfeited. <br />
                  <span className="text-green-700 font-black underline">Departmental Cancellation:</span> If cancelled for official state exigencies, 100% refund is issued or alternate dates provided.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-2 border-primary/10 rounded-2xl px-6 bg-white shadow-sm overflow-hidden">
                <AccordionTrigger className="font-black text-primary uppercase text-sm hover:no-underline py-6">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-accent" />
                    Seating Capacity & Reservation
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-bold leading-relaxed pb-8 pl-8 text-xs uppercase tracking-tight">
                  Total capacity is 750. Organizers must NOT issue more than 725 passes. 25 specific seats (marked) are reserved for Departmental Authorities. Complimentary tickets must be handed over 2 days prior to event.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-2 border-primary/10 rounded-2xl px-6 bg-white shadow-sm overflow-hidden">
                <AccordionTrigger className="font-black text-primary uppercase text-sm hover:no-underline py-6">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-accent" />
                    Collaboration & Standee Penalties
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-bold leading-relaxed pb-8 pl-8 text-xs uppercase tracking-tight">
                  Collaborations with other entities trigger a mandatory 10% rent surcharge. Sponsor standees (max 6&apos;x3&apos;) are charged at ₹2,000 per unit. Misrepresentation of these facts leads to immediate booking cancellation.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
      </main>
    </div>
  );
}
