"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, ShieldAlert, CalendarX, FileText, Scale } from "lucide-react";

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold font-headline mb-4">Official Booking Guidelines</h1>
          <p className="text-muted-foreground">Rules and regulations governing the allotment of state-owned venues.</p>
        </div>

        <Alert className="mb-8 border-primary bg-primary/5">
          <Info className="h-5 w-5 text-primary" />
          <AlertTitle className="text-primary font-bold">Effective Date</AlertTitle>
          <AlertDescription className="text-primary/80">
            These guidelines are effective as of January 1, 2024, and supersedes all previous government orders regarding auditorium allotment.
          </AlertDescription>
        </Alert>

        <div className="space-y-8">
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

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary text-white p-2 rounded-lg">
                <Scale className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">Booking Process & Priority</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-bold">Allotment Priority</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Priority is strictly followed: State Government Functions > Central Government Functions > Registered NGOs (Social/Educational) > Private Commercial Entities.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="font-bold">Cancellation Policy</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  The Government reserves the right to cancel any approved booking for administrative reasons or emergency state functions. In such cases, 100% of the rent and deposit will be refunded.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="font-bold">Security Deposit & Damages</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Security deposit is refundable within 7 working days post-event, subject to a clearance report from the Auditorium Manager. Damages to sound systems, stage, or seating will be deducted from the deposit.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary text-white p-2 rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">Mandatory Documents</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Authorized Signatory ID Proof",
                "Organization Registration Certificate",
                "Detailed Event Agenda",
                "Security Clearance for VIP Guests",
                "Indemnity Bond on Non-Judicial Paper"
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
