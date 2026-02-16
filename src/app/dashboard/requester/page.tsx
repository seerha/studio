
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
  XCircle
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
    { id: "BR-4092", event: "National Science Symposium", date: "Oct 14, 2026", status: "Approved", action: "Pay Now" },
    { id: "BR-3981", event: "Quarterly Review Meeting", date: "Nov 02, 2025", status: "Pending", action: "View Status" },
    { id: "BR-2104", event: "Youth Cultural Fest", date: "Jan 12, 2025", status: "Confirmed", action: "Download Ticket" },
    { id: "BR-4501", event: "Digital India Workshop", date: "Dec 15, 2025", status: "Approved", action: "Pay Now" },
  ]);

  const cancelBooking = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "Cancelled", action: "None" } : b));
    toast({
      title: "Booking Cancelled",
      description: `Request ${id} has been successfully withdrawn.`,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-headline text-primary">User Dashboard</h1>
            <p className="text-muted-foreground">Welcome, {user?.name || 'Authorized Personnel'} (Category A)</p>
          </div>
          <Button className="bg-accent text-primary hover:bg-accent/90 shadow-md font-bold" asChild>
            <Link href="/booking/new"><Plus className="mr-2 h-4 w-4" /> New Booking Request</Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: <Calendar className="text-primary" />, label: "Total Bookings", value: bookings.length.toString() },
            { icon: <Clock className="text-accent" />, label: "Pending Approval", value: bookings.filter(b => b.status === 'Pending').length.toString() },
            { icon: <CheckCircle2 className="text-green-600" />, label: "Confirmed", value: bookings.filter(b => b.status === 'Confirmed' || b.status === 'Approved').length.toString() },
            { icon: <AlertCircle className="text-destructive" />, label: "Cancelled", value: bookings.filter(b => b.status === 'Cancelled').length.toString() },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm bg-white">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-secondary rounded-lg">{stat.icon}</div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings Table */}
          <Card className="lg:col-span-2 border-none shadow-md bg-white">
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-xl font-headline flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Current Allotment Requests
              </CardTitle>
              <CardDescription>Manage your auditorium booking proposals and payments.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/20">
                    <TableHead className="font-bold">Reference ID</TableHead>
                    <TableHead className="font-bold">Event Title</TableHead>
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
                      <TableCell className="text-sm">{booking.date}</TableCell>
                      <TableCell>
                        <Badge variant={
                          booking.status === "Confirmed" ? "default" : 
                          booking.status === "Approved" ? "secondary" : 
                          booking.status === "Cancelled" ? "destructive" : "outline"
                        }
                        className={
                          booking.status === "Approved" ? "bg-accent text-primary font-bold border-none" : 
                          booking.status === "Confirmed" ? "bg-green-600 text-white border-none" : ""
                        }>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {booking.status !== "Cancelled" && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                                  <XCircle className="h-4 w-4 mr-1" /> Cancel
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Cancel Booking Request?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to withdraw the request for {booking.event}? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => cancelBooking(booking.id)} className="bg-destructive text-white">Confirm Cancellation</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                          
                          {booking.action === "Pay Now" && (
                            <Button 
                              size="sm" 
                              className="bg-primary text-white hover:bg-primary/90 font-bold"
                              onClick={() => toast({ title: "Redirecting to Gateway", description: "Loading secure payment portal..." })}
                            >
                              <CreditCard className="mr-1 h-3 w-3" /> Pay Now
                            </Button>
                          )}
                          {booking.action === "Download Ticket" && (
                            <Button variant="outline" size="sm" className="font-bold border-primary text-primary">
                              <Download className="mr-1 h-3 w-3" /> E-Ticket
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Side Info Panel */}
          <div className="space-y-6">
            <Card className="border-none shadow-md bg-primary text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-accent" />
                  Urgent Action
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                  <p className="text-sm font-bold mb-1">Invoice #INV-4092 Pending</p>
                  <p className="text-xs text-white/70 mb-4 leading-relaxed">
                    Your booking for Oct 14 has been approved. Complete payment within 48 hours or the slot will be released.
                  </p>
                  <Button size="sm" className="bg-accent text-primary hover:bg-accent/90 w-full font-bold shadow-sm" onClick={() => toast({ title: "Payment Initiated" })}>
                    Complete Payment <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Quick Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/tariff" className="flex items-center gap-3 text-sm text-primary hover:underline group">
                  <div className="p-1.5 bg-secondary rounded group-hover:bg-primary/10"><Building className="h-4 w-4" /></div>
                  <span>View Tariff Structure</span>
                </Link>
                <Link href="/guidelines" className="flex items-center gap-3 text-sm text-primary hover:underline group">
                  <div className="p-1.5 bg-secondary rounded group-hover:bg-primary/10"><FileText className="h-4 w-4" /></div>
                  <span>Security Guidelines</span>
                </Link>
              </CardContent>
              <CardFooter className="pt-2 border-t mt-4 bg-secondary/30 rounded-b-lg">
                <p className="text-[10px] text-muted-foreground italic">
                  Support: support@govbook.in
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
