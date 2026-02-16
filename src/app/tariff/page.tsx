"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReceiptText, Clock, Info } from "lucide-react";

export default function TariffPage() {
  const tariffs = [
    {
      category: "Category A",
      entity: "Govt. Departments / PSUs",
      rent: "₹ 5,000 / Day",
      deposit: "₹ 10,000",
      notes: "Maintenance fee only"
    },
    {
      category: "Category B",
      entity: "Registered NGOs / Schools",
      rent: "₹ 15,000 / Day",
      deposit: "₹ 20,000",
      notes: "Subsidized rate"
    },
    {
      category: "Category C",
      entity: "Private / Corporate",
      rent: "₹ 50,000 / Day",
      deposit: "₹ 50,000",
      notes: "Commercial rate"
    }
  ];

  const utilities = [
    { item: "Central Air Conditioning", rate: "₹ 2,000 / Hour" },
    { item: "Sound System (Standard)", rate: "Included in Rent" },
    { item: "LED Screen (Main Stage)", rate: "₹ 10,000 / Event" },
    { item: "Catering Cleanup Fee", rate: "₹ 2,500" },
    { item: "Extended Hours (Post 8PM)", rate: "₹ 5,000 / Hour" }
  ];

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold font-headline mb-2 text-primary">Standard Tariff Structure</h1>
          <p className="text-muted-foreground">Approved rates for auditorium rentals and auxiliary services.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-primary text-white rounded-t-lg">
                <div className="flex items-center gap-2">
                  <ReceiptText className="h-6 w-6" />
                  <CardTitle>Base Rental Fees</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/50">
                      <TableHead className="font-bold">Category</TableHead>
                      <TableHead className="font-bold">Rent (Daily)</TableHead>
                      <TableHead className="font-bold">Deposit</TableHead>
                      <TableHead className="font-bold">Remarks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tariffs.map((t, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <p className="font-bold text-primary">{t.category}</p>
                          <p className="text-[10px] text-muted-foreground uppercase">{t.entity}</p>
                        </TableCell>
                        <TableCell className="font-mono font-bold">{t.rent}</TableCell>
                        <TableCell className="font-mono">{t.deposit}</TableCell>
                        <TableCell className="text-xs italic">{t.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader className="bg-accent/10 border-b">
                <div className="flex items-center gap-2">
                  <Clock className="h-6 w-6 text-primary" />
                  <CardTitle className="text-primary">Utilities & Surcharges</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {utilities.map((u, i) => (
                    <div key={i} className="flex justify-between p-3 border rounded-lg bg-white shadow-sm">
                      <span className="text-sm font-medium">{u.item}</span>
                      <span className="text-sm font-bold text-primary">{u.rate}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-lg bg-primary text-white">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Important Note
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-4 text-primary-foreground/80 leading-relaxed">
                <p>• All prices are exclusive of 18% GST which will be added to the final invoice.</p>
                <p>• The daily rental period is defined as 09:00 AM to 08:00 PM.</p>
                <p>• Security deposit must be paid in full to confirm the booking allotment.</p>
                <p>• Refunds are processed back to the original source of payment only.</p>
              </CardContent>
            </Card>

            <div className="p-6 rounded-xl bg-accent/5 border border-accent/20">
              <h4 className="font-bold text-primary mb-2">Subsidy Eligibility</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Registered NGOs must provide valid 80G/12A certificates and evidence of educational or social impact to qualify for Category B rates. Final decision rests with the Allotment Committee.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
