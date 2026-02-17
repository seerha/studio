
"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Building2, Lock, Mail, ArrowRight, UserCheck, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { useAuth, initiateAnonymousSignIn } from "@/firebase";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();

  const simulateLogin = (role: 'admin' | 'requester') => {
    setIsLoading(true);
    
    // Perform real Firebase Anonymous Sign-in so useUser() works
    initiateAnonymousSignIn(auth);

    // Give a small delay to ensure auth state change is being processed
    setTimeout(() => {
      const session = {
        role: role,
        name: role === 'admin' ? "Admin Authority" : "Dept. of Culture",
        email: role === 'admin' ? "admin@gov.in" : "culture.dept@gov.in"
      };
      localStorage.setItem("govbook_session", JSON.stringify(session));
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${session.name}. Redirecting to dashboard...`,
      });

      router.push(role === 'admin' ? "/dashboard/admin" : "/dashboard/requester");
    }, 1500);
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const role = email.includes("admin") ? "admin" : "requester";
    simulateLogin(role);
  };

  return (
    <div className="min-h-screen bg-secondary/30 flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-none shadow-2xl">
          <CardHeader className="bg-primary text-white rounded-t-lg text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-accent p-3 rounded-full">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-headline text-white">Secure Login</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Access the official government booking portal
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="flex flex-col h-auto py-4 border-primary/20 hover:border-primary hover:bg-primary/5"
                onClick={() => simulateLogin('requester')}
                disabled={isLoading}
              >
                <UserCheck className="h-6 w-6 mb-2 text-primary" />
                <span className="font-bold uppercase text-[10px]">Login as User</span>
                <span className="text-[8px] text-muted-foreground uppercase">Requester</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col h-auto py-4 border-primary/20 hover:border-primary hover:bg-primary/5"
                onClick={() => simulateLogin('admin')}
                disabled={isLoading}
              >
                <ShieldCheck className="h-6 w-6 mb-2 text-accent" />
                <span className="font-bold uppercase text-[10px]">Login as Admin</span>
                <span className="text-[8px] text-muted-foreground uppercase">Authority</span>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Official Credentials</span>
              </div>
            </div>

            <form onSubmit={handleManualLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Official Email ID</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input 
                    id="email" 
                    type="email" 
                    placeholder="name@gov.in" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input 
                    id="password" 
                    type="password" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required 
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 py-6 font-black uppercase tracking-widest text-xs"
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Sign In"}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="bg-secondary/50 p-6 flex flex-col items-center gap-2 border-t rounded-b-lg">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">New Organization? Register for Allotment</p>
            <Button variant="link" className="text-primary p-0 h-auto font-black uppercase text-[10px] tracking-widest" asChild>
              <Link href="/auth/register">Request Verification Portal</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
      <footer className="py-6 text-center text-[10px] font-bold text-muted-foreground uppercase tracking-tighter opacity-60">
        <p>© {new Date().getFullYear()} Official State Booking Portal. Authorized Access Only. Section 13.3 enforced.</p>
      </footer>
    </div>
  );
}
