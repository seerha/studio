"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReceiptText, Clock, Info, ShieldCheck, Landmark, Building2, User } from "lucide-react";

export default function TariffPage() {
  const tariffs = [
    {
      category: "Category A",
      entity: "Govt. Departments / PSUs",
      rent: "₹ 5,000",
      deposit: "₹ 10,000",
      notes: "Official maintenance fee only",
      icon: <Landmark className="h-5 w-5" />
    },
    {
      category: "Category B",
      entity: "Registered NGOs / Schools",
      rent: "₹ 15,000",
      deposit: "₹ 20,000",
      notes: "Subsidized cultural rate",
      icon: <Building2 className="h-5 w-5" />
    },
    {
      category: "Category C",
      entity: "Private / Corporate",
      rent: "₹ 50,000",
      deposit: "₹ 50,000",
      notes: "Commercial market rate",
      icon: <User className="h-5 w-5" />
    }
  ];

  const utilities = [
    { item: "Central Air Conditioning", rate: "₹ 2,000 / Hour", sub: "Mandatory for Slot 2" },
    { item: "Collaboration Surcharge", rate: "+ 10% Rent", sub: "Joint events only" },
    { item: "Sponsor Standees (6'x3')", rate: "₹ 2,000 / Unit", sub: "Max 10 units" },
    { item: "Extended Hours", rate: "₹ 5,000 / Hour", sub: "Max 2 hours extension" },
    { item: "Cleaning & Vacuuming", rate: "₹ 2,500", sub: "Mandatory post-event" }
  ];

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar />
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="mb-16 text-center space-y-4">
          <div className="bg-primary text-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-2xl mb-6">
            <ReceiptText className="h-10 w-10" />
          </div>
          <h1 className="text-5xl font-black font-headline text-primary uppercase tracking-tighter">Approved Official Tariff</h1>
          <p className="text-xl text-muted-foreground font-bold uppercase tracking-tight max-w-2xl mx-auto">Standardized rental rates for Vikas Bhawan Complex Auditorium (SAS Nagar).</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white">
              <CardHeader className="bg-primary text-white py-10 px-10">
                <div className="flex items-center gap-4">
                  <ShieldCheck className="h-8 w-8 text-accent" />
                  <CardTitle className="text-2xl font-black uppercase">Slot Hire Charges (SRS 2026)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/50 border-b-2 hover:bg-secondary/50">
                      <TableHead className="font-black uppercase text-[10px] tracking-widest py-8 px-10">Requester Category</TableHead>
                      <TableHead className="font-black uppercase text-[10px] tracking-widest">Base Rent</TableHead>
                      <TableHead className="font-black uppercase text-[10px] tracking-widest">Security Deposit</TableHead>
                      <TableHead className="font-black uppercase text-[10px] tracking-widest px-10">Remarks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tariffs.map((t, i) => (
                      <TableRow key={i} className="hover:bg-secondary/10 transition-colors">
                        <TableCell className="py-8 px-10">
                          <div className="flex items-center gap-4">
                            <div className="bg-primary/5 p-2 rounded-xl text-primary">{t.icon}</div>
                            <div className="flex flex-col">
                              <p className="font-black text-primary uppercase text-sm">{t.category}</p>
                              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">{t.entity}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono font-black text-primary">₹ {t.rent}</TableCell>
                        <TableCell className="font-mono font-bold text-muted-foreground">₹ {t.deposit}</TableCell>
                        <TableCell className="text-[10px] font-bold uppercase italic px-10 text-primary/60">{t.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white border-t-8 border-accent">
              <CardHeader className="bg-secondary/40 border-b-2 py-8 px-10">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl font-black uppercase text-primary">Utilities & Surcharges</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {utilities.map((u, i) => (
                    <div key={i} className="flex justify-between items-center p-6 border-2 border-primary/5 rounded-2xl bg-white shadow-sm hover:border-accent transition-colors group">
                      <div className="flex flex-col">
                        <span className="text-xs font-black uppercase text-primary tracking-tight group-hover:text-accent transition-colors">{u.item}</span>
                        <span className="text-[9px] font-bold text-muted-foreground uppercase">{u.sub}</span>
                      </div>
                      <span className="text-sm font-black text-primary font-mono bg-secondary px-4 py-2 rounded-xl">{u.rate}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="border-none shadow-2xl bg-primary text-white rounded-3xl overflow-hidden border-b-8 border-accent">
              <CardHeader className="py-8 px-8">
                <CardTitle className="text-xl font-black flex items-center gap-3 uppercase tracking-tight">
                  <Info className="h-6 w-6 text-accent" />
                  Financial Mandates
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-10 space-y-6 text-[11px] font-bold uppercase tracking-tight opacity-90 leading-relaxed">
                <p className="p-4 bg-white/10 rounded-2xl border border-white/20">
                  • Statutory GST (18%) will be added to the final consolidated invoice.
                </p>
                <p>• Daily rental period is strictly per slot: 09:00 AM – 02:00 PM or 05:00 PM – 10:00 PM.</p>
                <p>• 100% Hire Charges & Deposit must be paid to confirm the allotment slot.</p>
                <p>• Misrepresentation of organizational category will result in immediate cancellation without refund.</p>
                <p className="text-accent font-black">
                  • Security deposit refunds are processed within 15 working days post-event clearance.
                </p>
              </CardContent>
            </Card>

            <div className="p-8 rounded-3xl bg-white border-2 border-primary/5 shadow-xl space-y-4">
              <h4 className="font-black text-primary uppercase text-sm tracking-widest border-b pb-2">Subsidy Audit</h4>
              <p className="text-[10px] text-muted-foreground font-bold leading-relaxed uppercase">
                Category B applicants MUST upload valid 80G/12A certificates and evidence of educational impact. Failure to provide documentation triggers automatic upgrade to Category C rates.
              </p>
            </div>

            <div className="p-6 bg-destructive/10 border-2 border-destructive/20 rounded-2xl flex gap-4 shadow-inner">
              <Info className="h-6 w-6 text-destructive shrink-0" />
              <p className="text-[9px] font-black text-destructive uppercase leading-tight">
                NOTICE: Rates are revised annually by the Allotment Committee. Current rates valid until March 2027.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
