"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ReceiptText, 
  Handshake, 
  Stamp, 
  Info, 
  ShieldCheck, 
  Landmark, 
  Building2, 
  User,
  AlertTriangle
} from "lucide-react";

export default function TariffPage() {
  const tariffs = [
    {
      category: "Category A",
      entity: "Govt. Departments / PSUs",
      rent: "₹ 5,000",
      deposit: "₹ 10,000",
      notes: "Subject to Section 4.1 Permitted Use",
      icon: <Landmark className="h-5 w-5" />
    },
    {
      category: "Category B",
      entity: "Registered NGOs / Schools",
      rent: "₹ 15,000",
      deposit: "₹ 20,000",
      notes: "80G/12A Verification Mandatory",
      icon: <Building2 className="h-5 w-5" />
    },
    {
      category: "Category C",
      entity: "Private / Corporate",
      rent: "₹ 50,000",
      deposit: "₹ 50,000",
      notes: "Commercial/Professional Shows",
      icon: <User className="h-5 w-5" />
    }
  ];

  const officialSurcharges = [
    { item: "Collaboration / Association", rate: "+ 10% Rent", sub: "Section 14.4: Higher rent applied for joint shows" },
    { item: "Sponsor Displays (Standees)", rate: "₹ 2,000 / Unit", sub: "Section 14.5: Per standee (Max 6'x3')" },
    { item: "Extended Hours", rate: "₹ 5,000 / Hour", sub: "Section 3.5: Max 2 hours; thereafter full-day charge" },
    { item: "Power Backup (DG Set)", rate: "As Notified", sub: "Section 10.4: Chargeable at prevailing rates" }
  ];

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar />
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="mb-16 text-center space-y-4">
          <div className="bg-primary text-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-2xl mb-6">
            <ReceiptText className="h-10 w-10" />
          </div>
          <h1 className="text-5xl font-black font-headline text-primary uppercase tracking-tighter">Official Tariff Card</h1>
          <p className="text-xl text-muted-foreground font-bold uppercase tracking-tight max-w-2xl mx-auto">Vikas Bhawan Complex Auditorium | Approved 2026-27 Rates</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white">
              <CardHeader className="bg-primary text-white py-10 px-10">
                <div className="flex items-center gap-4">
                  <ShieldCheck className="h-8 w-8 text-accent" />
                  <CardTitle className="text-2xl font-black uppercase">Standard Slot Hire (SRS 2026)</CardTitle>
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
                  <Stamp className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl font-black uppercase text-primary">Statutory Surcharges (Mandatory)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {officialSurcharges.map((u, i) => (
                    <div key={i} className="flex justify-between items-center p-6 border-2 border-primary/5 rounded-2xl bg-white shadow-sm hover:border-accent transition-colors group">
                      <div className="flex flex-col max-w-[60%]">
                        <span className="text-xs font-black uppercase text-primary tracking-tight group-hover:text-accent transition-colors">{u.item}</span>
                        <span className="text-[9px] font-bold text-muted-foreground uppercase leading-tight mt-1">{u.sub}</span>
                      </div>
                      <span className="text-sm font-black text-primary font-mono bg-secondary px-4 py-2 rounded-xl shrink-0">{u.rate}</span>
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
                  Financial Clauses
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-10 space-y-6 text-[11px] font-bold uppercase tracking-tight opacity-90 leading-relaxed">
                <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                  <p className="mb-2 text-accent">Section 2.2: Security Deposit</p>
                  <p>Refunded within 15 days after event, subject to damage assessment and utility dues.</p>
                </div>
                <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                  <p className="mb-2 text-accent">Section 13.2: Forfeiture</p>
                  <p>User cancellation or postponement leads to 100% forfeiture of rent and security deposit.</p>
                </div>
                <p>• GST (18%) added to final invoice as per Govt rules.</p>
                <p>• Bulk Discount: Flagged for &gt;10 functions/year (Section 1.5).</p>
              </CardContent>
            </Card>

            <div className="p-6 bg-destructive/10 border-2 border-destructive/20 rounded-2xl flex gap-4 shadow-inner">
              <AlertTriangle className="h-6 w-6 text-destructive shrink-0" />
              <p className="text-[9px] font-black text-destructive uppercase leading-tight">
                IMPORTANT: Section 14.6: If program is organized by a party other than the applicant, booking is cancelled with total forfeiture.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
