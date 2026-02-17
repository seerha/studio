"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Calendar, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Download, 
  CreditCard,
  Building,
  ArrowUpRight,
  XCircle,
  Upload,
  ShieldCheck,
  FileBadge,
  AlertTriangle,
  Search,
  Activity
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogDescription
} from "@/components/ui/alert-dialog";
import { useFirestore, useUser, useCollection, useMemoFirebase, updateDocumentNonBlocking } from "@/firebase";
import { collection, query, where, doc } from "firebase/firestore";

export default function RequesterDashboard() {
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useUser();
  const firestore = useFirestore();

  useEffect(() => {
    const s = localStorage.getItem("govbook_session");
    if (s) {
      setSession(JSON.parse(s));
    }
  }, []);

  // Real-time query for current user's bookings
  const bookingsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, "bookings"), where("userId", "==", user.uid));
  }, [firestore, user]);
  const { data: bookings, isLoading: isBookingsLoading } = useCollection(bookingsQuery);

  const cancelBooking = (id: string) => {
    if (!firestore) return;
    const bookingRef = doc(firestore, "bookings", id);
    updateDocumentNonBlocking(bookingRef, { status: "Cancelled" });
    
    toast({
      title: "Allotment Withdrawn",
      description: `Request ${id.slice(0, 6)} cancelled. 100% Fees Forfeited as per SRS Section 13.2.`,
      variant: "destructive",
    });
  };

  const filteredBookings = bookings?.filter(b => 
    b.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-secondary/30 pb-16">
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-black font-headline text-primary uppercase tracking-tighter">My Applications</h1>
            <div className="flex items-center gap-3 pl-1">
              <Badge className="bg-primary text-white font-black py-1 px-3 rounded-lg text-[10px] uppercase tracking-widest shadow-sm">
                Official Category A (Govt)
              </Badge>
              <p className="text-muted-foreground font-bold text-xs uppercase tracking-tight flex items-center gap-2">
                <Building className="h-3.5 w-3.5" /> Dept: {session?.name || 'Vikas Bhawan Personnel'}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
             <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search Reference ID..." 
                className="pl-10 pr-4 py-2 rounded-xl border-2 border-primary/10 bg-white focus:border-primary outline-none font-bold text-xs uppercase tracking-widest w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-accent text-primary hover:bg-accent/90 shadow-2xl font-black py-7 px-10 rounded-2xl uppercase tracking-widest text-sm transition-all hover:scale-105" asChild>
              <Link href="/booking/new"><Plus className="mr-2 h-5 w-5" /> New Proposal</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white p-6 rounded-3xl shadow-xl flex items-center justify-between border-l-8 border-accent">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-2xl">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase text-primary">Live Application Tracking</h3>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Real-time status updates from SRS Authority</p>
                </div>
              </div>
              <div className="flex gap-8 px-6 border-l">
                <div className="text-center">
                  <p className="text-2xl font-black text-primary">{bookings?.filter(b => b.status === 'Pending').length || 0}</p>
                  <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Awaiting</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black text-accent">{bookings?.filter(b => b.status === 'Approved').length || 0}</p>
                  <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Approved</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black text-green-600">{bookings?.filter(b => b.status === 'Confirmed').length || 0}</p>
                  <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Confirmed</p>
                </div>
              </div>
            </div>

            <Card className="border-none shadow-2xl bg-white rounded-3xl overflow-hidden">
              <CardHeader className="bg-primary text-white py-8 px-10">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                      <FileBadge className="h-7 w-7 text-accent" />
                      Application Lifecycle
                    </CardTitle>
                    <CardDescription className="text-primary-foreground/70 font-medium italic">Track your event proposals through the official SRS pipeline.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/40 border-b hover:bg-secondary/40">
                      <TableHead className="font-black uppercase text-[10px] tracking-widest py-6 px-10">Ref ID</TableHead>
                      <TableHead className="font-black uppercase text-[10px] tracking-widest">Shift & Event</TableHead>
                      <TableHead className="font-black uppercase text-[10px] tracking-widest">Status</TableHead>
                      <TableHead className="text-right font-black uppercase text-[10px] tracking-widest px-10">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.length > 0 ? filteredBookings.map((booking) => (
                      <TableRow key={booking.id} className="hover:bg-secondary/10 transition-colors">
                        <TableCell className="font-black text-primary py-8 px-10">{booking.id.slice(0, 6)}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-bold text-primary/80 uppercase text-[10px]">{booking.eventName}</span>
                            <span className="text-[9px] font-black text-accent uppercase flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3" /> {booking.slot === 'slot1' ? 'Shift 1: Morning' : 'Shift 2: Evening'}
                            </span>
                            <span className="text-[8px] font-bold text-muted-foreground uppercase mt-1">Date: {booking.bookingDate}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            booking.status === "Confirmed" ? "default" : 
                            booking.status === "Approved" ? "secondary" : 
                            booking.status === "Cancelled" ? "destructive" : "outline"
                          } className="font-black text-[9px] uppercase tracking-widest px-3 py-1">
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right px-10">
                          <div className="flex justify-end gap-3">
                            {booking.status === "Approved" && (
                              <Button size="sm" className="bg-primary font-black uppercase text-[10px] rounded-lg tracking-widest px-4 shadow-md">Pay Now</Button>
                            )}
                            {booking.status === "Confirmed" && (
                              <Button variant="outline" size="sm" className="font-black border-primary text-primary uppercase text-[10px] rounded-lg tracking-widest px-4 hover:bg-primary hover:text-white transition-all">Letter</Button>
                            )}
                            {(booking.status === "Pending" || booking.status === "Approved") && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="text-destructive font-black uppercase text-[10px] rounded-lg tracking-widest hover:bg-destructive/10"><XCircle className="h-3.5 w-3.5" /></Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="rounded-2xl border-none shadow-2xl">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="text-2xl font-black uppercase text-destructive">Withdraw Allotment?</AlertDialogTitle>
                                    <AlertDialogDescription className="font-medium leading-relaxed">
                                      Section 13.2 Warning: Voluntary cancellation by the organizer leads to 100% forfeiture of all fees and security deposit.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter className="gap-3">
                                    <AlertDialogCancel className="font-bold">Retain</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => cancelBooking(booking.id)} className="bg-destructive text-white font-black uppercase tracking-widest">Confirm & Forfeit</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={4} className="py-20 text-center text-muted-foreground font-black uppercase tracking-widest opacity-30">
                          {isBookingsLoading ? "Loading Applications..." : "No matching applications found"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="border-none shadow-2xl bg-white rounded-3xl overflow-hidden">
              <CardHeader className="bg-accent/10 border-b-2 py-8 px-10">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-black uppercase tracking-tight flex items-center gap-3 text-primary">
                      <ShieldCheck className="h-6 w-6 text-primary" />
                      Application Checklist (Licensing)
                    </CardTitle>
                    <CardDescription className="font-medium">Mandatory Section 5 & 6 Documentation.</CardDescription>
                  </div>
                  <Badge className="bg-primary/5 text-primary border-primary/20 font-black">4 DAY DEADLINE</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {[
                    { label: "Police Permission (Section 5.1)", status: "Pending" },
                    { label: "Fire Safety Audit (Section 5.2)", status: "Pending" },
                    { label: "IPRS Copyright NOC (Section 6.1)", status: "Pending" },
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-5 border-2 border-primary/5 rounded-2xl hover:bg-primary/5 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="bg-secondary p-2 rounded-xl group-hover:bg-white transition-colors">
                          <FileText className="h-5 w-5 text-primary/40" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-black uppercase text-primary/80">{doc.label}</span>
                          <span className="text-[9px] font-bold text-muted-foreground uppercase">Required for Confirmation</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <Badge variant="outline" className="font-black text-[9px] uppercase tracking-widest px-3">
                          {doc.status}
                        </Badge>
                        <Button variant="ghost" size="sm" className="text-primary hover:bg-primary hover:text-white rounded-xl h-10 w-10 p-0 transition-all">
                          <Upload className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-10">
            <Card className="border-none shadow-2xl bg-primary text-white rounded-3xl overflow-hidden border-b-8 border-accent">
              <CardHeader className="py-8 px-8">
                <CardTitle className="text-xl font-black flex items-center gap-3 uppercase tracking-tight text-accent">
                  <AlertCircle className="h-6 w-6 text-accent" />
                  Status Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-6">
                <div className="p-6 bg-white/10 rounded-2xl border-2 border-white/20 backdrop-blur-sm shadow-inner">
                  <p className="text-sm font-black uppercase mb-2 text-accent">Real-Time Sync</p>
                  <p className="text-[11px] text-white/80 mb-6 font-bold leading-relaxed uppercase tracking-tight">
                    Your dashboard is linked to the official Firestore backend. All decisions by the Competent Authority will reflect instantly.
                  </p>
                  <Button size="sm" className="bg-accent text-primary hover:bg-accent/90 w-full h-14 font-black uppercase tracking-widest shadow-xl transition-all" asChild>
                    <Link href="/availability">Check Other Slots <ArrowUpRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-2xl bg-white rounded-3xl overflow-hidden">
              <CardHeader className="pb-4 pt-8 px-8 border-b">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <CardTitle className="text-lg font-black uppercase tracking-tighter text-primary">SRS Mandate Check</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-xl text-primary font-black text-xs">8.1</div>
                    <p className="text-[9px] font-bold uppercase text-muted-foreground leading-tight">Strict 750 Seating limit. No standing allowed in aisles or stage wings.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-xl text-primary font-black text-xs">11.8</div>
                    <p className="text-[9px] font-bold uppercase text-muted-foreground leading-tight">Catering strictly prohibited inside auditorium hall and premises.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-secondary/30 py-6 px-8 rounded-b-3xl">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-primary tracking-widest">Interpretation Clause</span>
                  <span className="text-[9px] font-bold text-muted-foreground uppercase opacity-60">Authority decision is final. Section 15.2.</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}