"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  ShieldCheck, 
  Info, 
  Scale, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Users, 
  Zap, 
  Ban, 
  Gavel, 
  Handshake, 
  CreditCard 
} from "lucide-react";

export default function GuidelinesPage() {
  const sections = [
    {
      id: "sec-1",
      title: "1. Booking, Confirmation & Advance",
      icon: <FileText className="h-5 w-5" />,
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Booking shall be made in the prescribed format at least 30 days prior to the event date.</li>
          <li>Bookings are accepted only through this official online portal.</li>
          <li>Confirmation is subject to receipt of full payment of hire charges, taxes, and security deposit.</li>
          <li>Maximum advance booking allowed is 12 months.</li>
          <li>Bulk bookings (more than 10 functions/year) may attract special discounts as notified.</li>
        </ul>
      )
    },
    {
      id: "sec-2",
      title: "2. Payment & Refund Terms",
      icon: <CreditCard className="h-5 w-5" />,
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Full payment (hire charges + security + utilities) is mandatory for confirmation.</li>
          <li>Security deposit is refunded within 15 days post-event after adjusting dues/damages.</li>
          <li>Departmental cancellations for official reasons trigger 100% refund or alternate date.</li>
          <li>User cancellations are governed by strict forfeiture policies.</li>
        </ul>
      )
    },
    {
      id: "sec-3",
      title: "3. Availability, Slots & Timing",
      icon: <Clock className="h-5 w-5" />,
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Slot 1:</strong> 9:00 AM to 2:00 PM | <strong>Slot 2:</strong> 5:00 PM to 10:00 PM.</li>
          <li>Handover: Exactly 2½ hours prior to the scheduled programme.</li>
          <li>Vacation: Premises must be cleared within 30 minutes after completion.</li>
          <li>Extension beyond 2 additional hours (if permitted) is charged as a full-day booking.</li>
        </ul>
      )
    },
    {
      id: "sec-5",
      title: "5 & 6. Statutory Permissions & Copyright",
      icon: <ShieldCheck className="h-5 w-5" />,
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Organiser must obtain Police, Fire, Copyright (IPRS), and Traffic clearances.</li>
          <li><strong>Deadline:</strong> Copies of all licences must be submitted at least 4 days prior to the event.</li>
          <li>No programme involving copyright infringement is permitted.</li>
        </ul>
      )
    },
    {
      id: "sec-8",
      title: "8. Maximum Capacity & Safety",
      icon: <Users className="h-5 w-5" />,
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Strict Capacity:</strong> 750 persons maximum. This shall not be exceeded.</li>
          <li><strong>Reserved Seats:</strong> 25 seats are reserved for the Department.</li>
          <li>Invitation cards/passes for these 25 seats must be handed over 2 days prior.</li>
        </ul>
      )
    },
    {
      id: "sec-11",
      title: "11. Prohibitions (Strictly Enforced)",
      icon: <Ban className="h-5 w-5" />,
      content: (
        <ul className="list-disc pl-5 space-y-2 text-destructive font-bold">
          <li>Open fire, fireworks, inflammable material, and weapons are banned.</li>
          <li>NO SMOKING, NO ALCOHOL, NO SPITTING.</li>
          <li>NO EATING INSIDE THE HALL. (Catering strictly prohibited on premises).</li>
          <li>No loudspeakers allowed outside the building.</li>
          <li>No standing or dancing on chairs or in front of VIP rows.</li>
          <li>No bags or briefcases allowed inside the hall.</li>
        </ul>
      )
    },
    {
      id: "sec-14",
      title: "14. General Conditions & Surcharges",
      icon: <Handshake className="h-5 w-5" />,
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Collaboration/Association: Requires prior approval. Triggers a <strong>10% higher rent</strong>.</li>
          <li>Sponsor Standees: Max size 6’ × 3’. Additional charge of <strong>₹2,000 per standee</strong>.</li>
          <li>Misrepresentation: Booking via a third party or misrepresenting organization leads to immediate cancellation and forfeiture.</li>
        </ul>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-10 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black font-headline text-primary uppercase tracking-tighter">Official Terms & Conditions</h1>
          <p className="text-lg text-muted-foreground font-bold border-y py-2 border-primary/10">Vikas Bhawan Complex Auditorium | Dept. of Rural Development & Panchayats, Punjab</p>
        </div>

        <Alert className="mb-10 border-primary bg-primary/5 p-6 rounded-2xl shadow-sm">
          <AlertTriangle className="h-6 w-6 text-primary" />
          <AlertTitle className="text-primary font-black uppercase text-lg">Statutory Warning</AlertTitle>
          <AlertDescription className="text-primary/80 font-bold leading-relaxed">
            Verbal bookings are NOT accepted. All usage is governed by the Interpretation and Amendments clause (Section 15), where the decision of the Competent Authority is final and binding.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 gap-12">
          <section className="space-y-6">
            <h2 className="text-2xl font-black uppercase text-primary border-l-4 border-accent pl-4">Key Operational Mandates</h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {sections.map((sec) => (
                <AccordionItem key={sec.id} value={sec.id} className="border-2 border-primary/5 rounded-2xl px-6 bg-white shadow-sm overflow-hidden">
                  <AccordionTrigger className="hover:no-underline py-6">
                    <div className="flex items-center gap-4 text-primary font-black uppercase text-sm tracking-tight text-left">
                      <div className="bg-secondary p-2 rounded-xl text-primary">{sec.icon}</div>
                      {sec.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 pl-12 text-muted-foreground font-bold text-xs uppercase tracking-tight leading-relaxed">
                    {sec.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section className="bg-secondary/30 p-8 rounded-3xl border-2 border-dashed border-primary/10">
            <div className="flex items-center gap-3 mb-6">
              <Gavel className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-black uppercase text-primary">Interpretation & Liability</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[11px] font-bold uppercase tracking-tight text-muted-foreground/80 leading-relaxed">
              <div className="space-y-4">
                <p>• The Organiser shall indemnify the Department against all claims, damages, and liabilities arising from the event.</p>
                <p>• The Department shall not be liable for any injury or loss of property belonging to organizers or audience.</p>
              </div>
              <div className="space-y-4">
                <p>• Misrepresentation of booking purpose results in 100% forfeiture of rent and security deposit.</p>
                <p>• The Department reserves the right to relax or amend any condition at its discretion for official exigencies.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
