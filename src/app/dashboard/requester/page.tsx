
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
  ShieldCheck
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
    { id: "BR-4092", event: "National Science Symposium", date: "Oct 14, 2026", status: "Approved", action: "Pay Now", docsPending: true },
    { id: "BR-3981", event: "Quarterly Review Meeting", date: "Nov 02, 2025", status: "Pending", action: "View Status", docsPending: false },
    { id: "BR-2104", event: "Youth Cultural Fest", date: "Jan 12, 2025", status: "Confirmed", action: "Download Ticket", docsPending: false },
  ]);

  const cancelBooking = (id: string) => {
    // SRS Rule: Hire charges forfeited if cancelled by user
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "Cancelled", action: "None" } : b));
    toast({
      title: "Booking Withdrawn",
      description: `Request ${id} cancelled. Note: Fees forfeited as per SRS.`,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-headline text-primary">Vikas Bhawan Requester</h1>
            <p className="text-muted-foreground">Authorized: {user?.name || 'Authorized Personnel'}</p>
          </div>
          <Button className="bg-accent text-primary hover:bg-accent/90 shadow-md font-bold" asChild>
            <Link href="/booking/new"><Plus className="mr-2 h-4 w-4" /> Initiate New Booking</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-md bg-white">
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-xl font-headline flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Active Allotment Requests
                </CardTitle>
                <CardDescription>All bookings must be confirmed 30 days in advance.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/20">
                      <TableHead className="font-bold">Ref ID</TableHead>
                      <TableHead className="font-bold">Event</TableHead>
                      <TableHead className="font-bold">Date</TableHead>
                      <TableHead className="font-bold">Status</TableHead>
                      <TableHead className="text-right font-bold">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id} className="hover:bg-secondary/5">
                        <TableCell className="font-bold text-primary">{booking.id}</TableCell>
                        <TableCell className="font-medium">{booking.event}</TableCell>
                        <TableCell className="text-xs">{booking.date}</TableCell>
                        <TableCell>
                          <Badge variant={
                            booking.status === "Confirmed" ? "default" : 
                            booking.status === "Approved" ? "secondary" : "outline"
                          }>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {booking.status === "Approved" && (
                              <Button size="sm" className="bg-primary font-bold">Pay Now</Button>
                            )}
                            {booking.status === "Confirmed" && (
                              <Button variant="outline" size="sm" className="font-bold border-primary text-primary">Allotment Letter</Button>
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
            <Card className="border-none shadow-md bg-white">
              <CardHeader className="bg-accent/5 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Statutory Document Compliance
                </CardTitle>
                <CardDescription>Upload mandatory licenses at least 4 days prior to event.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { label: "Police Permission (SSP Office)", status: "Pending" },
                    { label: "Fire Safety Audit", status: "Pending" },
                    { label: "Copyright NOC (IPRS)", status: "Uploaded" },
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{doc.label}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={doc.status === "Uploaded" ? "default" : "outline"}>{doc.status}</Badge>
                        <Button variant="ghost" size="sm" className="text-primary"><Upload className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-md bg-primary text-white">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-accent" />
                  Critical Task
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                  <p className="text-sm font-bold mb-1">Upload Statutory Permits</p>
                  <p className="text-[10px] text-white/70 mb-4 leading-relaxed">
                    Booking #BR-4092 requires Police & Fire clearance by Oct 10. Failure results in forfeiture.
                  </p>
                  <Button size="sm" className="bg-accent text-primary hover:bg-accent/90 w-full font-bold shadow-sm" onClick={() => toast({ title: "Compliance Portal Opened" })}>
                    Submit Permits <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Rules Reminder</CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-3 text-muted-foreground">
                <p>• 750 Max Capacity (Strict)</p>
                <p>• 25 Seats Reserved for Authority</p>
                <p>• No food/drink inside hall</p>
                <p>• 30 min exit window mandatory</p>
              </CardContent>
              <CardFooter className="pt-2 border-t mt-4 bg-secondary/30 rounded-b-lg">
                <p className="text-[10px] italic">Vikas Bhawan Complex, SAS Nagar</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
