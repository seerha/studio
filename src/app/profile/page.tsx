"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Mail, Phone, Building, Calendar, Edit3 } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const session = localStorage.getItem("govbook_session");
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-secondary/30">
        <Navbar />
        <main className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold">Please login to view your profile.</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-8">
          <Card className="md:w-1/3 border-none shadow-lg">
            <CardContent className="pt-10 flex flex-col items-center">
              <Avatar className="h-32 w-32 border-4 border-accent">
                <AvatarImage src="" />
                <AvatarFallback className="text-4xl bg-primary text-white">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-6 text-2xl font-bold text-primary">{user.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">{user.role.toUpperCase()}</p>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-4 py-1">
                Verified Account
              </Badge>
              
              <div className="w-full mt-10 space-y-4 pt-8 border-t">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+91 9876543210</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>Main Secretariat</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="md:w-2/3 space-y-6">
            <Card className="border-none shadow-lg">
              <CardHeader className="border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Organization Profile</CardTitle>
                    <CardDescription>Official details for auditorium allotment.</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit3 className="mr-2 h-4 w-4" /> Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs uppercase">Legal Name</Label>
                    <p className="font-bold">{user.name}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs uppercase">Category</Label>
                    <p className="font-bold">{user.role === 'admin' ? 'Administrative Authority' : 'Category A (Govt)'}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs uppercase">GST/PAN Number</Label>
                    <p className="font-bold">27AAAAA0000A1Z5</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs uppercase">Primary Contact</Label>
                    <p className="font-bold">Director, Administration</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Security Credentials
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-bold">Registration Date</p>
                      <p className="text-xs text-muted-foreground">Registered on Jan 12, 2024</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-bold">Verification ID</p>
                      <p className="text-xs text-muted-foreground">ID: GOV-8821-SEC-39</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
