"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle, Calendar as CalendarIcon, Sparkles, Building2, ShieldCheck, Info } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, addDays, isBefore } from "date-fns";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function NewBookingPage() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [slot, setSlot] = useState("slot1");
  const [isCollaboration, setIsCollaboration] = useState(false);
  const [standeesCount, setStandeesCount] = useState(0);
  const [agreed, setAgreed] = useState(false);
  
  const minDate = addDays(new Date(), 30);
  const maxDate = addDays(new Date(), 365);

  const baseRent = 25000;
  const securityDeposit = 20000;
  
  // SRS Calculation: Collaboration adds 10% rent surcharge
  const collaborationSurcharge = isCollaboration ? baseRent * 0.10 : 0;
  // SRS Calculation: ₹2,000 per Sponsor Standee
  const standeeFee = standeesCount * 2000;
  const totalRent = baseRent + collaborationSurcharge + standeeFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      toast({ title: "Selection Missing", description: "Please pick a valid event date.", variant: "destructive" });
      return;
    }
    if (!agreed) {
      toast({ title: "Agreement Required", description: "You must accept the statutory declarations.", variant: "destructive" });
      return;
    }

    toast({
      title: "Proposal Submitted",
      description: "Request #INV-NEW-P has been sent to the Approving Authority.",
    });
  };

  return (
    <div className="min-h-screen bg-secondary/30 pb-16">
      <Navbar />
      <main className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="mb-10 space-y-2">
          <h1 className="text-4xl font-black font-headline text-primary uppercase tracking-tight">New Allotment Proposal</h1>
          <p className="text-muted-foreground font-bold flex items-center gap-2">
            <Building2 className="h-4 w-4" /> Vikas Bhawan Complex Auditorium, SAS Nagar
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-2xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-primary text-white py-8">
                <CardTitle className="text-2xl font-black uppercase tracking-tighter">1. Schedule & Slot Selection</CardTitle>
                <CardDescription className="text-primary-foreground/70 font-medium italic">
                  SRS Constraint: Bookings locked between 30 days and 12 months.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <Label className="font-black text-xs uppercase tracking-widest text-primary/60">Target Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-bold py-7 border-2 border-primary/10 rounded-xl hover:border-primary transition-all",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-3 h-5 w-5 text-accent" />
                          {date ? format(date, "PPP") : <span>Pick Event Date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
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
                    <Label className="font-black text-xs uppercase tracking-widest text-primary/60">Official Slot (SRS Mandate)</Label>
                    <RadioGroup defaultValue="slot1" onValueChange={setSlot} className="grid grid-cols-1 gap-4">
                      <div className={cn(
                        "flex items-center space-x-3 border-2 p-4 rounded-xl transition-all cursor-pointer",
                        slot === "slot1" ? "border-primary bg-primary/5 shadow-sm" : "border-transparent hover:bg-white"
                      )}>
                        <RadioGroupItem value="slot1" id="slot1" />
                        <Label htmlFor="slot1" className="flex-1 cursor-pointer">
                          <span className="font-black block text-sm">SLOT 1: MORNING / NOON</span>
                          <span className="text-[10px] text-muted-foreground font-bold">09:00 AM – 02:00 PM</span>
                        </Label>
                      </div>
                      <div className={cn(
                        "flex items-center space-x-3 border-2 p-4 rounded-xl transition-all cursor-pointer",
                        slot === "slot2" ? "border-primary bg-primary/5 shadow-sm" : "border-transparent hover:bg-white"
                      )}>
                        <RadioGroupItem value="slot2" id="slot2" />
                        <Label htmlFor="slot2" className="flex-1 cursor-pointer">
                          <span className="font-black block text-sm">SLOT 2: EVENING</span>
                          <span className="text-[10px] text-muted-foreground font-bold">05:00 PM – 10:00 PM</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-2xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-secondary border-b-2 py-6">
                <CardTitle className="text-xl font-black uppercase text-primary">2. Event Configuration & Surcharges</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="event-name" className="font-black uppercase text-[10px] tracking-widest text-primary/60">Official Event Name</Label>
                  <Input id="event-name" placeholder="e.g. Annual State Cultural Symposium" className="py-6 rounded-xl border-2 border-primary/5 font-bold" />
                </div>

                <div className="flex items-center justify-between p-6 bg-accent/5 border-2 border-accent/20 rounded-2xl shadow-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      <Label className="font-black text-sm uppercase">Organizational Collaboration</Label>
                    </div>
                    <p className="text-[10px] text-primary/60 font-bold uppercase tracking-tight italic">SRS Rule: Collaborations trigger a 10% rent surcharge.</p>
                  </div>
                  <Switch checked={isCollaboration} onCheckedChange={setIsCollaboration} className="data-[state=checked]:bg-primary" />
                </div>

                <div className="space-y-6 pt-4 border-t border-dashed">
                  <div className="flex items-center justify-between">
                    <Label className="font-black text-sm uppercase">Sponsor Standees (Max 6&apos;x3&apos;)</Label>
                    <Badge variant="outline" className="border-accent text-accent bg-accent/5 font-black">₹2,000 / STANDEE</Badge>
                  </div>
                  <div className="flex items-center gap-6">
                    <Input 
                      type="number" 
                      min="0" 
                      className="w-28 py-6 rounded-xl border-2 font-black text-center text-lg" 
                      value={standeesCount} 
                      onChange={(e) => setStandeesCount(parseInt(e.target.value) || 0)} 
                    />
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-bold italic">Max size: 6 feet height x 3 feet width.</p>
                      <p className="text-[10px] text-destructive uppercase font-black">Strict Enforcement: Oversized standees will be removed without notice.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-6 bg-destructive/10 border-2 border-destructive/20 rounded-2xl flex gap-4 shadow-sm">
              <div className="bg-destructive p-1 rounded-full h-fit mt-1">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div className="space-y-4 flex-1">
                <p className="text-xs font-black text-destructive underline uppercase tracking-widest">Statutory Agreement & Compliance</p>
                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    id="declare" 
                    className="h-5 w-5 mt-1 accent-primary rounded" 
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <Label htmlFor="declare" className="text-[11px] text-primary/80 font-bold leading-relaxed uppercase">
                    I solemnly declare to: 1. Not exceed 750 persons capacity. 2. Reserve 25 specific seats for the Department. 3. Not use fire/weapons on stage. 4. Vacate premises within 30 mins of slot end. I understand misrepresentation leads to 100% forfeiture.
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-6 pt-4">
              <Button variant="ghost" className="font-bold text-muted-foreground uppercase tracking-widest" asChild>
                <Link href="/dashboard/requester">Discard Proposal</Link>
              </Button>
              <Button 
                onClick={handleSubmit} 
                className="bg-primary px-16 py-8 text-xl font-black uppercase tracking-widest shadow-2xl rounded-2xl hover:scale-105 transition-transform"
              >
                Submit Proposal
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="border-none shadow-2xl rounded-2xl overflow-hidden sticky top-24 border-t-8 border-accent">
              <CardHeader className="bg-secondary/80 border-b-2 py-6">
                <CardTitle className="text-lg font-black flex items-center gap-2 uppercase text-primary">
                  <Sparkles className="h-5 w-5 text-accent" /> Estimated Allotment Fee
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4 text-sm font-bold">
                  <div className="flex justify-between items-center text-muted-foreground uppercase text-[10px] tracking-widest">
                    <span>Basic Hire Charge:</span>
                    <span className="font-mono text-primary text-sm font-black">₹ {baseRent.toLocaleString()}</span>
                  </div>
                  {isCollaboration && (
                    <div className="flex justify-between items-center text-destructive">
                      <span className="uppercase text-[10px] tracking-widest">Collaboration (+10%):</span>
                      <span className="font-mono font-black">+ ₹ {collaborationSurcharge.toLocaleString()}</span>
                    </div>
                  )}
                  {standeesCount > 0 && (
                    <div className="flex justify-between items-center text-destructive">
                      <span className="uppercase text-[10px] tracking-widest">Sponsor Displays ({standeesCount}):</span>
                      <span className="font-mono font-black">+ ₹ {standeeFee.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="pt-6 border-t-2 flex justify-between items-center font-black text-2xl text-primary uppercase">
                    <span>Total Rent:</span>
                    <span className="font-mono">₹ {totalRent.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-4 bg-primary/5 rounded-2xl border-2 border-primary/10 space-y-2">
                  <div className="flex justify-between items-center font-black text-xs uppercase text-primary">
                    <span>Security Deposit:</span>
                    <span className="font-mono">₹ {securityDeposit.toLocaleString()}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-bold italic leading-relaxed">
                    Refundable within 15 days post-event subject to Manager&apos;s Clearance Report.
                  </p>
                </div>
                
                <div className="pt-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-accent" />
                    <p className="font-black text-[10px] uppercase text-primary tracking-widest">Compliance Deadlines (SRS):</p>
                  </div>
                  <ul className="text-[10px] space-y-3 text-muted-foreground font-black uppercase italic">
                    <li className="flex items-start gap-2">
                      <div className="h-1 w-1 bg-accent rounded-full mt-1.5" />
                      <span>Payment: Due immediately upon approval</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-1 w-1 bg-accent rounded-full mt-1.5" />
                      <span>Licenses: Upload 4 days prior (Mandatory)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-1 w-1 bg-accent rounded-full mt-1.5" />
                      <span>Handover: Exactly 2.5 hours before slot</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="p-5 bg-white rounded-2xl shadow-lg border-2 border-primary/5 flex gap-4">
              <div className="bg-primary/10 p-2 rounded-xl h-fit">
                <Info className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-primary">GST & Taxes</p>
                <p className="text-[9px] text-muted-foreground font-bold leading-tight">
                  Statutory GST (18%) will be calculated on the final invoice after approval.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
