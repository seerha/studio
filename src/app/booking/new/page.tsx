
"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertTriangle, 
  Calendar as CalendarIcon, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  Info, 
  Ban, 
  Clock, 
  Lock, 
  ArrowRight,
  Fingerprint,
  FileBadge,
  Users,
  Upload,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, addDays, isBefore, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import { useFirestore, useUser, addDocumentNonBlocking } from "@/firebase";
import { collection } from "firebase/firestore";

export default function NewBookingPage() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();

  // User details from session
  const [sessionUser, setSessionUser] = useState<any>(null);

  // Form State
  const [date, setDate] = useState<Date | undefined>();
  const [slot, setSlot] = useState("slot1");
  const [eventName, setEventName] = useState("");
  const [eventPurpose, setEventPurpose] = useState("");
  const [isCollaboration, setIsCollaboration] = useState(false);
  const [collaborationEntity, setCollaborationEntity] = useState("");
  const [standeesCount, setStandeesCount] = useState(0);
  const [expectedGathering, setExpectedGathering] = useState(750);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const minDate = addDays(new Date(), 30);
  const maxDate = addDays(new Date(), 365);

  useEffect(() => {
    const s = localStorage.getItem("govbook_session");
    if (s) setSessionUser(JSON.parse(s));

    const paramDate = searchParams.get("date");
    const paramSlot = searchParams.get("slot");
    if (paramDate) setDate(parseISO(paramDate));
    if (paramSlot) setSlot(paramSlot);
  }, [searchParams]);

  // Financial Calculations (Section 1.5, 14.4, 14.5)
  const getBaseRent = () => {
    if (sessionUser?.category === 'govt') return 5000;
    if (sessionUser?.category === 'ngo') return 15000;
    return 50000;
  };

  const baseRent = getBaseRent();
  const securityDeposit = baseRent * 2; // Standard government deposit multiplier
  const collaborationSurcharge = isCollaboration ? baseRent * 0.10 : 0;
  const standeeFee = standeesCount * 2000;
  const totalRent = baseRent + collaborationSurcharge + standeeFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: "Session Error", description: "Authentication failed. Re-login required.", variant: "destructive" });
      return;
    }
    if (!date) {
      toast({ title: "Date Missing", description: "Event date is mandatory (Section 1.1).", variant: "destructive" });
      return;
    }
    if (!eventName || !eventPurpose) {
      toast({ title: "Fields Missing", description: "Event name and purpose are mandatory.", variant: "destructive" });
      return;
    }
    if (isCollaboration && !collaborationEntity) {
      toast({ title: "Collaboration Error", description: "Associated entity name is required (Section 14.4).", variant: "destructive" });
      return;
    }
    if (!agreed) {
      toast({ title: "Mandate Error", description: "You must accept the Statutory Declaration (Section 13.3).", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    const bookingData = {
      userId: user.uid,
      userName: sessionUser?.name || "Official Requester",
      userDesignation: "Authorized Representative",
      organization: sessionUser?.name || "Department/PSU",
      category: sessionUser?.category || "A",
      auditoriumId: "main-auditorium",
      bookingDate: format(date, "yyyy-MM-dd"),
      slot: slot,
      eventName: eventName,
      eventPurpose: eventPurpose,
      status: "Pending",
      proposalSubmissionDate: new Date().toISOString(),
      isCollaboration: isCollaboration,
      collaborationEntity: collaborationEntity,
      standeesCount: standeesCount,
      tariffCalculatedAmount: totalRent,
      securityDepositAmount: securityDeposit,
      totalPayableAmount: totalRent + securityDeposit,
      expectedGathering: expectedGathering,
      isProhibitedEventConfirmed: agreed,
      statutoryCheck: {
        policePermission: "Pending",
        fireSafety: "Pending",
        copyrightNOC: "Pending"
      }
    };

    if (firestore) {
      addDocumentNonBlocking(collection(firestore, "bookings"), bookingData);
      
      toast({
        title: "Proposal Queued",
        description: `Reference created for ${format(date, 'PPP')}. Proceeding to Tracking Portal.`,
      });

      setTimeout(() => router.push("/dashboard/requester"), 1500);
    }
  };

  if (isUserLoading) {
    return (
      <div className="min-h-screen bg-secondary/30 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="font-black uppercase text-[10px] tracking-widest text-primary/60">Verifying Identity...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-secondary/30">
        <Navbar />
        <main className="container mx-auto px-4 py-20 flex justify-center">
          <Card className="w-full max-w-md border-none shadow-2xl">
            <CardHeader className="bg-destructive text-white rounded-t-lg text-center pb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Lock className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-black uppercase tracking-tight">Security Protocol</CardTitle>
              <CardDescription className="text-white/80 font-bold uppercase text-[10px]">
                Unauthorized Access Restricted (Section 13.3)
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 text-center space-y-6">
              <p className="text-sm font-medium text-muted-foreground leading-relaxed uppercase">
                Only verified organizational representatives may submit allotment proposals for the Vikas Bhawan Complex.
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90 h-14 font-black uppercase tracking-widest text-xs" asChild>
                <Link href="/auth/login">Proceed to Login Portal <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30 pb-20">
      <Navbar />
      <main className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black font-headline text-primary uppercase tracking-tight">New Allotment Proposal</h1>
            <p className="text-muted-foreground font-bold flex items-center gap-2 uppercase text-[10px] tracking-widest">
              <Building2 className="h-4 w-4 text-accent" /> Vikas Bhawan Complex, Sector-62, SAS Nagar
            </p>
          </div>
          <Badge className="bg-primary text-white font-black py-2 px-6 rounded-xl text-xs uppercase tracking-widest shadow-xl">
            Category {sessionUser?.category?.toUpperCase() || 'A'} Requester
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Verification Data */}
            <Card className="border-none shadow-2xl rounded-3xl overflow-hidden border-l-8 border-accent">
              <CardHeader className="bg-secondary/50 py-6 px-10">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl font-black uppercase text-primary tracking-tight">1. Requester Identity (Pre-Verified)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Official Organization</Label>
                  <p className="text-sm font-black text-primary uppercase">{sessionUser?.name || 'Loading...'}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Aadhar UIDAI Reference</Label>
                  <p className="text-sm font-black text-primary tracking-widest flex items-center gap-2">
                    <Fingerprint className="h-4 w-4 text-accent" /> XXXX XXXX 0921
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Schedule */}
            <Card className="border-none shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-primary text-white py-8 px-10">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-6 w-6 text-accent" />
                  <div>
                    <CardTitle className="text-2xl font-black uppercase tracking-tighter">2. Schedule & Slot Mandate</CardTitle>
                    <CardDescription className="text-primary-foreground/70 font-bold uppercase text-[10px]">Section 3.1: Strict slot timing enforced.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-10 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <Label className="font-black text-xs uppercase tracking-widest text-primary/60">Target Event Date (Sec 1.1)</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-bold py-8 border-2 border-primary/10 rounded-2xl hover:border-primary transition-all",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-3 h-5 w-5 text-accent" />
                          {date ? format(date, "PPP") : <span className="uppercase text-[10px] tracking-widest">Select Event Date</span>}
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
                    <Label className="font-black text-xs uppercase tracking-widest text-primary/60">Official Shift (Sec 3.1)</Label>
                    <RadioGroup value={slot} onValueChange={setSlot} className="grid grid-cols-1 gap-4">
                      <div className={cn(
                        "flex items-center space-x-3 border-2 p-5 rounded-2xl transition-all cursor-pointer",
                        slot === "slot1" ? "border-primary bg-primary/5 shadow-sm" : "border-transparent hover:bg-white"
                      )}>
                        <RadioGroupItem value="slot1" id="slot1" />
                        <Label htmlFor="slot1" className="flex-1 cursor-pointer">
                          <span className="font-black block text-sm uppercase">SHIFT 1: MORNING</span>
                          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">09:00 AM – 02:00 PM</span>
                        </Label>
                      </div>
                      <div className={cn(
                        "flex items-center space-x-3 border-2 p-5 rounded-2xl transition-all cursor-pointer",
                        slot === "slot2" ? "border-primary bg-primary/5 shadow-sm" : "border-transparent hover:bg-white"
                      )}>
                        <RadioGroupItem value="slot2" id="slot2" />
                        <Label htmlFor="slot2" className="flex-1 cursor-pointer">
                          <span className="font-black block text-sm uppercase">SHIFT 2: EVENING</span>
                          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">05:00 PM – 10:00 PM</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Event Details & Surcharges */}
            <Card className="border-none shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-secondary/80 border-b-2 py-8 px-10">
                <div className="flex items-center gap-3">
                  <FileBadge className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl font-black uppercase text-primary">3. Event Declaration & Surcharges</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-10 space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="event-name" className="font-black uppercase text-[10px] tracking-widest text-primary/60">Event Title (Sec 4.2)</Label>
                  <Input 
                    id="event-name" 
                    placeholder="e.g. Annual Cultural Theatre Festival" 
                    className="py-7 rounded-2xl border-2 border-primary/5 font-bold"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="event-purpose" className="font-black uppercase text-[10px] tracking-widest text-primary/60">Detailed Purpose & Nature of Event</Label>
                  <Textarea 
                    id="event-purpose" 
                    placeholder="Describe the activities, expected guests, and schedule..." 
                    className="min-h-[120px] rounded-2xl border-2 border-primary/5 font-bold p-5"
                    value={eventPurpose}
                    onChange={(e) => setEventPurpose(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 bg-accent/5 border-2 border-accent/20 rounded-3xl shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        <Label className="font-black text-sm uppercase">Collaboration (Sec 14.4)</Label>
                      </div>
                      <p className="text-[10px] text-primary/60 font-bold uppercase tracking-tight italic">Adds 10% rent surcharge for joint shows.</p>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <Switch checked={isCollaboration} onCheckedChange={setIsCollaboration} />
                      {isCollaboration && (
                        <Input 
                          placeholder="Name of Associate Entity" 
                          className="flex-1 py-5 rounded-xl border-primary/20 font-bold text-xs" 
                          value={collaborationEntity}
                          onChange={(e) => setCollaborationEntity(e.target.value)}
                        />
                      )}
                    </div>
                  </div>

                  <div className="p-6 bg-primary/5 border-2 border-primary/10 rounded-3xl shadow-sm space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-accent" />
                        <Label className="font-black text-sm uppercase">Sponsor Standees (Sec 14.5)</Label>
                      </div>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">₹ 2,000 PER UNIT | MAX SIZE 6' × 3'</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Input 
                        type="number" 
                        min="0" 
                        className="w-24 py-6 rounded-xl border-2 border-primary/20 font-black text-center text-lg" 
                        value={standeesCount} 
                        onChange={(e) => setStandeesCount(parseInt(e.target.value) || 0)} 
                      />
                      <div className="space-y-1">
                        <p className="text-[10px] text-destructive uppercase font-black">Mandatory Logo Disclosure</p>
                        <p className="text-[8px] text-muted-foreground font-bold uppercase italic">Billing adjusted in total fee.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4: Documents Evidence */}
            <Card className="border-none shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-secondary/50 border-b-2 py-8 px-10">
                <div className="flex items-center gap-3">
                  <Upload className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl font-black uppercase text-primary">4. Statutory Evidence Uploads</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="p-6 border-2 border-dashed rounded-3xl bg-secondary/30 flex flex-col items-center text-center group hover:border-primary transition-all">
                    <CalendarIcon className="h-8 w-8 text-primary/40 mb-3" />
                    <h4 className="font-black text-[10px] uppercase mb-1 tracking-tight">Draft Event Schedule</h4>
                    <p className="text-[8px] text-muted-foreground font-bold uppercase mb-4">MANDATORY FOR APPROVAL</p>
                    <Button variant="outline" size="sm" className="border-primary text-primary font-black uppercase text-[9px] rounded-xl hover:bg-primary hover:text-white h-10 px-6">Upload PDF</Button>
                  </div>

                  <div className="p-6 border-2 border-dashed rounded-3xl bg-secondary/30 flex flex-col items-center text-center group hover:border-accent transition-all">
                    <Building2 className="h-8 w-8 text-accent/40 mb-3" />
                    <h4 className="font-black text-[10px] uppercase mb-1 tracking-tight">Organization Seal & Letter</h4>
                    <p className="text-[8px] text-muted-foreground font-bold uppercase mb-4">IDENTITY PROOF (SEC 13.3)</p>
                    <Button variant="outline" size="sm" className="border-accent text-accent font-black uppercase text-[9px] rounded-xl hover:bg-accent hover:text-white h-10 px-6">Upload Evidence</Button>
                  </div>
                </div>
                
                <div className="p-6 bg-amber-50 border-2 border-amber-200 rounded-2xl flex gap-4">
                  <AlertCircle className="h-6 w-6 text-amber-600 shrink-0" />
                  <p className="text-[10px] font-bold text-amber-800 uppercase leading-relaxed">
                    Note: Statutory licenses (Police, Fire, Copyright) are required at least **4 days prior** to the event via the Dashboard Tracker.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 5: Statutory Compliance Checkbox */}
            <div className="p-8 bg-destructive/10 border-2 border-destructive/20 rounded-[2rem] flex gap-6 shadow-sm">
              <div className="bg-destructive p-1.5 rounded-full h-fit mt-1">
                <Ban className="h-6 w-6 text-white" />
              </div>
              <div className="space-y-4 flex-1">
                <p className="text-xs font-black text-destructive underline uppercase tracking-widest">Legal Affirmation (Section 13.3 & 14.6)</p>
                <div className="flex items-start gap-4">
                  <input 
                    type="checkbox" 
                    id="declare" 
                    className="h-6 w-6 mt-1 accent-primary rounded cursor-pointer" 
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <Label htmlFor="declare" className="text-[11px] text-primary/80 font-bold leading-relaxed uppercase cursor-pointer">
                    I solemnly affirm that the information provided is 100% accurate. I acknowledge that misrepresentation of identity or category (e.g. booking for a third-party) will result in immediate cancellation, forfeiture of all fees (Section 13.3), and legal proceedings. I agree to strictly follow all 15 sections of the Terms & Conditions.
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-6 pt-6">
              <Button variant="ghost" className="font-black text-muted-foreground uppercase tracking-widest text-[10px]" asChild>
                <Link href="/availability">Discard Proposal</Link>
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={isLoading}
                className="bg-primary px-20 py-8 text-xl font-black uppercase tracking-widest shadow-2xl rounded-2xl hover:scale-105 transition-transform"
              >
                {isLoading ? "Submitting..." : "Submit Proposal"}
              </Button>
            </div>
          </div>

          {/* Pricing & Summary Sidebar */}
          <div className="space-y-8">
            <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden sticky top-24 border-t-8 border-accent bg-white">
              <CardHeader className="bg-secondary/50 border-b-2 py-8 px-10">
                <CardTitle className="text-lg font-black flex items-center gap-3 uppercase text-primary tracking-tighter">
                  <Sparkles className="h-6 w-6 text-accent" /> Official Allotment Quote
                </CardTitle>
              </CardHeader>
              <CardContent className="p-10 space-y-8">
                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase text-primary/40 tracking-widest">Scheduled Slot:</p>
                  <div className="flex items-center gap-3 p-4 bg-primary/5 border-2 border-primary/10 rounded-2xl">
                    <Clock className="h-5 w-5 text-accent" />
                    <div className="flex flex-col">
                      <span className="text-xs font-black uppercase">
                        {slot === 'slot1' ? 'Shift 1: Morning' : 'Shift 2: Evening'}
                      </span>
                      <span className="text-[9px] font-bold text-muted-foreground uppercase">
                        {date ? format(date, "MMMM dd, yyyy") : 'Date Pending'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 border-y py-8 border-dashed">
                  <div className="flex justify-between items-center text-muted-foreground uppercase text-[10px] font-black tracking-widest">
                    <span>Base Hire Charge:</span>
                    <span className="font-mono text-primary text-sm">₹ {baseRent.toLocaleString()}</span>
                  </div>
                  {isCollaboration && (
                    <div className="flex justify-between items-center text-destructive">
                      <span className="uppercase text-[10px] font-black tracking-widest">Collab (Sec 14.4):</span>
                      <span className="font-mono font-black text-xs">+ ₹ {collaborationSurcharge.toLocaleString()}</span>
                    </div>
                  )}
                  {standeesCount > 0 && (
                    <div className="flex justify-between items-center text-destructive">
                      <span className="uppercase text-[10px] font-black tracking-widest">Standees ({standeesCount}):</span>
                      <span className="font-mono font-black text-xs">+ ₹ {standeeFee.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="pt-4 flex justify-between items-center font-black text-3xl text-primary uppercase tracking-tighter">
                    <span>Total Rent:</span>
                    <span className="font-mono">₹ {totalRent.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-6 bg-primary text-white rounded-[2rem] shadow-xl border-b-4 border-accent space-y-3">
                  <div className="flex justify-between items-center font-black text-xs uppercase tracking-widest text-accent">
                    <span>Security Deposit:</span>
                    <span className="font-mono">₹ {securityDeposit.toLocaleString()}</span>
                  </div>
                  <p className="text-[9px] font-bold italic leading-tight uppercase opacity-70">
                    Refundable within 15 days post-event subject to damage assessment (Section 2.2).
                  </p>
                </div>
                
                <div className="pt-4 space-y-4">
                  <p className="font-black text-[10px] uppercase text-primary tracking-widest border-b pb-2">Mandatory Seating (Sec 8.1)</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary/50 rounded-xl text-center">
                      <p className="text-xl font-black text-primary">725</p>
                      <p className="text-[8px] font-bold uppercase text-muted-foreground">General Seats</p>
                    </div>
                    <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl text-center">
                      <p className="text-xl font-black text-accent">25</p>
                      <p className="text-[8px] font-bold uppercase text-primary">Dept. Reserved</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-6 bg-white rounded-3xl shadow-xl border-2 border-primary/5 flex gap-4">
              <div className="bg-primary/10 p-3 rounded-2xl h-fit">
                <Info className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-primary">Section 2.1 Mandate</p>
                <p className="text-[9px] text-muted-foreground font-bold leading-tight uppercase">
                  Full payment of rent and security is required for allotment confirmation. No verbal bookings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
