
"use client";

import { useState, useEffect, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, CalendarDays, Lock, AlertTriangle, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { addDays, isBefore, isSameDay, format } from "date-fns";
import { cn } from "@/lib/utils";

type SlotStatus = "available" | "pending" | "booked";

interface SlotInfo {
  id: string;
  name: string;
  time: string;
  status: SlotStatus;
}

export default function AvailabilityPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [adminBlocks, setAdminBlocks] = useState<{ date: Date; type: string }[]>([]);
  
  // Simulated statuses for demo purposes
  // In a real app, these would be fetched from Firestore based on the selected date
  const [pendingSlots, setPendingSlots] = useState<{ date: string; slot: string }[]>([]);
  const [confirmedSlots, setConfirmedSlots] = useState<{ date: string; slot: string }[]>([]);

  const minBookingDate = addDays(new Date(), 30);

  useEffect(() => {
    // Sync with Admin Dashboard's blocks
    const savedBlocks = localStorage.getItem("govbook_blocked_dates");
    if (savedBlocks) {
      const parsed = JSON.parse(savedBlocks).map((b: any) => ({
        date: new Date(b.date),
        type: b.type
      }));
      setAdminBlocks(parsed);
    }

    // Mock some statuses for testing
    setPendingSlots([
      { date: format(addDays(minBookingDate, 5), "yyyy-MM-dd"), slot: "slot1" },
      { date: format(addDays(minBookingDate, 10), "yyyy-MM-dd"), slot: "slot2" },
    ]);
    setConfirmedSlots([
      { date: format(addDays(minBookingDate, 7), "yyyy-MM-dd"), slot: "slot1" },
      { date: format(addDays(minBookingDate, 7), "yyyy-MM-dd"), slot: "slot2" },
    ]);
  }, []);

  const getSlotStatus = (slotId: string, targetDate: Date | undefined): SlotStatus => {
    if (!targetDate) return "available";
    
    // 1. Check Admin Overrides (Blocks the whole day)
    const isAdminBlocked = adminBlocks.some(b => isSameDay(b.date, targetDate));
    if (isAdminBlocked) return "booked";

    const dateStr = format(targetDate, "yyyy-MM-dd");

    // 2. Check Confirmed Allotments
    if (confirmedSlots.some(s => s.date === dateStr && s.slot === slotId)) {
      return "booked";
    }

    // 3. Check Pending Proposals
    if (pendingSlots.some(s => s.date === dateStr && s.slot === slotId)) {
      return "pending";
    }

    return "available";
  };

  const currentSlots = useMemo((): SlotInfo[] => [
    { 
      id: "slot1", 
      name: "Slot 1: Morning / Noon", 
      time: "09:00 AM – 02:00 PM", 
      status: getSlotStatus("slot1", date) 
    },
    { 
      id: "slot2", 
      name: "Slot 2: Evening", 
      time: "05:00 PM – 10:00 PM", 
      status: getSlotStatus("slot2", date) 
    }
  ], [date, adminBlocks, pendingSlots, confirmedSlots]);

  const getStatusBadge = (status: SlotStatus) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500/10 text-green-600 border-green-200 uppercase text-[10px] font-black">Available (Open Slot)</Badge>;
      case "pending":
        return <Badge className="bg-accent/10 text-primary border-accent/20 uppercase text-[10px] font-black">Awaiting Approval</Badge>;
      case "booked":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20 uppercase text-[10px] font-black">Confirmed Allotment</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <p className="text-sm font-black text-destructive uppercase tracking-tight">
            Section 1.1: Dates before {minBookingDate.toLocaleDateString()} are locked for official review and advance booking compliance.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-1/2">
            <Card className="shadow-2xl border-none">
              <CardHeader className="bg-primary text-primary-foreground rounded-t-xl py-8">
                <div className="flex items-center gap-3">
                  <div className="bg-accent p-2 rounded-lg text-primary">
                    <CalendarDays className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black uppercase tracking-tight">Master Availability Calendar</CardTitle>
                    <CardDescription className="text-primary-foreground/70 font-bold uppercase text-[10px]">
                      Vikas Bhawan Complex | Sector-62, SAS Nagar
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex justify-center scale-110 origin-top pb-10">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => isBefore(date, minBookingDate)}
                    className="rounded-xl border-2 border-primary/5 shadow-xl p-4"
                    modifiers={{
                      booked: (d) => adminBlocks.some(b => isSameDay(b.date, d)) || (confirmedSlots.some(s => s.date === format(d, "yyyy-MM-dd") && s.slot === "slot1") && confirmedSlots.some(s => s.date === format(d, "yyyy-MM-dd") && s.slot === "slot2")),
                      partial: (d) => confirmedSlots.some(s => s.date === format(d, "yyyy-MM-dd")),
                      pending: (d) => pendingSlots.some(s => s.date === format(d, "yyyy-MM-dd")),
                    }}
                    modifiersStyles={{
                      booked: { backgroundColor: 'hsl(var(--destructive))', color: 'white', borderRadius: '4px' },
                      partial: { border: '2px solid hsl(var(--destructive))', borderRadius: '4px' },
                      pending: { backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--primary))', borderRadius: '4px' },
                    }}
                  />
                </div>
                
                <div className="pt-8 border-t space-y-4">
                  <h4 className="font-black text-xs uppercase tracking-widest text-muted-foreground">Legend</h4>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 bg-white border-2 border-primary/10 rounded" />
                      <span className="text-[10px] font-bold uppercase text-primary/60 tracking-tight">Open</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 bg-accent rounded" />
                      <span className="text-[10px] font-bold uppercase text-primary/60 tracking-tight">Pending Approval</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 bg-destructive rounded" />
                      <span className="text-[10px] font-bold uppercase text-primary/60 tracking-tight">Fully Allotted / Blocked</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:w-1/2 space-y-8">
            <Card className="shadow-2xl border-none">
              <CardHeader className="bg-secondary/50 border-b-2 py-8 px-10">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-black uppercase text-primary">Shift Selection for Selected Date</CardTitle>
                    <p className="text-3xl font-black text-accent tracking-tighter">
                      {date ? format(date, "MMMM dd, yyyy") : "Pick a date"}
                    </p>
                  </div>
                  <Info className="h-8 w-8 text-primary/20" />
                </div>
              </CardHeader>
              <CardContent className="p-10 space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  {currentSlots.map((slot) => (
                    <div key={slot.id} className={cn(
                      "p-6 rounded-2xl border-2 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6",
                      slot.status === "available" ? "bg-white border-primary/5 hover:border-primary/20" : 
                      slot.status === "pending" ? "bg-accent/5 border-accent/20" : "bg-destructive/5 border-destructive/20 opacity-80"
                    )}>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-primary" />
                          <h5 className="font-black text-sm uppercase tracking-tight">{slot.name}</h5>
                        </div>
                        <p className="text-xs font-bold text-muted-foreground uppercase">{slot.time}</p>
                        <div className="pt-1">{getStatusBadge(slot.status)}</div>
                      </div>

                      <div className="w-full md:w-auto">
                        {slot.status === "booked" ? (
                          <Button disabled className="w-full md:w-auto bg-muted text-muted-foreground font-black uppercase text-[10px] tracking-widest cursor-not-allowed">
                            <Lock className="mr-2 h-3.5 w-3.5" /> Allotted
                          </Button>
                        ) : (
                          <Button className="w-full md:w-auto bg-primary text-white font-black uppercase text-[10px] tracking-widest shadow-lg hover:scale-105 transition-transform" asChild>
                            <Link href={`/auth/register?date=${date ? format(date, "yyyy-MM-dd") : ""}&slot=${slot.id}`}>
                              {slot.status === "pending" ? "Submit Competing Proposal" : "Proceed to Booking"}
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-primary/5 rounded-2xl border-2 border-primary/10 space-y-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    <p className="font-black text-[10px] uppercase text-primary tracking-widest underline">Booking Mandate (Sec 1.1 &amp; 3.1)</p>
                  </div>
                  <p className="text-[11px] text-primary/80 font-bold leading-relaxed uppercase italic">
                    Allotment is strictly shift-based. If your program exceeds the allotted shift by more than 2 hours, a full day's rent will be charged as per Section 3.6.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-6">
              <Card className="border-none shadow-xl bg-primary text-white p-6 rounded-2xl flex flex-col justify-between">
                <Users className="h-8 w-8 text-accent mb-4" />
                <div>
                  <p className="text-2xl font-black">750</p>
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Max Seating (Sec 8.1)</p>
                </div>
              </Card>
              <Card className="border-none shadow-xl bg-white p-6 rounded-2xl flex flex-col justify-between border-2 border-primary/5">
                <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
                <div>
                  <p className="text-2xl font-black text-primary tracking-tighter">Verified</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Booking Mode Only</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
