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
  Undo2,
  Building2,
  Stamp
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
    if (newStatus === 'cancelled') { title = "Booking Revoked (SRS Penalty Apply)"; variant = "destructive"; }

    toast({
      title,
      description: `Booking reference ${id} status updated to ${newStatus}.`,
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
      description: `The auditorium has been blocked for ${format(overrideDate, "PPP")}. Notifications sent.`,
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
      <main className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-xl">
                <Stamp className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl font-black font-headline text-primary uppercase tracking-tighter">Authority Control Center</h1>
            </div>
            <p className="text-muted-foreground font-bold uppercase text-xs tracking-widest pl-12 flex items-center gap-2">
              <ShieldAlert className="h-3 w-3" /> Level-II Approving Authority | Dept. of Rural Development, Punjab
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="border-primary text-primary font-bold px-6 py-6 shadow-sm hover:bg-primary hover:text-white" onClick={() => toast({ title: "Report Generation Started" })}>
              <BarChart4 className="mr-2 h-4 w-4" /> Export SRS Reports
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="bg-destructive shadow-2xl hover:bg-destructive/90 font-black px-8 py-6 rounded-xl uppercase tracking-widest">
                  <ShieldAlert className="mr-2 h-5 w-5" /> Emergency Override
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-md rounded-2xl border-none shadow-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2 text-destructive text-2xl font-black uppercase">
                    <ShieldAlert className="h-7 w-7" />
                    State Exigency Override
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-foreground/80 font-medium leading-relaxed">
                    CRITICAL: This action will instantly block the auditorium. Existing bookings for this slot will be auto-cancelled with 100% refund notification.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                
                <div className="py-6 space-y-5">
                  <div className="space-y-2">
                    <Label className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Target Date</Label>
                    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className={cn("w-full justify-start text-left font-bold py-7 border-2 border-primary/10 rounded-xl", !overrideDate && "text-muted-foreground")}>
                          <CalendarIcon className="mr-3 h-5 w-5 text-destructive" />
                          {overrideDate ? format(overrideDate, "PPP") : <span>Select Date to Block</span>}
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
                    <Label className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Classification (SRS Category)</Label>
                    <Select value={overrideType} onValueChange={setOverrideType}>
                      <SelectTrigger className="py-7 rounded-xl border-2 font-bold"><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Emergency">National Emergency</SelectItem>
                        <SelectItem value="State">State Government Function</SelectItem>
                        <SelectItem value="Security">VIP / Security Movement</SelectItem>
                        <SelectItem value="Maintenance">Urgent Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Override Specifics</Label>
                    <Input 
                      placeholder="e.g. CM Visit / G20 Preparation" 
                      className="py-7 rounded-xl border-2 font-bold"
                      value={overrideReason} 
                      onChange={(e) => setOverrideReason(e.target.value)} 
                    />
                  </div>
                </div>

                <AlertDialogFooter className="gap-4">
                  <AlertDialogCancel className="font-bold py-6 rounded-xl">Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleEmergencyOverride} className="bg-destructive hover:bg-destructive/90 text-white font-black py-6 px-10 rounded-xl uppercase tracking-widest">
                    Confirm Block
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {[
            { label: "Verified Users", value: "142", icon: <Users className="text-blue-500" />, sub: "+12 this week" },
            { label: "Pending Proposals", value: pendingRequests.length.toString(), icon: <Stamp className="text-accent" />, sub: "Awaiting Review" },
            { label: "Active Allotments", value: approvedBookings.length.toString(), icon: <FileCheck className="text-green-500" />, sub: "Confirmed Slots" },
            { label: "Admin Blocks", value: blockedDates.length.toString(), icon: <ShieldAlert className="text-destructive" />, sub: "State Overrides" },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-xl bg-white rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{stat.label}</p>
                  <p className="text-4xl font-black text-primary tracking-tighter">{stat.value}</p>
                  <p className="text-[10px] text-primary/40 font-bold uppercase">{stat.sub}</p>
                </div>
                <div className="h-16 w-16 rounded-3xl bg-secondary/50 flex items-center justify-center border-b-4 border-primary/10">{stat.icon}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="pending-bookings" className="space-y-10">
          <TabsList className="bg-white/50 backdrop-blur p-1.5 border-2 border-white rounded-2xl inline-flex shadow-sm">
            <TabsTrigger value="pending-bookings" className="px-10 py-3 rounded-xl font-black uppercase text-xs tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
              Review Proposals ({pendingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="active-bookings" className="px-10 py-3 rounded-xl font-black uppercase text-xs tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
              Manage Allotments ({approvedBookings.length})
            </TabsTrigger>
            <TabsTrigger value="master-calendar" className="px-10 py-3 rounded-xl font-black uppercase text-xs tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
              Master Control
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending-bookings">
            <Card className="border-none shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-primary text-white py-8 px-10">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl font-black uppercase tracking-tight">Pending Allotment Queue</CardTitle>
                    <CardDescription className="text-primary-foreground/70 font-medium">SRS Compliance Check Required for each proposal.</CardDescription>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                    <p className="text-[10px] font-black uppercase text-accent">Decision Required</p>
                    <p className="text-xl font-black">{pendingRequests.length}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {pendingRequests.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/40 border-b-2 hover:bg-secondary/40">
                        <TableHead className="font-black uppercase text-[10px] tracking-widest py-6 px-10">Reference ID</TableHead>
                        <TableHead className="font-black uppercase text-[10px] tracking-widest">Organization</TableHead>
                        <TableHead className="font-black uppercase text-[10px] tracking-widest">Event Purpose</TableHead>
                        <TableHead className="font-black uppercase text-[10px] tracking-widest">Slot Date</TableHead>
                        <TableHead className="font-black uppercase text-[10px] tracking-widest text-right px-10">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingRequests.map((req) => (
                        <TableRow key={req.id} className="hover:bg-secondary/20 transition-colors">
                          <TableCell className="font-black text-primary py-6 px-10">{req.id}</TableCell>
                          <TableCell className="font-bold text-primary/80">{req.user}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-bold text-sm uppercase">{req.event}</span>
                              <Badge variant="outline" className="w-fit text-[9px] font-black border-accent text-accent bg-accent/5">{req.category}</Badge>
                            </div>
                          </TableCell>
                          <TableCell className="font-bold text-muted-foreground">{req.date}</TableCell>
                          <TableCell className="text-right px-10">
                            <div className="flex justify-end gap-3">
                              <Button variant="outline" size="sm" onClick={() => updateBookingStatus(req.id, 'approved')} className="bg-green-50 text-green-700 border-green-200 hover:bg-green-600 hover:text-white font-black uppercase text-[10px] rounded-lg">Approve</Button>
                              <Button variant="outline" size="sm" onClick={() => updateBookingStatus(req.id, 'rejected')} className="bg-destructive/5 text-destructive border-destructive/20 hover:bg-destructive hover:text-white font-black uppercase text-[10px] rounded-lg">Reject</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="p-24 text-center text-muted-foreground font-black uppercase tracking-widest opacity-30">All Requests Processed</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active-bookings">
            <Card className="border-none shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-secondary/50 border-b-2 py-8 px-10">
                <CardTitle className="text-2xl font-black uppercase tracking-tight text-primary">Confirmed Slots (SRS Compliance Phase)</CardTitle>
                <CardDescription className="font-medium">Managing confirmed bookings. Subject to post-event clearance and document audit.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {approvedBookings.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-white/50 border-b hover:bg-white/50">
                        <TableHead className="font-black uppercase text-[10px] tracking-widest py-6 px-10">Ref ID</TableHead>
                        <TableHead className="font-black uppercase text-[10px] tracking-widest">Organization</TableHead>
                        <TableHead className="font-black uppercase text-[10px] tracking-widest">Event Purpose</TableHead>
                        <TableHead className="font-black uppercase text-[10px] tracking-widest">Slot Date</TableHead>
                        <TableHead className="font-black uppercase text-[10px] tracking-widest text-right px-10">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {approvedBookings.map((req) => (
                        <TableRow key={req.id} className="hover:bg-secondary/10 transition-colors">
                          <TableCell className="font-black text-primary py-6 px-10">{req.id}</TableCell>
                          <TableCell className="font-bold">{req.user}</TableCell>
                          <TableCell className="font-black text-sm uppercase">{req.event}</TableCell>
                          <TableCell className="font-bold text-muted-foreground">{req.date}</TableCell>
                          <TableCell className="text-right px-10">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-destructive border-destructive/20 hover:bg-destructive hover:text-white font-black uppercase text-[10px] rounded-lg px-4">Revoke</Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="rounded-2xl">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-2xl font-black uppercase text-destructive">Revoke Official Allotment?</AlertDialogTitle>
                                  <AlertDialogDescription className="font-medium leading-relaxed">
                                    SRS Policy: Revocation of {req.event} will trigger automated notifications. If for official exigency, system handles 100% refund logic.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="font-bold">Retain Booking</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => updateBookingStatus(req.id, 'cancelled')} className="bg-destructive text-white font-black uppercase px-8">Confirm Revocation</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="p-24 text-center text-muted-foreground font-black uppercase tracking-widest opacity-30">No Active Allotments Found</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="master-calendar">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <Card className="lg:col-span-2 border-none shadow-2xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-secondary/80 border-b-2 py-8 px-10">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary p-2 rounded-xl">
                      <ShieldAlert className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-xl font-black uppercase text-primary">Active Administrative Blocks</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {blockedDates.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-white/50 border-b hover:bg-white/50">
                          <TableHead className="font-black uppercase text-[10px] tracking-widest py-6 px-10">Blocked Date</TableHead>
                          <TableHead className="font-black uppercase text-[10px] tracking-widest">Category</TableHead>
                          <TableHead className="font-black uppercase text-[10px] tracking-widest">Exigency Details</TableHead>
                          <TableHead className="font-black uppercase text-[10px] tracking-widest text-right px-10">Control</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {blockedDates.map((block) => (
                          <TableRow key={block.id} className="hover:bg-destructive/5 transition-colors">
                            <TableCell className="font-black py-6 px-10 text-destructive">{format(block.date, "PP")}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="font-black text-[9px] uppercase border-destructive/20 text-destructive bg-destructive/5">{block.type}</Badge>
                            </TableCell>
                            <TableCell className="text-sm font-bold text-muted-foreground uppercase">{block.reason}</TableCell>
                            <TableCell className="text-right px-10">
                              <Button variant="ghost" size="sm" onClick={() => removeBlock(block.id)} className="hover:bg-destructive/10 hover:text-destructive p-2 rounded-xl"><Trash2 className="h-5 w-5" /></Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="p-24 text-center text-muted-foreground font-black uppercase tracking-widest opacity-30">No State Overrides Active</div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-none shadow-2xl bg-primary text-white rounded-3xl overflow-hidden border-b-8 border-accent">
                <CardHeader className="py-8">
                  <CardTitle className="text-xl font-black flex items-center gap-2 uppercase tracking-tight">
                    <Stamp className="h-6 w-6 text-accent" /> Instant Revocation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-[11px] font-bold opacity-80 leading-relaxed uppercase">
                    SRS Protocol: Enter a Reference ID to override and revoke any allotment instantly. Notification and refund logic will trigger.
                  </p>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase opacity-60">Reference ID</Label>
                    <Input 
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-14 rounded-xl font-black text-center text-lg uppercase tracking-widest focus:ring-accent" 
                      placeholder="e.g. BR-4092" 
                      value={revocationId}
                      onChange={(e) => setRevocationId(e.target.value)}
                    />
                  </div>
                  <Button variant="secondary" className="w-full bg-accent text-primary hover:bg-accent/90 h-16 rounded-xl font-black uppercase tracking-widest shadow-xl transition-all" onClick={handleQuickRevocation}>
                    Revoke Slot
                  </Button>
                </CardContent>
                <CardFooter className="bg-black/20 p-6 flex items-center gap-3">
                  <ShieldAlert className="h-4 w-4 text-accent" />
                  <p className="text-[9px] font-black uppercase tracking-tighter opacity-70">Authorized Admin Override Mode</p>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
