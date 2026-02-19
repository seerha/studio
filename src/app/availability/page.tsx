"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, CalendarDays, Lock, AlertTriangle, Clock, CheckCircle2, AlertCircle, Users } from "lucide-react";
import Link from "next/link";
import { addDays, isBefore, format } from "date-fns";
import { cn } from "@/lib/utils";
import { useCollection, useMemoFirebase, useFirestore } from "@/firebase";
import { collection, query } from "firebase/firestore";

type SlotStatus = "available" | "pending" | "booked";

interface SlotInfo {
  id: string;
  name: string;
  time: string;
  status: SlotStatus;
}

export default function AvailabilityPage() {
  const firestore = useFirestore();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const minBookingDate = addDays(new Date(), 30);

  // 1. Fetch Real-time Allotments from Firestore
  const bookingsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, "bookings"));
  }, [firestore]);
  const { data: bookings } = useCollection(bookingsQuery);

  // 2. Fetch Real-time Admin Overrides
  const blockedDatesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, "blockedDates"));
  }, [firestore]);
  const { data: blockedDates } = useCollection(blockedDatesQuery);

  const getSlotStatus = (slotId: string, targetDate: Date | undefined): SlotStatus => {
    if (!targetDate || !bookings || !blockedDates) return "available";
    
    const dateStr = format(targetDate, "yyyy-MM-dd");

    // Check Admin Overrides (Blocks the whole day)
    const isAdminBlocked = blockedDates.some(b => b.blockedDate === dateStr);
    if (isAdminBlocked) return "booked";

    // Check Bookings
    const dailyBookings = bookings.filter(b => b.bookingDate === dateStr && b.slot === slotId);
    
    if (dailyBookings.some(b => b.status === "Confirmed" || b.status === "Paid" || b.status === "Approved")) return "booked";
    if (dailyBookings.some(b => b.status === "Pending")) return "pending";

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
  ], [date, bookings, blockedDates]);

  const getStatusBadge = (status: SlotStatus) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500/10 text-green-600 border-green-200 uppercase text-[10px] font-black">Available (Open Slot)</Badge>;
      case "pending":
        return <Badge className="bg-accent/10 text-primary border-accent/20 uppercase text-[10px] font-black">Pending Approval</Badge>;
      case "booked":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20 uppercase text-[10px] font-black">Fully Allotted / Blocked</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <p className="text-sm font-black text-destructive uppercase tracking-tight">
            Section 1.1: Dates before {format(minBookingDate, "PP")} are locked for official review and advance booking compliance.
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
                      booked: (d) => {
                        const s1 = getSlotStatus("slot1", d);
                        const s2 = getSlotStatus("slot2", d);
                        return s1 === "booked" && s2 === "booked";
                      },
                      partial: (d) => {
                        const s1 = getSlotStatus("slot1", d);
                        const s2 = getSlotStatus("slot2", d);
                        return (s1 === "booked" || s2 === "booked") && !(s1 === "booked" && s2 === "booked");
                      },
                      pending: (d) => {
                        const s1 = getSlotStatus("slot1", d);
                        const s2 = getSlotStatus("slot2", d);
                        return s1 === "pending" || s2 === "pending";
                      },
                    }}
                    modifiersStyles={{
                      booked: { backgroundColor: 'hsl(var(--destructive))', color: 'white', fontWeight: '900' },
                      partial: { border: '2px solid hsl(var(--destructive))', fontWeight: '900' },
                      pending: { backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--primary))', fontWeight: '900' },
                    }}
                  />
                </div>
                
                <div className="pt-8 border-t space-y-4">
                  <h4 className="font-black text-xs uppercase tracking-widest text-muted-foreground">Status Legend</h4>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 bg-white border-2 border-primary/10 rounded" />
                      <span className="text-[10px] font-black uppercase text-primary/60 tracking-tight">Open for Proposals</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 bg-accent rounded" />
                      <span className="text-[10px] font-black uppercase text-primary/60 tracking-tight">Pending Approval</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 bg-destructive rounded" />
                      <span className="text-[10px] font-black uppercase text-primary/60 tracking-tight">Fully Allotted / Blocked</span>
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
                    <CardTitle className="text-xl font-black uppercase text-primary">Shift Availability</CardTitle>
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
                            <Lock className="mr-2 h-3.5 w-3.5" /> Fully Allotted
                          </Button>
                        ) : (
                          <Button className="w-full md:w-auto bg-primary text-white font-black uppercase text-[10px] tracking-widest shadow-lg hover:scale-105 transition-transform" asChild>
                            <Link href={`/booking/new?date=${date ? format(date, "yyyy-MM-dd") : ""}&slot=${slot.id}`}>
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
                    <p className="font-black text-[10px] uppercase text-primary tracking-widest underline">Statutory Mandate (Sec 3.1)</p>
                  </div>
                  <p className="text-[11px] text-primary/80 font-bold leading-relaxed uppercase italic">
                    Allotment is strictly shift-based. Overlapping shifts will result in full-day rent billing as per Section 3.6 of the official T&C.
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
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Identity Mode</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
