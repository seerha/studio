"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  Calendar, 
  FileCheck, 
  AlertTriangle, 
  Search, 
  Eye, 
  CheckCircle, 
  XCircle,
  BarChart4
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [requests, setRequests] = useState([
    { id: "BR-4092", user: "Dept of Science", category: "Cat A", event: "National Science Symposium", date: "Oct 14, 2026", vip: "Yes", status: "pending" },
    { id: "BR-4105", user: "Green NGO", category: "Cat B", event: "Eco-Summit 2025", date: "Nov 12, 2025", vip: "No", status: "pending" },
    { id: "BR-4112", user: "Tech Solutions Ltd", category: "Cat C", event: "Product Launch", date: "Dec 05, 2025", vip: "No", status: "pending" },
  ]);

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    setRequests(prev => prev.filter(r => r.id !== id));
    toast({
      title: `Request ${action === 'approved' ? 'Approved' : 'Rejected'}`,
      description: `Booking reference ${id} has been processed successfully.`,
      variant: action === 'approved' ? "default" : "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-headline">Admin Control Center</h1>
            <p className="text-muted-foreground">Authorized: Approving Authority Level-II</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-primary text-primary" onClick={() => toast({ title: "Report Generation Started" })}>Generate Reports</Button>
            <Button variant="destructive" className="bg-destructive" onClick={() => toast({ title: "Override Mode Active", variant: "destructive" })}>Emergency Override</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "New Users", value: "24", icon: <Users className="text-blue-500" /> },
            { label: "Pending Bookings", value: requests.length.toString(), icon: <Calendar className="text-accent" /> },
            { label: "Approved Today", value: "15", icon: <FileCheck className="text-green-500" /> },
            { label: "Revoked/Rejected", value: "03", icon: <AlertTriangle className="text-destructive" /> },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="pending-bookings" className="space-y-6">
          <TabsList className="bg-white p-1 border">
            <TabsTrigger value="pending-bookings" className="data-[state=active]:bg-primary data-[state=active]:text-white">Pending Bookings</TabsTrigger>
            <TabsTrigger value="user-verifications" className="data-[state=active]:bg-primary data-[state=active]:text-white">User Verifications</TabsTrigger>
            <TabsTrigger value="master-calendar" className="data-[state=active]:bg-primary data-[state=active]:text-white">Master Control</TabsTrigger>
          </TabsList>

          <TabsContent value="pending-bookings">
            <Card className="border-none shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-xl font-headline">Booking Approval Queue</CardTitle>
                  <CardDescription>Review event proposals and generate invoices.</CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search requests..." className="pl-9 h-9" />
                </div>
              </CardHeader>
              <CardContent>
                {requests.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ref ID</TableHead>
                        <TableHead>Organization</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>VIP</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {requests.map((req) => (
                        <TableRow key={req.id}>
                          <TableCell className="font-bold">{req.id}</TableCell>
                          <TableCell>{req.user}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{req.category}</Badge>
                          </TableCell>
                          <TableCell>{req.event}</TableCell>
                          <TableCell>{req.date}</TableCell>
                          <TableCell>
                            {req.vip === "Yes" ? <Badge className="bg-accent text-primary">VIP</Badge> : "No"}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" title="View Proposal"><Eye className="h-4 w-4" /></Button>
                              <Button variant="outline" size="sm" onClick={() => handleAction(req.id, 'approved')} className="text-green-600 border-green-600 hover:bg-green-50">Approve</Button>
                              <Button variant="outline" size="sm" onClick={() => handleAction(req.id, 'rejected')} className="text-destructive border-destructive hover:bg-red-50">Reject</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="p-12 text-center text-muted-foreground">
                    All booking requests have been processed.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="user-verifications">
            <Card className="border-none shadow-md">
              <CardContent className="p-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">No User Verifications Pending</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">Verifying Officers have cleared the current queue. Check back later for new registrations.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="master-calendar">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 border-none shadow-md">
                <CardHeader>
                  <CardTitle>Calendar Override Control</CardTitle>
                  <CardDescription>Instantly block dates for state emergencies or maintenance.</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center border m-6 rounded-lg bg-secondary/10">
                   <p className="text-muted-foreground italic">Interactive Master Calendar Interface Loading...</p>
                </CardContent>
              </Card>
              <div className="space-y-6">
                <Card className="border-none shadow-md bg-destructive text-white">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><AlertTriangle className="h-5 w-5" /> Force Cancellation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-xs">Select a booked date to revoke approval. 100% automatic refund will be triggered.</p>
                    <Input className="bg-white/10 border-white/20 text-white placeholder:text-white/50" placeholder="Enter Ref ID" />
                    <Button variant="secondary" className="w-full" onClick={() => toast({ title: "Cancellation Processed", variant: "destructive" })}>Revoke Booking</Button>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Direct Block</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-xs text-muted-foreground">Block dates for internal government functions instantly.</p>
                    <Button className="w-full bg-primary" onClick={() => toast({ title: "Block Mode Enabled" })}>Open Direct Block Form</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
