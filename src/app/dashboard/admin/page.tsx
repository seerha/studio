"use client";

import { useState } from "react";
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
  Stamp,
  Clock
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
import { useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking, updateDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase";
import { collection, query, doc } from "firebase/firestore";

export default function AdminDashboard() {
  const { toast } = useToast();
  const firestore = useFirestore();
  
  const bookingsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, "bookings"));
  }, [firestore]);
  const { data: bookings } = useCollection(bookingsQuery);

  const blockedDatesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, "blockedDates"));
  }, [firestore]);
  const { data: blockedDates } = useCollection(blockedDatesQuery);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [overrideDate, setOverrideDate] = useState<Date>();
  const [overrideReason, setOverrideReason] = useState("");
  const [overrideType, setOverrideType] = useState("Emergency");
  const [revocationId, setRevocationId] = useState("");

  const updateBookingStatus = (bookingId: string, newStatus: string) => {
    if (!firestore) return;
    const bookingRef = doc(firestore, "bookings", bookingId);
    updateDocumentNonBlocking(bookingRef, { status: newStatus });
    
    toast({
      title: "Status Updated",
      description: `Booking ${bookingId.slice(0,6)} has been ${newStatus.toLowerCase()}.`,
    });
  };

  const handleQuickRevocation = () => {
    const booking = bookings?.find(b => b.id.includes(revocationId) || b.id === revocationId);
    if (!booking) {
      toast({ title: "Reference Not Found", description: "The provided ID does not match any record.", variant: "destructive" });
      return;
    }
    updateBookingStatus(booking.id, 'Cancelled');
    setRevocationId("");
  };

  const handleEmergencyOverride = () => {
    if (!overrideDate || !overrideReason || !firestore) {
      toast({ title: "Incomplete Details", description: "Please select a date and provide a valid reason.", variant: "destructive" });
      return;
    }

    const newBlock = {
      blockedDate: format(overrideDate, "yyyy-MM-dd"),
      reason: overrideReason,
      blockingType: overrideType,
      creationDate: new Date().toISOString(),
      adminId: "admin-1",
      auditoriumId: "main-auditorium"
    };

    addDocumentNonBlocking(collection(firestore, "blockedDates"), newBlock);

    toast({
      title: "State Override Activated",
      description: `The auditorium has been blocked for ${format(overrideDate, "PPP")}.`,
      variant: "destructive",
    });

    setOverrideDate(undefined);
    setOverrideReason("");
  };

  const removeBlock = (blockId: string) => {
    if (!firestore) return;
    deleteDocumentNonBlocking(doc(firestore, "blockedDates", blockId));
    toast({ title: "Block Lifted", description: "The slot is now open for public booking." });
  };

  const pendingRequests = bookings?.filter(b => b.status === 'Pending') || [];
  const approvedBookings = bookings?.filter(b => b.status === 'Approved' || b.status === 'Confirmed') || [];

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
            <p className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest pl-12 flex items-center gap-2">
              <ShieldAlert className="h-3 w-3" /> Level-II Approving Authority | Dept. of Rural Development, Punjab
            </p>
          </div>
          <div className="flex gap-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="bg-destructive shadow-2xl hover:bg-destructive/90 font-black px-8 py-6 rounded-xl uppercase tracking-widest">
                  <ShieldAlert className="mr-2 h-5 w-5" /> State Override
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-md rounded-2xl border-none shadow-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2 text-destructive text-2xl font-black uppercase">
                    <ShieldAlert className="h-7 w-7" />
                    State Exigency
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-foreground/80 font-bold leading-relaxed uppercase text-[10px]">
                    CRITICAL: This will block the entire day. Existing bookings will be impacted (Section 13.1).
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
                          onSelect={(d) => { setOverrideDate(d); setIsPopoverOpen(false); }} 
                          initialFocus 
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Override Reason</Label>
                    <Input 
                      placeholder="e.g. CM Visit / G20 Prep" 
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
            { label: "Total Proposals", value: bookings?.length.toString() || "0", icon: <Users className="text-blue-500" />, sub: "All time" },
            { label: "Pending Review", value: pendingRequests.length.toString(), icon: <Stamp className="text-accent" />, sub: "Awaiting Review" },
            { label: "Active Allotments", value: approvedBookings.length.toString(), icon: <FileCheck className="text-green-500" />, sub: "Confirmed Slots" },
            { label: "Admin Blocks", value: blockedDates?.length.toString() || "0", icon: <ShieldAlert className="text-destructive" />, sub: "Overrides" },
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
              Queue ({pendingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="active-bookings" className="px-10 py-3 rounded-xl font-black uppercase text-xs tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
              Confirmed ({approvedBookings.length})
            </TabsTrigger>
            <TabsTrigger value="master-calendar" className="px-10 py-3 rounded-xl font-black uppercase text-xs tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
              Overrides
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending-bookings">
            <Card className="border-none shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-primary text-white py-8 px-10">
                <CardTitle className="text-2xl font-black uppercase tracking-tight">Pending Allotment Queue</CardTitle>
                <CardDescription className="text-primary-foreground/70 font-medium">SRS Compliance Check Required for each proposal.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {pendingRequests.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/40 border-b-2 hover:bg-secondary/40">
                        <TableHead className="font-black uppercase text-[10px] tracking-widest py-6 px-10">Ref ID</TableHead>
                        <TableHead className="font-black uppercase text-[10px] tracking-widest">Event Name</TableHead>
                        <TableHead className="font-black uppercase text-[10px] tracking-widest">Shift / Date</TableHead>
                        <TableHead className="font-black uppercase text-[10px] tracking-widest text-right px-10">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingRequests.map((req) => (
                        <TableRow key={req.id}>
                          <TableCell className="font-black text-primary py-6 px-10">{req.id.slice(0, 6)}</TableCell>
                          <TableCell className="font-bold uppercase text-xs">{req.eventName}</TableCell>
                          <TableCell>
                             <div className="flex flex-col">
                              <span className="text-[10px] font-black text-accent uppercase flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {req.slot === 'slot1' ? 'Shift 1' : 'Shift 2'}
                              </span>
                              <span className="text-[8px] font-bold text-muted-foreground uppercase">{req.bookingDate}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right px-10">
                            <div className="flex justify-end gap-3">
                              <Button variant="outline" size="sm" onClick={() => updateBookingStatus(req.id, 'Approved')} className="bg-green-50 text-green-700 hover:bg-green-600 hover:text-white font-black uppercase text-[10px] rounded-lg">Approve</Button>
                              <Button variant="outline" size="sm" onClick={() => updateBookingStatus(req.id, 'Rejected')} className="bg-destructive/5 text-destructive hover:bg-destructive hover:text-white font-black uppercase text-[10px] rounded-lg">Reject</Button>
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
                <CardTitle className="text-2xl font-black uppercase tracking-tight text-primary">Confirmed Slots</CardTitle>
                <CardDescription className="font-medium">Managing confirmed bookings. Subject to post-event clearance.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {approvedBookings.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-white/50 border-b hover:bg-white/50">
                        <TableHead className="font-black uppercase text-[10px] tracking-widest py-6 px-10">Ref ID</TableHead>
                        <TableHead className="font-black uppercase text-[10px] tracking-widest">Event Name</TableHead>
                        <TableHead className="font-black uppercase text-[10px] tracking-widest">Shift / Date</TableHead>
                        <TableHead className="font-black uppercase text-[10px] tracking-widest text-right px-10">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {approvedBookings.map((req) => (
                        <TableRow key={req.id}>
                          <TableCell className="font-black text-primary py-6 px-10">{req.id.slice(0, 6)}</TableCell>
                          <TableCell className="font-bold uppercase text-xs">{req.eventName}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black text-accent uppercase flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {req.slot === 'slot1' ? 'Shift 1' : 'Shift 2'}
                              </span>
                              <span className="text-[8px] font-bold text-muted-foreground uppercase">{req.bookingDate}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right px-10">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-destructive border-destructive/20 hover:bg-destructive hover:text-white font-black uppercase text-[10px] rounded-lg px-4">Revoke</Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Revoke Allotment?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will cancel the booking for "{req.eventName}". This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => updateBookingStatus(req.id, 'Cancelled')}>Confirm</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="p-24 text-center text-muted-foreground font-black uppercase tracking-widest opacity-30">No Active Allotments</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="master-calendar">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <Card className="lg:col-span-2 border-none shadow-2xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-secondary/80 border-b-2 py-8 px-10">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl font-black uppercase text-primary">Active Administrative Blocks</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {blockedDates?.length ? (
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-white/50 border-b hover:bg-white/50">
                          <TableHead className="font-black uppercase text-[10px] tracking-widest py-6 px-10">Blocked Date</TableHead>
                          <TableHead className="font-black uppercase text-[10px] tracking-widest">Reason</TableHead>
                          <TableHead className="font-black uppercase text-[10px] tracking-widest text-right px-10">Control</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {blockedDates.map((block) => (
                          <TableRow key={block.id}>
                            <TableCell className="font-black py-6 px-10 text-destructive">{block.blockedDate}</TableCell>
                            <TableCell className="text-xs font-bold text-muted-foreground uppercase">{block.reason}</TableCell>
                            <TableCell className="text-right px-10">
                              <Button variant="ghost" size="sm" onClick={() => removeBlock(block.id)} className="hover:bg-destructive/10 hover:text-destructive"><Trash2 className="h-5 w-5" /></Button>
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

              <Card className="border-none shadow-2xl bg-primary text-white rounded-3xl overflow-hidden">
                <CardHeader className="py-8">
                  <CardTitle className="text-xl font-black flex items-center gap-2 uppercase tracking-tight">
                    <Stamp className="h-6 w-6 text-accent" /> Quick Revoke
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase opacity-60">Application Reference ID</Label>
                    <Input 
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-14 rounded-xl font-black text-center" 
                      placeholder="e.g. BR-4092" 
                      value={revocationId}
                      onChange={(e) => setRevocationId(e.target.value)}
                    />
                  </div>
                  <Button variant="secondary" className="w-full bg-accent text-primary hover:bg-accent/90 h-16 rounded-xl font-black uppercase tracking-widest text-xs" onClick={handleQuickRevocation}>
                    Revoke Allotment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}