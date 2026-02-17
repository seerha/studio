"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, CalendarDays, Lock, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { addDays, isBefore } from "date-fns";

export default function AvailabilityPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [pendingDates, setPendingDates] = useState<Date[]>([]);

  const minBookingDate = addDays(new Date(), 30);

  useEffect(() => {
    // Sync with Admin Dashboard's blocks
    const savedBlocks = localStorage.getItem("govbook_blocked_dates");
    if (savedBlocks) {
      const parsed = JSON.parse(savedBlocks).map((b: any) => new Date(b.date));
      setBlockedDates(parsed);
    }

    // Mock pending dates
    setPendingDates([
      new Date(2025, 2, 20),
      new Date(2025, 2, 25),
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <p className="text-sm font-bold text-destructive uppercase tracking-tight">
            System Rule: Dates before {minBookingDate.toLocaleDateString()} are locked as per the 30-day minimum advance booking mandate.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Card className="shadow-2xl border-none">
              <CardHeader className="bg-primary text-primary-foreground rounded-t-xl py-8">
                <div className="flex items-center gap-3">
                  <div className="bg-accent p-2 rounded-lg">
                    <CalendarDays className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black uppercase tracking-tight">Public Availability Calendar</CardTitle>
                    <CardDescription className="text-primary-foreground/70">
                      SAS Nagar Auditorium | Verified Booking Slots Only
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-12">
                  <div className="flex-1 flex justify-center scale-110 origin-top">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => isBefore(date, minBookingDate)}
                      className="rounded-xl border-2 border-primary/5 shadow-xl p-4"
                      modifiers={{
                        booked: blockedDates,
                        pending: pendingDates,
                      }}
                      modifiersStyles={{
                        booked: { backgroundColor: 'hsl(var(--destructive))', color: 'white', borderRadius: '4px', fontWeight: 'bold' },
                        pending: { backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--primary))', borderRadius: '4px', fontWeight: 'bold' },
                      }}
                    />
                  </div>
                  <div className="md:w-72 space-y-8">
                    <div className="space-y-4">
                      <h4 className="font-black text-xs uppercase tracking-widest text-muted-foreground border-b pb-2">Status Legend</h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 group">
                          <div className="h-6 w-6 bg-white border-2 border-primary/20 rounded shadow-sm group-hover:border-primary transition-colors"></div>
                          <span className="text-sm font-bold text-primary/80">Available (Open Slot)</span>
                        </div>
                        <div className="flex items-center gap-4 group">
                          <div className="h-6 w-6 bg-accent rounded shadow-sm"></div>
                          <span className="text-sm font-bold text-primary/80">Awaiting Approval</span>
                        </div>
                        <div className="flex items-center gap-4 group">
                          <div className="h-6 w-6 bg-destructive rounded shadow-sm"></div>
                          <span className="text-sm font-bold text-primary/80">Confirmed Allotment</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5 bg-secondary rounded-2xl border border-primary/5">
                      <div className="flex items-center gap-2 mb-3">
                        <Info className="h-5 w-5 text-primary" />
                        <h5 className="font-black text-sm uppercase tracking-tight">Slot Information</h5>
                      </div>
                      <div className="space-y-2 text-xs text-muted-foreground font-medium">
                        <p>• Slot 1: 09:00 AM – 02:00 PM</p>
                        <p>• Slot 2: 05:00 PM – 10:00 PM</p>
                        <p className="pt-2 border-t mt-2">Bookings are strictly digital. No verbal confirmations.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:w-1/3">
            <Card className="shadow-2xl border-none sticky top-24 border-t-8 border-accent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-black uppercase">
                  <Lock className="h-6 w-6 text-primary" />
                  Booking Initiation
                </CardTitle>
                <CardDescription className="font-medium">
                  Registration and account verification are mandatory.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 border-2 border-dashed border-primary/20 rounded-2xl bg-accent/5 text-center">
                  <p className="text-xs font-bold uppercase text-muted-foreground mb-2">Target Date</p>
                  <p className="text-3xl font-black text-primary">{date ? date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'None'}</p>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                  Ensure your organization is verified before selecting a date. Booking requires full payment of rent and security deposit.
                </p>
                
                <Button className="w-full bg-primary py-7 text-lg font-black uppercase tracking-widest shadow-lg" asChild>
                  <Link href="/auth/register">Proceed to Allotment</Link>
                </Button>
                
                <div className="pt-6 border-t space-y-4">
                  <h6 className="text-xs font-black uppercase text-muted-foreground tracking-widest">Mandatory Checklist:</h6>
                  <ul className="text-xs space-y-3 font-bold text-primary/70">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-accent rounded-full" /> 
                      Official Identity Proof
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-accent rounded-full" /> 
                      Event Proposal (PDF)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-accent rounded-full" /> 
                      Declared VIP List
                    </li>
                    <li className="flex items-center gap-2 text-destructive">
                      <div className="h-1.5 w-1.5 bg-destructive rounded-full" /> 
                      Min. 30 Days Advance (SRS)
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
