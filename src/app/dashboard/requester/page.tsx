"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LayoutDashboard, Calendar, FileText, Clock, CheckCircle2, AlertCircle, Plus } from "lucide-react";
import Link from "next/link";

export default function RequesterDashboard() {
  const bookings = [
    { id: "BR-4092", event: "National Science Symposium", date: "Oct 14, 2026", status: "Approved", action: "Pay Now" },
    { id: "BR-3981", event: "Quarterly Review Meeting", date: "Nov 02, 2025", status: "Pending Approval", action: "View" },
    { id: "BR-2104", event: "Youth Cultural Fest", date: "Jan 12, 2025", status: "Confirmed", action: "Download Ticket" },
  ];

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
            <p className="text-muted-foreground">Welcome, Dept. of Science (Category A)</p>
          </div>
          <Button className="bg-accent text-primary hover:bg-accent/90" asChild>
            <Link href="/booking/new"><Plus className="mr-2 h-4 w-4" /> New Booking Request</Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: <Calendar className="text-primary" />, label: "Total Bookings", value: "12" },
            { icon: <Clock className="text-accent" />, label: "Pending Approval", value: "3" },
            { icon: <CheckCircle2 className="text-green-600" />, label: "Confirmed", value: "8" },
            { icon: <AlertCircle className="text-destructive" />, label: "Cancelled", value: "1" },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-secondary rounded-lg">{stat.icon}</div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings Table */}
          <Card className="lg:col-span-2 border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-headline">Recent Requests</CardTitle>
              <CardDescription>Track the status of your auditorium booking proposals.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference ID</TableHead>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Event Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>{booking.event}</TableCell>
                      <TableCell>{booking.date}</TableCell>
                      <TableCell>
                        <Badge variant={booking.status === "Confirmed" ? "default" : booking.status === "Approved" ? "secondary" : "outline"}
                          className={booking.status === "Approved" ? "bg-accent text-primary" : ""}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="text-primary font-bold">
                          {booking.action}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Quick Actions / Notifications */}
          <div className="space-y-6">
            <Card className="border-none shadow-md bg-primary text-white">
              <CardHeader>
                <CardTitle className="text-lg">Action Required</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                  <p className="text-sm font-bold mb-1">Invoice #INV-4092 Pending</p>
                  <p className="text-xs text-white/70 mb-3">Your booking for Oct 14 has been approved. Please complete payment within 48 hours to secure the date.</p>
                  <Button size="sm" className="bg-accent text-primary hover:bg-accent/90 w-full">Proceed to Payment</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Helpful Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="#" className="flex items-center gap-3 text-sm text-primary hover:underline">
                  <FileText className="h-4 w-4" /> Download User Manual
                </Link>
                <Link href="#" className="flex items-center gap-3 text-sm text-primary hover:underline">
                  <ShieldCheck className="h-4 w-4" /> Security Guidelines
                </Link>
                <Link href="#" className="flex items-center gap-3 text-sm text-primary hover:underline">
                  <AlertCircle className="h-4 w-4" /> Prohibited Activities List
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
