
"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  Calendar as CalendarIcon, 
  FileCheck, 
  AlertTriangle, 
  Search, 
  Eye, 
  CheckCircle, 
  XCircle,
  BarChart4,
  Filter,
  ShieldAlert,
  CalendarDays,
  Trash2,
  Undo2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdminDashboard() {
  const { toast } = useToast();
  
  const [allBookings, setAllBookings] = useState([
    { id: "BR-4092", user: "Dept of Science", category: "Cat A", event: "National Science Symposium", date: "Oct 14, 2026", vip: "Yes", status: "pending" },
    { id: "BR-4105", user: "Green NGO", category: "Cat B", event: "Eco-Summit 2025", date: "Nov 12, 2025", vip: "No", status: "approved" },
    { id: "BR-4112", user: "Tech Solutions Ltd", category: "Cat C", event: "Product Launch", date: "Dec 05, 2025", vip: "No", status: "pending" },
    { id: "BR-4201", user: "Social Welfare Dept", category: "Cat A", event: "Annual Awards Ceremony", date: "Jan 15, 2026", vip: "Yes", status: "approved" },
    { id: "BR-4205", user: "Medical Association", category: "Cat B", event: "Healthcare Webinar", date: "Feb 10, 2026", vip: "No", status: "pending" },
  ]);

  const [blockedDates, setBlockedDates] = useState<{id: string, date: Date, reason: string, type: string}[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    const savedBlocks = localStorage.getItem("govbook_blocked_dates");
    if (savedBlocks) {
      try {
        const parsed = JSON.parse(savedBlocks).map((b: any) => ({
          ...b,
          date: new Date(b.date)
        }));
        setBlockedDates(parsed);
      } catch (e) {
        console.error("Failed to parse blocked dates", e);
      }
    } else {
      const initialBlocks = [
        { id: "BLOCK-001", date: new Date(2025, 2, 20), reason: "State G20 Preparation", type: "Security" },
        { id: "BLOCK-002", date: new Date(2025, 2, 10), reason: "VIP Visit (Hon. PM)", type: "Security" },
      ];
      setBlockedDates(initialBlocks);
      localStorage.setItem("govbook_blocked_dates", JSON.stringify(initialBlocks));
    }
  }, []);

  const [overrideDate, setOverrideDate] = useState<Date>();
  const [overrideReason, setOverrideReason] = useState("");
  const [overrideType, setOverrideType] = useState("Emergency");
  const [revocationId, setRevocationId] = useState("");

  const updateBookingStatus = (id: string, newStatus: string) => {
    setAllBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    
    let title = "Status Updated";
    let variant: "default" | "destructive" = "default";

    if (newStatus === 'approved') title = "Booking Approved";
    if (newStatus === 'rejected') { title = "Booking Rejected"; variant = "destructive"; }
    if (newStatus === 'cancelled') { title = "Booking Revoked"; variant = "destructive"; }

    toast({
      title,
      description: `Booking reference ${id} has been moved to ${newStatus}.`,
      variant,
    });
  };

  const handleQuickRevocation = () => {
    const booking = allBookings.find(b => b.id === revocationId);
    if (!booking) {
      toast({ title: "Reference Not Found", description: "The provided ID does not match any record.", variant: "destructive" });
      return;
    }
    updateBookingStatus(revocationId, 'cancelled');
    setRevocationId("");
  };

  const handleEmergencyOverride = () => {
    if (!overrideDate || !overrideReason) {
      toast({ title: "Incomplete Details", description: "Please select a date and provide a valid reason.", variant: "destructive" });
      return;
    }

    const newBlock = {
      id: `BLOCK-${Math.floor(Math.random() * 1000)}`,
      date: overrideDate,
      reason: overrideReason,
      type: overrideType,
    };

    const updatedBlocks = [newBlock, ...blockedDates];
    setBlockedDates(updatedBlocks);
    localStorage.setItem("govbook_blocked_dates", JSON.stringify(updatedBlocks));

    toast({
      title: "State Override Activated",
      description: `The auditorium has been blocked for ${format(overrideDate, "PPP")}.`,
      variant: "destructive",
    });

    setOverrideDate(undefined);
    setOverrideReason("");
  };

  const removeBlock = (id: string) => {
    const updatedBlocks = blockedDates.filter(b => b.id !== id);
    setBlockedDates(updatedBlocks);
    localStorage.setItem("govbook_blocked_dates", JSON.stringify(updatedBlocks));
    toast({ title: "Block Lifted", description: "The slot is now open for public booking." });
  };

  const pendingRequests = allBookings.filter(b => b.status === 'pending');
  const approvedBookings = allBookings.filter(b => b.status === 'approved');

  const handleDateSelect = (date: Date | undefined) => {
    setOverrideDate(date);
    setIsPopoverOpen(false);
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-headline text-primary">Admin Control Center</h1>
            <p className="text-muted-foreground">Authorized: Approving Authority Level-II (Admin)</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-primary text-primary" onClick={() => toast({ title: "Report Generation Started" })}>
              <BarChart4 className="mr-2 h-4 w-4" /> Reports
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="bg-destructive shadow-lg hover:bg-destructive/90">
                  <AlertTriangle className="mr-2 h-4 w-4" /> Emergency State Override
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                    <ShieldAlert className="h-6 w-6" />
                    Critical State Override
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-foreground/80">
                    This action will instantly block the auditorium. Existing bookings for this slot will be notified for cancellation.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                
                <div className="py-4 space-y-4">
                  <div className="space-y-2">
                    <Label>Select Target Date</Label>
                    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal border-primary/20", !overrideDate && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {overrideDate ? format(overrideDate, "PPP") : <span>Pick a date to block</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar 
                          mode="single" 
                          selected={overrideDate} 
                          onSelect={handleDateSelect} 
                          initialFocus 
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Reason for Override</Label>
                    <Select value={overrideType} onValueChange={setOverrideType}>
                      <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Emergency">National Emergency</SelectItem>
                        <SelectItem value="State">State Government Function</SelectItem>
                        <SelectItem value="Security">VIP / Security Movement</SelectItem>
                        <SelectItem value="Maintenance">Urgent Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Specific Details</Label>
                    <Input 
                      placeholder="e.g. G20 Summit Preparation" 
                      value={overrideReason} 
                      onChange={(e) => setOverrideReason(e.target.value)} 
                    />
                  </div>
                </div>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleEmergencyOverride} className="bg-destructive hover:bg-destructive/90 text-white">
                    Confirm & Activate
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "New Users", value: "24", icon: <Users className="text-blue-500" /> },
            { label: "Pending", value: pendingRequests.length.toString(), icon: <CalendarIcon className="text-accent" /> },
            { label: "Approved", value: approvedBookings.length.toString(), icon: <FileCheck className="text-green-500" /> },
            { label: "Admin Blocks", value: blockedDates.length.toString(), icon: <ShieldAlert className="text-destructive" /> },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm bg-white">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">{stat.icon}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="pending-bookings" className="space-y-6">
          <TabsList className="bg-white p-1 border inline-flex">
            <TabsTrigger value="pending-bookings" className="px-6">Pending ({pendingRequests.length})</TabsTrigger>
            <TabsTrigger value="active-bookings" className="px-6">Approved ({approvedBookings.length})</TabsTrigger>
            <TabsTrigger value="master-calendar" className="px-6">Master Control</TabsTrigger>
          </TabsList>

          <TabsContent value="pending-bookings">
            <Card className="border-none shadow-md">
              <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl font-headline text-primary">Pending Allotment Requests</CardTitle>
                  <CardDescription>Review and approve or reject incoming requests.</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {pendingRequests.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/20">
                        <TableHead>Ref ID</TableHead>
                        <TableHead>Organization</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingRequests.map((req) => (
                        <TableRow key={req.id}>
                          <TableCell className="font-bold text-primary">{req.id}</TableCell>
                          <TableCell>{req.user}</TableCell>
                          <TableCell className="font-medium">{req.event}</TableCell>
                          <TableCell>{req.date}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" onClick={() => updateBookingStatus(req.id, 'approved')} className="text-green-600">Approve</Button>
                              <Button variant="outline" size="sm" onClick={() => updateBookingStatus(req.id, 'rejected')} className="text-destructive">Reject</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="p-16 text-center text-muted-foreground">No pending requests found.</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active-bookings">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-headline text-primary">Approved & Confirmed Allotments</CardTitle>
                <CardDescription>All currently valid bookings. Admin can revoke any allotment if necessary.</CardDescription>
              </CardHeader>
              <CardContent>
                {approvedBookings.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/20">
                        <TableHead>Ref ID</TableHead>
                        <TableHead>Organization</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {approvedBookings.map((req) => (
                        <TableRow key={req.id}>
                          <TableCell className="font-bold text-primary">{req.id}</TableCell>
                          <TableCell>{req.user}</TableCell>
                          <TableCell className="font-medium">{req.event}</TableCell>
                          <TableCell>{req.date}</TableCell>
                          <TableCell className="text-right">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive hover:text-white">Revoke</Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Revoke Approved Allotment?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will cancel the booking for {req.event} on {req.date}. The organization will be notified and a refund will be initiated.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => updateBookingStatus(req.id, 'cancelled')} className="bg-destructive text-white">Confirm Revocation</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="p-16 text-center text-muted-foreground">No approved bookings found.</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="master-calendar">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 border-none shadow-md">
                <CardHeader className="bg-secondary/50 border-b">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Active Administrative Blocks</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {blockedDates.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {blockedDates.map((block) => (
                          <TableRow key={block.id}>
                            <TableCell className="font-bold">{format(block.date, "PP")}</TableCell>
                            <TableCell className="text-sm">{block.reason}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => removeBlock(block.id)} className="hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="p-12 text-center text-muted-foreground">No active administrative blocks.</div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-none shadow-md bg-primary text-white">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-accent" /> Quick Revocation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-xs opacity-80 leading-relaxed">Enter a Reference ID to instantly revoke an allotment.</p>
                  <Input 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40" 
                    placeholder="e.g. BR-4092" 
                    value={revocationId}
                    onChange={(e) => setRevocationId(e.target.value)}
                  />
                  <Button variant="secondary" className="w-full bg-accent text-primary hover:bg-accent/90 font-bold" onClick={handleQuickRevocation}>Revoke Booking</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
