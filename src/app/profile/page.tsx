"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Fingerprint, Mail, Phone, Building, ShieldCheck, Edit3, UserCheck, FileBadge } from "lucide-react";
import Link from "next/link";

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
          <Card className="max-w-md mx-auto p-12 border-none shadow-2xl rounded-3xl">
             <ShieldCheck className="h-16 w-16 text-primary mx-auto mb-6" />
             <h2 className="text-2xl font-black uppercase tracking-tight text-primary">Access Restricted</h2>
             <p className="text-xs font-bold text-muted-foreground uppercase mt-2 mb-8 tracking-widest">Authentication required for identity portal</p>
             <Button className="w-full bg-primary font-black uppercase tracking-widest rounded-xl py-6" asChild>
               <Link href="/auth/login">Proceed to Login</Link>
             </Button>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30 pb-20">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <Card className="lg:col-span-1 border-none shadow-2xl rounded-3xl bg-white overflow-hidden">
            <CardHeader className="bg-primary text-white text-center py-10">
              <div className="flex justify-center mb-6">
                <Avatar className="h-32 w-32 border-4 border-accent shadow-2xl">
                  <AvatarFallback className="text-5xl bg-accent text-primary font-black">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl font-black uppercase tracking-tighter">{user.name}</CardTitle>
              <Badge className="mt-4 bg-accent text-primary font-black uppercase text-[10px] tracking-widest px-4 py-1.5 border-none shadow-md">
                {user.role === 'admin' ? 'State Authority' : `Category ${user.category?.toUpperCase() || 'A'}`}
              </Badge>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-2xl">
                  <Mail className="h-5 w-5 text-primary" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Official Email</span>
                    <span className="text-xs font-bold">{user.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-2xl">
                  <Phone className="h-5 w-5 text-primary" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Mobile (Verified)</span>
                    <span className="text-xs font-bold">+91 98765 43210</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-2xl rounded-3xl bg-white overflow-hidden">
              <CardHeader className="bg-secondary/50 border-b-2 py-8 px-10 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-black uppercase text-primary flex items-center gap-3">
                    <UserCheck className="h-6 w-6 text-primary" />
                    Identity Proofing
                  </CardTitle>
                  <CardDescription className="text-[10px] font-bold uppercase tracking-widest">UIDAI & Departmental Linkage</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-primary text-primary font-black uppercase text-[10px] rounded-xl hover:bg-primary hover:text-white">
                  <Edit3 className="mr-2 h-3.5 w-3.5" /> Modify
                </Button>
              </CardHeader>
              <CardContent className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-1 p-5 border-2 border-primary/5 rounded-2xl">
                    <Label className="text-primary/60 text-[9px] font-black uppercase tracking-widest">Aadhar Number (UIDAI)</Label>
                    <p className="text-lg font-black tracking-[0.3em] flex items-center gap-3">
                      <Fingerprint className="h-5 w-5 text-accent" />
                      XXXX XXXX 8821
                    </p>
                  </div>
                  <div className="space-y-1 p-5 border-2 border-primary/5 rounded-2xl">
                    <Label className="text-primary/60 text-[9px] font-black uppercase tracking-widest">Departmental ID</Label>
                    <p className="text-sm font-black uppercase flex items-center gap-3">
                      <FileBadge className="h-5 w-5 text-accent" />
                      PB-GOV-DRD-092
                    </p>
                  </div>
                  <div className="space-y-1 p-5 border-2 border-primary/5 rounded-2xl">
                    <Label className="text-primary/60 text-[9px] font-black uppercase tracking-widest">Organization Name</Label>
                    <p className="text-sm font-black uppercase flex items-center gap-3">
                      <Building className="h-5 w-5 text-accent" />
                      {user.name}
                    </p>
                  </div>
                  <div className="space-y-1 p-5 border-2 border-primary/5 rounded-2xl">
                    <Label className="text-primary/60 text-[9px] font-black uppercase tracking-widest">Official Designation</Label>
                    <p className="text-sm font-black uppercase flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5 text-accent" />
                      Nodal Officer (Allotment)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-2xl rounded-3xl bg-primary text-white overflow-hidden border-b-8 border-accent">
              <CardContent className="p-10 flex items-center justify-between">
                <div className="space-y-2">
                   <h3 className="text-2xl font-black uppercase tracking-tight text-accent">Status: Verified</h3>
                   <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Authenticated for Vikas Bhawan Allotments</p>
                </div>
                <div className="bg-white/10 p-5 rounded-3xl backdrop-blur-sm">
                   <ShieldCheck className="h-12 w-12 text-accent" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
