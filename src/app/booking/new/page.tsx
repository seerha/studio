
"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Info, AlertTriangle, Calendar as CalendarIcon, Users, UserCheck, Sparkles, Building2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, addDays, isBefore } from "date-fns";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";

export default function NewBookingPage() {
  const [date, setDate] = useState<Date>();
  const [slot, setSlot] = useState("slot1");
  const [isCollaboration, setIsCollaboration] = useState(false);
  const [standeesCount, setStandeesCount] = useState(0);
  
  const minDate = addDays(new Date(), 30);
  const maxDate = addDays(new Date(), 365);

  const baseRent = 25000; // Example Base Rent for Vikas Bhawan
  const securityDeposit = 20000;
  
  const collaborationSurcharge = isCollaboration ? baseRent * 0.10 : 0;
  const standeeFee = standeesCount * 2000;
  const totalRent = baseRent + collaborationSurcharge + standeeFee;

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-headline">New Allotment Proposal</h1>
          <p className="text-muted-foreground">Vikas Bhawan Complex Auditorium, SAS Nagar</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader className="bg-primary text-white rounded-t-lg">
                <CardTitle>Event Schedule & Slot Selection</CardTitle>
                <CardDescription className="text-primary-foreground/70">Bookings allowed between 30 days and 12 months in advance.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="font-bold">Proposed Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal py-6 border-primary/20",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date (30+ days from now)</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) => isBefore(date, minDate) || date > maxDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-4">
                    <Label className="font-bold">Select Allotment Slot</Label>
                    <RadioGroup defaultValue="slot1" onValueChange={setSlot} className="grid grid-cols-1 gap-3">
                      <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-secondary/50 cursor-pointer">
                        <RadioGroupItem value="slot1" id="slot1" />
                        <Label htmlFor="slot1" className="flex-1 cursor-pointer">
                          <span className="font-bold block">Slot 1: Morning/Noon</span>
                          <span className="text-xs text-muted-foreground">09:00 AM – 02:00 PM</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-secondary/50 cursor-pointer">
                        <RadioGroupItem value="slot2" id="slot2" />
                        <Label htmlFor="slot2" className="flex-1 cursor-pointer">
                          <span className="font-bold block">Slot 2: Evening</span>
                          <span className="text-xs text-muted-foreground">05:00 PM – 10:00 PM</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader className="bg-secondary/50 border-b">
                <CardTitle className="text-lg">Event Configuration</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="event-name">Official Event Name</Label>
                  <Input id="event-name" placeholder="e.g. Annual Cultural Theatre Play" />
                </div>

                <div className="flex items-center justify-between p-4 bg-accent/5 border border-accent/20 rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      <Label className="font-bold">Organizational Collaboration</Label>
                    </div>
                    <p className="text-[10px] text-muted-foreground">Collaboration with other entities triggers a 10% rent surcharge.</p>
                  </div>
                  <Switch checked={isCollaboration} onCheckedChange={setIsCollaboration} />
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <Label className="font-bold">Sponsor Standees (Max 6&apos;x3&apos;)</Label>
                    <span className="text-xs text-primary font-bold">₹2,000 / Standee</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Input 
                      type="number" 
                      min="0" 
                      className="w-24" 
                      value={standeesCount} 
                      onChange={(e) => setStandeesCount(parseInt(e.target.value) || 0)} 
                    />
                    <p className="text-xs text-muted-foreground italic">Max size: 6 feet height x 3 feet width. Standees exceeding this will be removed.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-1" />
              <div className="space-y-2">
                <p className="text-sm font-bold text-destructive underline uppercase tracking-tight">Statutory Agreement</p>
                <div className="flex items-start gap-2">
                  <Input type="checkbox" id="declare" className="h-4 w-4 mt-1" />
                  <Label htmlFor="declare" className="text-[11px] text-muted-foreground font-normal leading-tight">
                    I solemnly declare to: 1. Not exceed 750 persons capacity. 2. Reserve 25 specific seats for the Department. 3. Not use fire/weapons on stage. 4. Vacate premises within 30 mins of slot end. I understand misrepresentation leads to 100% forfeiture.
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="ghost" asChild><Link href="/dashboard/requester">Discard</Link></Button>
              <Button className="bg-primary px-12 py-6 text-lg font-bold" asChild>
                <Link href="/dashboard/requester">Submit Proposal</Link>
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-md sticky top-24">
              <CardHeader className="bg-secondary/80 border-b">
                <CardTitle className="text-lg flex items-center gap-2"><Sparkles className="h-5 w-5 text-accent" /> Hire Charges</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Base Slot Rent:</span>
                    <span className="font-mono font-bold">₹ {baseRent.toLocaleString()}</span>
                  </div>
                  {isCollaboration && (
                    <div className="flex justify-between text-destructive">
                      <span>Collaboration (+10%):</span>
                      <span className="font-mono font-bold">+ ₹ {collaborationSurcharge.toLocaleString()}</span>
                    </div>
                  )}
                  {standeesCount > 0 && (
                    <div className="flex justify-between text-destructive">
                      <span>Sponsor Displays ({standeesCount}):</span>
                      <span className="font-mono font-bold">+ ₹ {standeeFee.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t flex justify-between font-bold text-lg text-primary">
                    <span>Total Rent:</span>
                    <span>₹ {totalRent.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-3 bg-primary/5 rounded border border-primary/10 text-xs">
                  <div className="flex justify-between font-bold mb-1">
                    <span>Security Deposit:</span>
                    <span>₹ {securityDeposit.toLocaleString()}</span>
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">Refundable within 15 days of event subject to clearance report.</p>
                </div>
                
                <div className="pt-4 space-y-2">
                  <p className="font-bold text-[10px] uppercase text-muted-foreground">Compliance Deadlines:</p>
                  <ul className="text-[10px] space-y-1 text-muted-foreground italic">
                    <li>• Payment: Due immediately upon approval</li>
                    <li>• Documents: Upload 4 days prior (Mandatory)</li>
                    <li>• Handover: 2.5 hours before slot start</li>
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
