"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, ShieldAlert, CalendarX, FileText, Scale, Volume2, Leaf, Coffee, Camera } from "lucide-react";

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold font-headline mb-4">Official Booking Guidelines</h1>
          <p className="text-muted-foreground">Rules and regulations governing the allotment and usage of state-owned venues.</p>
        </div>

        <Alert className="mb-8 border-primary bg-primary/5">
          <Info className="h-5 w-5 text-primary" />
          <AlertTitle className="text-primary font-bold">Effective Date</AlertTitle>
          <AlertDescription className="text-primary/80">
            These guidelines are effective as of January 1, 2024, and supersedes all previous government orders regarding auditorium allotment.
          </AlertDescription>
        </Alert>

        <div className="space-y-12">
          {/* Prohibited Events */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary text-white p-2 rounded-lg">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">Prohibited Events</h2>
            </div>
            <Card className="border-none shadow-sm bg-destructive/5 border-l-4 border-destructive">
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {[
                    "Events of political nature, including rallies or party functions.",
                    "Religious congregations or ceremonies involving rituals.",
                    "Direct commercial product launches involving on-site retail sales.",
                    "Events inciting public disorder or violating local laws.",
                    "Personal family functions like weddings or birthday celebrations."
                  ].map((rule, i) => (
                    <li key={i} className="flex gap-3 text-sm text-foreground/80 leading-relaxed">
                      <CalendarX className="h-4 w-4 text-destructive shrink-0 mt-1" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Operational Protocols */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary text-white p-2 rounded-lg">
                <Volume2 className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">Operational Protocols</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-none shadow-sm bg-secondary/30">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-primary" />
                    <CardTitle className="text-sm">Noise Control</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground leading-relaxed">
                  Decibel levels must not exceed 75dB within the premises. Use of heavy amplifiers after 10:00 PM is strictly prohibited as per environmental regulations.
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-secondary/30">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-green-600" />
                    <CardTitle className="text-sm">Environmental Policy</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground leading-relaxed">
                  The auditorium is a "Zero Plastic Zone". Use of single-use plastic bottles, flex banners, or non-biodegradable decor is punishable by fine.
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-secondary/30">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Coffee className="h-4 w-4 text-amber-600" />
                    <CardTitle className="text-sm">Catering & Hygiene</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground leading-relaxed">
                  Food is strictly forbidden inside the main seating area. Catering is permitted only in designated dining halls using approved deep-cleaning protocols.
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-secondary/30">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-blue-500" />
                    <CardTitle className="text-sm">Photography & Media</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground leading-relaxed">
                  Official recordings require prior permit. Drone photography is restricted and requires explicit clearance from the Local Security Office.
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Booking Process & Priority */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary text-white p-2 rounded-lg">
                <Scale className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">Policy & Compliance</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-bold">Allotment Priority</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Priority is strictly followed: State Government Functions &gt; Central Government Functions &gt; Registered NGOs (Social/Educational) &gt; Private Commercial Entities. The Administrator reserves the right to override any booking for State Emergency use.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="font-bold">Cancellation & Force Majeure</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  The Government reserves the right to cancel any approved booking for administrative reasons or emergency state functions. In such cases, 100% of the rent and deposit will be refunded. User cancellations made less than 48 hours prior to the event are subject to a 50% rent forfeiture.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="font-bold">Security Deposit & Damage Assessment</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Security deposit is refundable within 7 working days post-event, subject to a clearance report from the Auditorium Manager. Damages to sound systems, stage, or seating will be deducted from the deposit as per the current PWD repair schedule.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="font-bold">VIP Security Clearance</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Events featuring high-risk VIPs or Foreign Diplomats must submit an 'Advanced Security Liaison' (ASL) report from the Special Intelligence Branch at least 72 hours before the event.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Mandatory Documents */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary text-white p-2 rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">Mandatory Documents</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Authorized Signatory ID Proof (Aadhar/Voter ID)",
                "Organization Registration Certificate (Society/GST)",
                "Detailed Event Agenda & Guest List",
                "Security Clearance for VIP Guests (Police SIB)",
                "Indemnity Bond on ₹100 Non-Judicial Stamp Paper",
                "Fire Safety Audit Clearance (for large gatherings)"
              ].map((doc, i) => (
                <div key={i} className="p-4 border rounded-lg flex items-center gap-3 bg-secondary/30">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-sm font-medium">{doc}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
