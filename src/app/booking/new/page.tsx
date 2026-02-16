"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Upload, Info, AlertTriangle, Calendar as CalendarIcon, Users, UserCheck } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function NewBookingPage() {
  const [date, setDate] = useState<Date>();
  const [hasVip, setHasVip] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-headline">New Event Proposal</h1>
          <p className="text-muted-foreground">Submit your event details for administrative approval.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader className="bg-primary text-white rounded-t-lg">
                <CardTitle>Basic Event Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="event-name">Event Name / Title</Label>
                  <Input id="event-name" placeholder="Enter the official name of your event" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 flex flex-col">
                    <Label htmlFor="event-date">Proposed Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gathering">Expected Gathering</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="gathering" type="number" className="pl-10" placeholder="e.g. 450" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="desc">Event Description & Agenda</Label>
                  <Textarea id="desc" placeholder="Briefly describe the purpose and flow of the event..." className="min-h-[120px]" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader className="bg-accent/10 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">VIP / Chief Guest Presence</CardTitle>
                  </div>
                  <Switch checked={hasVip} onCheckedChange={setHasVip} />
                </div>
              </CardHeader>
              <CardContent className={`p-6 space-y-6 transition-opacity duration-300 ${hasVip ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                <div className="space-y-2">
                  <Label htmlFor="vip-names">VIP Name(s) & Designation</Label>
                  <Input id="vip-names" placeholder="e.g. Honorable Governor, Chief Minister" />
                </div>
                
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Upload className="h-4 w-4 text-primary" />
                    <h4 className="font-bold text-sm">Security Clearance Mandatory</h4>
                  </div>
                  <div className="flex flex-col items-center p-6 border-2 border-dashed rounded-lg bg-white">
                    <p className="text-xs text-muted-foreground mb-4">Upload Police / Intelligence clearance document for VIP presence.</p>
                    <Button variant="outline" size="sm">Select File (PDF)</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
              <div>
                <p className="text-sm font-bold text-destructive">Compliance Declaration</p>
                <div className="flex items-start gap-2 mt-2">
                  <Input type="checkbox" id="declare" className="h-4 w-4 mt-1" />
                  <Label htmlFor="declare" className="text-xs text-muted-foreground font-normal">
                    I confirm that this event is purely non-political, non-religious, and does not involve the sale of commercial products within the auditorium premises as per Govt Order #204/2023.
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="ghost" asChild><Link href="/dashboard/requester">Cancel</Link></Button>
              <Button className="bg-primary px-12 py-6 text-lg" asChild>
                <Link href="/dashboard/requester">Submit Request</Link>
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-md bg-secondary/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Booking Info</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm space-y-4">
                <p>Standard Time Slots: <br /><strong>09:00 AM - 06:00 PM</strong></p>
                <p>Total Capacity: <br /><strong>650 Seats</strong></p>
                <div className="pt-4 border-t border-muted">
                  <p className="font-bold text-xs uppercase text-muted-foreground mb-2">Next Steps:</p>
                  <ol className="space-y-3 list-decimal list-inside text-xs text-muted-foreground">
                    <li>Submit proposal for review</li>
                    <li>Admin checks compliance</li>
                    <li>Approved invoice generated</li>
                    <li>Payment confirms booking</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            <div className="p-4 rounded-lg border bg-accent/5">
              <h4 className="font-bold text-sm mb-2">Estimated Costs</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Maintenance Fee:</span>
                  <span className="font-bold">₹ 5,000.00</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Security Deposit:</span>
                  <span className="font-bold">₹ 10,000.00</span>
                </div>
                <div className="pt-2 border-t flex justify-between font-bold text-primary">
                  <span>Total Payable:</span>
                  <span>₹ 15,000.00</span>
                </div>
              </div>
              <p className="mt-4 text-[10px] text-muted-foreground italic">*Final invoice may vary based on specific utilities used.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
