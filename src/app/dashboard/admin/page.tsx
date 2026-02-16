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
  Trash2
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
  
  // Simulated State for Bookings
  const [requests, setRequests] = useState([
    { id: "BR-4092", user: "Dept of Science", category: "Cat A", event: "National Science Symposium", date: "Oct 14, 2026", vip: "Yes", status: "pending" },
    { id: "BR-4105", user: "Green NGO", category: "Cat B", event: "Eco-Summit 2025", date: "Nov 12, 2025", vip: "No", status: "pending" },
    { id: "BR-4112", user: "Tech Solutions Ltd", category: "Cat C", event: "Product Launch", date: "Dec 05, 2025", vip: "No", status: "pending" },
    { id: "BR-4201", user: "Social Welfare Dept", category: "Cat A", event: "Annual Awards Ceremony", date: "Jan 15, 2026", vip: "Yes", status: "pending" },
    { id: "BR-4205", user: "Medical Association", category: "Cat B", event: "Healthcare Webinar", date: "Feb 10, 2026", vip: "No", status: "pending" },
  ]);

  // Simulated State for Blocked Dates (Emergency Overrides)
  const [blockedDates, setBlockedDates] = useState([
    { id: "BLOCK-001", date: new Date(2025, 4, 20), reason: "State G20 Preparation", type: "Emergency" },
    { id: "BLOCK-002", date: new Date(2025, 5, 10), reason: "VIP Visit (Hon. PM)", type: "Security" },
  ]);

  // Form State for New Override
  const [overrideDate, setOverrideDate] = useState<Date>();
  const [overrideReason, setOverrideReason] = useState("");
  const [overrideType, setOverrideType] = useState("Emergency");

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    setRequests(prev => prev.filter(r => r.id !== id));
    toast({
      title: `Request ${action === 'approved' ? 'Approved' : 'Rejected'}`,
      description: `Booking reference ${id} has been processed successfully.`,
      variant: action === 'approved' ? "default" : "destructive",
    });
  };

  const handleEmergencyOverride = () => {
    if (!overrideDate || !overrideReason) {
      toast({
        title: "Incomplete Details",
        description: "Please select a date and provide a valid reason for the override.",
        variant: "destructive"
      });
      return;
    }

    const newBlock = {
      id: `BLOCK-${Math.floor(Math.random() * 1000)}`,
      date: overrideDate,
      reason: overrideReason,
      type: overrideType,
    };

    setBlockedDates(prev => [newBlock, ...prev]);
    
    toast({
      title: "State Override Activated",
      description: `The auditorium has been blocked for ${format(overrideDate, "PPP")}. Any existing bookings on this date have been notified for cancellation.`,
      variant: "destructive",
    });

    // Reset Form
    setOverrideDate(undefined);
    setOverrideReason("");
  };

  const removeBlock = (id: string) => {
    setBlockedDates(prev => prev.filter(b => b.id !== id));
    toast({
      title: "Block Lifted",
      description: "The administrative block has been removed and the slot is now open for public booking."
    });
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
            
            {/* Emergency Override Dialog */}
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
                    This action will instantly block the auditorium for the selected date. This is an <strong>irreversible override</strong> that automatically revokes any existing bookings for that slot.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                
                <div className="py-4 space-y-4">
                  <div className="space-y-2">
                    <Label>Select Target Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal border-primary/20",
                            !overrideDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {overrideDate ? format(overrideDate, "PPP") : <span>Pick a date to block</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={overrideDate}
                          onSelect={setOverrideDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Reason for Override</Label>
                    <Select value={overrideType} onValueChange={setOverrideType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Emergency">National Emergency</SelectItem>
                        <SelectItem value="State">State Government Function</SelectItem>
                        <SelectItem value="Security">VIP / Security Movement</SelectItem>
                        <SelectItem value="Maintenance">Urgent Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Specific Details / Remarks</Label>
                    <Input 
                      placeholder="e.g. G20 Summit Preparation" 
                      value={overrideReason}
                      onChange={(e) => setOverrideReason(e.target.value)}
                    />
                  </div>
                </div>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleEmergencyOverride}
                    className="bg-destructive hover:bg-destructive/90 text-white"
                  >
                    Confirm & Activate Override
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "New Users", value: "24", icon: <Users className="text-blue-500" /> },
            { label: "Pending", value: requests.length.toString(), icon: <CalendarIcon className="text-accent" /> },
            { label: "Approved Today", value: "15", icon: <FileCheck className="text-green-500" /> },
            { label: "Admin Blocks", value: blockedDates.length.toString(), icon: <ShieldAlert className="text-destructive" /> },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm bg-white">
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
          <TabsList className="bg-white p-1 border inline-flex">
            <TabsTrigger value="pending-bookings" className="data-[state=active]:bg-primary data-[state=active]:text-white px-6">
              Booking Queue ({requests.length})
            </TabsTrigger>
            <TabsTrigger value="user-verifications" className="data-[state=active]:bg-primary data-[state=active]:text-white px-6">
              User Verification
            </TabsTrigger>
            <TabsTrigger value="master-calendar" className="data-[state=active]:bg-primary data-[state=active]:text-white px-6">
              Master Control
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending-bookings">
            <Card className="border-none shadow-md">
              <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl font-headline text-primary">Booking Approval Queue</CardTitle>
                  <CardDescription>Review and process incoming auditorium allotment requests.</CardDescription>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search requests..." className="pl-9 h-9" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {requests.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/20">
                        <TableHead className="font-bold">Ref ID</TableHead>
                        <TableHead className="font-bold">Organization</TableHead>
                        <TableHead className="font-bold">Category</TableHead>
                        <TableHead className="font-bold">Event Name</TableHead>
                        <TableHead className="font-bold">Proposed Date</TableHead>
                        <TableHead className="font-bold">VIP Status</TableHead>
                        <TableHead className="text-right font-bold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {requests.map((req) => (
                        <TableRow key={req.id} className="hover:bg-secondary/10">
                          <TableCell className="font-bold text-primary">{req.id}</TableCell>
                          <TableCell>{req.user}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{req.category}</Badge>
                          </TableCell>
                          <TableCell className="font-medium">{req.event}</TableCell>
                          <TableCell>{req.date}</TableCell>
                          <TableCell>
                            {req.vip === "Yes" ? (
                              <Badge className="bg-accent text-primary border-none font-bold">VIP GUEST</Badge>
                            ) : (
                              <span className="text-muted-foreground text-sm">None</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="hover:text-primary">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleAction(req.id, 'approved')} 
                                className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 font-bold"
                              >
                                <CheckCircle className="mr-1 h-3 w-3" /> Approve
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleAction(req.id, 'rejected')} 
                                className="text-destructive border-red-200 hover:bg-red-50 hover:text-red-700 font-bold"
                              >
                                <XCircle className="mr-1 h-3 w-3" /> Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="p-16 text-center">
                    <div className="bg-secondary/50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-lg font-bold text-primary">Queue Cleared</h3>
                    <p className="text-muted-foreground">All booking requests have been processed.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="user-verifications">
            <Card className="border-none shadow-md">
              <CardContent className="p-16 text-center">
                <Users className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-primary">Verification Queue Empty</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">There are no new organizations awaiting categorization or ID verification at this time.</p>
                <Button variant="outline" className="mt-6 border-primary text-primary">View Archive</Button>
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
                  <CardDescription>Dates currently reserved for Government use or maintenance.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {blockedDates.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-bold">Date</TableHead>
                          <TableHead className="font-bold">Classification</TableHead>
                          <TableHead className="font-bold">Reason / Event</TableHead>
                          <TableHead className="text-right font-bold">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {blockedDates.map((block) => (
                          <TableRow key={block.id}>
                            <TableCell className="font-bold">{format(block.date, "PP")}</TableCell>
                            <TableCell>
                              <Badge variant={block.type === 'Emergency' ? 'destructive' : 'secondary'} className="font-bold">
                                {block.type.toUpperCase()}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">{block.reason}</TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeBlock(block.id)}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="p-12 text-center text-muted-foreground">
                      <CalendarDays className="h-12 w-12 mx-auto mb-2 opacity-20" />
                      <p>No active administrative blocks found.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="border-none shadow-md bg-primary text-white">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-accent" /> 
                      Quick Revocation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-xs opacity-80 leading-relaxed">Cancel any specific confirmed booking for non-compliance or internal security reasons.</p>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-white/60">Booking Reference ID</Label>
                      <Input className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20" placeholder="e.g. BR-4092" />
                    </div>
                    <Button 
                      variant="secondary" 
                      className="w-full bg-accent text-primary hover:bg-accent/90 border-none font-bold" 
                      onClick={() => toast({ title: "Revocation Processed", description: "Reference has been cancelled and refund queued.", variant: "destructive" })}
                    >
                      Revoke Booking
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md border-l-4 border-accent">
                  <CardHeader className="pb-2 bg-accent/5">
                    <CardTitle className="text-lg">System Health</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Payment Gateway:</span>
                      <span className="text-green-600 font-bold">ONLINE</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">OTP Service:</span>
                      <span className="text-green-600 font-bold">STABLE</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Audit Engine:</span>
                      <span className="text-green-600 font-bold">LOGGING</span>
                    </div>
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