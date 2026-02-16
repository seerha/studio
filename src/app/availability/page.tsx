
"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, CalendarDays, Lock } from "lucide-react";
import Link from "next/link";

export default function AvailabilityPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [pendingDates, setPendingDates] = useState<Date[]>([]);

  useEffect(() => {
    // Sync with Admin Dashboard's blocks
    const savedBlocks = localStorage.getItem("govbook_blocked_dates");
    if (savedBlocks) {
      const parsed = JSON.parse(savedBlocks).map((b: any) => new Date(b.date));
      setBlockedDates(parsed);
    } else {
      // Defaults if none exist
      setBlockedDates([
        new Date(2025, 2, 10),
        new Date(2025, 2, 11),
      ]);
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
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Card className="shadow-lg border-none">
              <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-6 w-6" />
                  <CardTitle>Master Availability Calendar</CardTitle>
                </div>
                <CardDescription className="text-primary-foreground/80">
                  Select a date to check detailed availability and status.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1 flex justify-center">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border shadow-sm"
                      modifiers={{
                        booked: blockedDates,
                        pending: pendingDates,
                      }}
                      modifiersStyles={{
                        booked: { backgroundColor: 'hsl(var(--destructive))', color: 'white', borderRadius: '4px' },
                        pending: { backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--primary))', borderRadius: '4px' },
                      }}
                    />
                  </div>
                  <div className="md:w-64 space-y-6">
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Legend</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-4 bg-white border rounded"></div>
                          <span className="text-sm">Available</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-4 bg-accent rounded"></div>
                          <span className="text-sm">Pending Approval</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-4 bg-destructive rounded"></div>
                          <span className="text-sm">Booked / Blocked</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="h-4 w-4 text-primary" />
                        <h5 className="font-bold text-sm">Booking Tip</h5>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Bookings are typically open from 09:00 AM to 06:00 PM. Special permissions required for late-night extensions.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:w-1/3">
            <Card className="shadow-lg border-none sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Initiate Booking
                </CardTitle>
                <CardDescription>
                  Registration and verification are mandatory for booking.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-dashed rounded-lg bg-accent/5 text-center">
                  <p className="text-sm mb-4">Selected Date:</p>
                  <p className="text-2xl font-bold text-primary">{date ? date.toDateString() : 'None'}</p>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  By clicking below, you will be prompted to log in or register to submit your event proposal.
                </p>
                
                <Button className="w-full bg-primary py-6" asChild>
                  <Link href="/auth/register">Proceed to Request</Link>
                </Button>
                
                <div className="pt-4 border-t">
                  <p className="text-xs font-bold uppercase text-muted-foreground mb-2">Requirement Checklist:</p>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• Organization Identity Proof</li>
                    <li>• Event Agenda / Proposal</li>
                    <li>• VIP List (if applicable)</li>
                    <li>• Security Clearance (for VIP events)</li>
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
