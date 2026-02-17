
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, ShieldAlert, CalendarX, FileText, Scale, Volume2, Leaf, Coffee, Camera, ShieldCheck } from "lucide-react";

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold font-headline mb-4 text-primary">Official Terms & Conditions</h1>
          <p className="text-muted-foreground">Vikas Bhawan Complex Auditorium, SAS Nagar. Dept. of Rural Development & Panchayats, Punjab.</p>
        </div>

        <Alert className="mb-8 border-primary bg-primary/5">
          <Info className="h-5 w-5 text-primary" />
          <AlertTitle className="text-primary font-bold">Online Booking Mandate</AlertTitle>
          <AlertDescription className="text-primary/80">
            Booking is purely on online mode. Verbal bookings are not accepted. Bookings must be initiated between 30 days and 12 months in advance.
          </AlertDescription>
        </Alert>

        <div className="space-y-12">
          {/* Statutory Requirements */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary text-white p-2 rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">Statutory Compliance</h2>
            </div>
            <Card className="border-none shadow-sm bg-accent/5 border-l-4 border-accent">
              <CardContent className="p-6">
                <p className="text-sm font-bold mb-4">Organizers must upload the following at least 4 days prior to the event:</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Police Permission (local SSP office)",
                    "Fire Safety Audit Checklist",
                    "Traffic Police NOC (for large gatherings)",
                    "IPRS Copyright License (if music/performance used)",
                    "Excise Permit (strictly for permitted Govt. events only)",
                    "Performance License (for theatrical plays)"
                  ].map((doc, i) => (
                    <li key={i} className="flex gap-3 text-xs font-medium">
                      <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Prohibited Actions */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary text-white p-2 rounded-lg">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">Strict Prohibitions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: <CalendarX className="h-4 w-4 text-destructive" />,
                  title: "No Subletting",
                  desc: "Booking is non-transferable. Subletting will result in immediate cancellation and forfeiture."
                },
                {
                  icon: <Volume2 className="h-4 w-4 text-destructive" />,
                  title: "Noise Control",
                  desc: "No use of loudspeakers outside the building. Interior sound must stay below 75dB."
                },
                {
                  icon: <Coffee className="h-4 w-4 text-destructive" />,
                  title: "Food & Alcohol",
                  desc: "Strictly NO eating inside the main hall. Consumption of alcohol or smoking is punishable by law."
                },
                {
                  icon: <Leaf className="h-4 w-4 text-destructive" />,
                  title: "Physical Damages",
                  desc: "No pasting of posters on walls, stage, or upholstery. Use of nails or adhesive is forbidden."
                }
              ].map((item, i) => (
                <Card key={i} className="border-none shadow-sm bg-destructive/5">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <CardTitle className="text-sm">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Allotment Rules */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary text-white p-2 rounded-lg">
                <Scale className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">Policy & Cancellations</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-bold">Slot Timelines & Handover</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Slot 1: 9 AM - 2 PM (Handover at 6:30 AM). Slot 2: 5 PM - 10 PM (Handover at 2:30 PM). Premise must be vacated 30 mins after slot end for vacuuming and preparation. Extension beyond 2 hours results in full day charge.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="font-bold">Cancellation & Forfeiture Policy</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  User Cancellation: Hire charges and security deposit stand 100% forfeited. Dept Cancellation: If cancelled for official exigencies, 100% hire/security is refunded (excluding statutory taxes) or alternate dates provided.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="font-bold">Reserved Seating & Capacity</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Total seating capacity is 750. 25 specific seats (labeled) are reserved for Departmental authorities. complimentary tickets/passes must be handed over 2 days prior to the event.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="font-bold">Refund of Security Deposit</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Security deposit will be processed back to original source within 15 working days post-event, subject to a clearance report from the Manager regarding damages or overtime use.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
      </main>
    </div>
  );
}
