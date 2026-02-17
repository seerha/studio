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
  AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";

export default function RequesterDashboard() {
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const session = localStorage.getItem("govbook_session");
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  const [bookings, setBookings] = useState([
    { id: "BR-4092", event: "National Science Symposium", slot: "Slot 1 (09:00 AM - 02:00 PM)", date: "Oct 14, 2026", status: "Approved", action: "Pay Now", docsPending: true },
    { id: "BR-3981", event: "Quarterly Review Meeting", slot: "Slot 2 (05:00 PM - 10:00 PM)", date: "Nov 02, 2025", status: "Pending", action: "View Status", docsPending: false },
    { id: "BR-2104", event: "Youth Cultural Fest", slot: "Slot 1 (09:00 AM - 02:00 PM)", date: "Jan 12, 2025", status: "Confirmed", action: "Download Allotment", docsPending: false },
  ]);

  const cancelBooking = (id: string) => {
    // SRS Rule: Hire charges and security forfeited if cancelled by user
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "Cancelled", action: "None" } : b));
    toast({
      title: "Allotment Withdrawn",
      description: `Request ${id} cancelled. 100% Fees Forfeited as per SRS policy.`,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-secondary/30 pb-16">
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-black font-headline text-primary uppercase tracking-tighter">Requester Dashboard</h1>
            <div className="flex items-center gap-3 pl-1">
              <Badge className="bg-primary text-white font-black py-1 px-3 rounded-lg text-[10px] uppercase tracking-widest shadow-sm">
                {user?.role === 'admin' ? 'Administrative Authority' : 'Verified Category A (Govt)'}
              </Badge>
              <p className="text-muted-foreground font-bold text-xs uppercase tracking-tight flex items-center gap-2">
                <Building className="h-3.5 w-3.5" /> Authorized: {user?.name || 'Vikas Bhawan Personnel'}
              </p>
            </div>
          </div>
          <Button className="bg-accent text-primary hover:bg-accent/90 shadow-2xl font-black py-7 px-10 rounded-2xl uppercase tracking-widest text-sm transition-all hover:scale-105" asChild>
            <Link href="/booking/new"><Plus className="mr-2 h-5 w-5" /> Initiate New Booking</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <Card className="border-none shadow-2xl bg-white rounded-3xl overflow-hidden">
              <CardHeader className="bg-primary text-white py-8 px-10">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                      <FileBadge className="h-7 w-7 text-accent" />
                      Current Allotment Requests
                    </CardTitle>
                    <CardDescription className="text-primary-foreground/70 font-medium">SRS Rule: Minimum 30 days advance booking required.</CardDescription>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl border border-white/20">
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/40 border-b hover:bg-secondary/40">
                      <TableHead className="font-black uppercase text-[10px] tracking-widest py-6 px-10">Reference ID</TableHead>
                      <TableHead className="font-black uppercase text-[10px] tracking-widest">Shift / Slot</TableHead>
                      <TableHead className="font-black uppercase text-[10px] tracking-widest">Slot Date</TableHead>
                      <TableHead className="font-black uppercase text-[10px] tracking-widest">Status</TableHead>
                      <TableHead className="text-right font-black uppercase text-[10px] tracking-widest px-10">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id} className="hover:bg-secondary/10 transition-colors">
                        <TableCell className="font-black text-primary py-6 px-10">{booking.id}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-bold text-primary/80 uppercase text-[10px]">{booking.event}</span>
                            <span className="text-[9px] font-black text-accent uppercase flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3" /> {booking.slot}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs font-black text-muted-foreground uppercase">{booking.date}</TableCell>
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
                              <Button size="sm" className="bg-primary font-black uppercase text-[10px] rounded-lg tracking-widest px-4 shadow-md">Pay Hire Charges</Button>
                            )}
                            {booking.status === "Confirmed" && (
                              <Button variant="outline" size="sm" className="font-black border-primary text-primary uppercase text-[10px] rounded-lg tracking-widest px-4 hover:bg-primary hover:text-white transition-all">Allotment Letter</Button>
                            )}
                            {(booking.status === "Pending" || booking.status === "Approved") && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="text-destructive font-black uppercase text-[10px] rounded-lg tracking-widest hover:bg-destructive/10"><XCircle className="h-3.5 w-3.5" /></Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="rounded-2xl border-none shadow-2xl">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="text-2xl font-black uppercase text-destructive">Withdraw Allotment Request?</AlertDialogTitle>
                                    <AlertDialogDescription className="font-medium leading-relaxed">
                                      CRITICAL: SRS policy mandates 100% forfeiture of hire charges and security deposit if cancelled by the user. 
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter className="gap-3">
                                    <AlertDialogCancel className="font-bold">Retain Allotment</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => cancelBooking(booking.id)} className="bg-destructive text-white font-black uppercase tracking-widest">Confirm & Forfeit</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Compliance Section */}
            <Card className="border-none shadow-2xl bg-white rounded-3xl overflow-hidden">
              <CardHeader className="bg-accent/10 border-b-2 py-8 px-10">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-black uppercase tracking-tight flex items-center gap-3 text-primary">
                      <ShieldCheck className="h-6 w-6 text-primary" />
                      Statutory Compliance (Licensing)
                    </CardTitle>
                    <CardDescription className="font-medium">Mandatory Document Upload: Required 4 days prior to event slot.</CardDescription>
                  </div>
                  <Badge className="bg-primary/5 text-primary border-primary/20 font-black">DEADLINE: 4 DAYS PRIOR</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {[
                    { label: "Police Permission (local SSP office)", status: "Pending", ref: "BR-4092" },
                    { label: "Fire Safety Audit Checklist", status: "Pending", ref: "BR-4092" },
                    { label: "IPRS Copyright NOC", status: "Verified", ref: "BR-2104" },
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-5 border-2 border-primary/5 rounded-2xl hover:bg-primary/5 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="bg-secondary p-2 rounded-xl group-hover:bg-white transition-colors">
                          <FileText className="h-5 w-5 text-primary/40" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-black uppercase text-primary/80">{doc.label}</span>
                          <span className="text-[9px] font-bold text-muted-foreground">Linked Ref: {doc.ref}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <Badge variant={doc.status === "Verified" ? "default" : "outline"} className="font-black text-[9px] uppercase tracking-widest px-3">
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
                <CardTitle className="text-xl font-black flex items-center gap-3 uppercase tracking-tight">
                  <AlertCircle className="h-6 w-6 text-accent" />
                  Critical Deadline
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-6">
                <div className="p-6 bg-white/10 rounded-2xl border-2 border-white/20 backdrop-blur-sm shadow-inner">
                  <p className="text-sm font-black uppercase mb-2 text-accent">Submit Statutory Permits</p>
                  <p className="text-[11px] text-white/80 mb-6 font-bold leading-relaxed uppercase tracking-tight">
                    Booking #BR-4092 requires Police & Fire clearance by Oct 10. Failure results in automatic forfeiture as per SRS.
                  </p>
                  <Button size="sm" className="bg-accent text-primary hover:bg-accent/90 w-full h-14 font-black uppercase tracking-widest shadow-xl transition-all" onClick={() => toast({ title: "Compliance Portal Opened" })}>
                    Upload Permits <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-3 pt-2">
                  <p className="text-[10px] font-black uppercase text-accent/60 tracking-widest">Mandatory Notes:</p>
                  <ul className="text-[9px] space-y-2 font-bold uppercase tracking-tight opacity-70">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-accent rounded-full" />
                      25 Reserved Seats for Department
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-accent rounded-full" />
                      Handover 2.5 Hrs Prior to Slot
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-accent rounded-full" />
                      No Plastic/Catering inside Hall
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-2xl bg-white rounded-3xl overflow-hidden">
              <CardHeader className="pb-4 pt-8 px-8">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <CardTitle className="text-lg font-black uppercase tracking-tighter text-primary">Strict Penalties</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-8 text-[11px] space-y-4 text-muted-foreground font-bold uppercase tracking-tight leading-relaxed">
                <div className="p-4 bg-destructive/5 border-l-4 border-destructive rounded-r-xl">
                  <p className="text-destructive">User Cancellation = 100% Forfeiture</p>
                </div>
                <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-xl">
                  <p className="text-primary">Overtime extension (&gt;2 hrs) = Full Day Rent Charge</p>
                </div>
                <div className="p-4 bg-accent/5 border-l-4 border-accent rounded-r-xl">
                  <p className="text-accent-foreground font-black">Misrepresentation = Immediate Disqualification</p>
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t-2 mt-4 bg-secondary/30 py-6 px-8 rounded-b-3xl">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-primary">Vikas Bhawan Complex</span>
                  <span className="text-[9px] font-bold text-muted-foreground uppercase">Sector-62, SAS Nagar, Punjab</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
