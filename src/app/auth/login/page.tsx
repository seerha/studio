"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Building2, Lock, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simple simulation for now
    setTimeout(() => {
      window.location.href = "/dashboard/requester";
    }, 1000);
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
            <CardTitle className="text-2xl font-headline">Secure Login</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Access the official government booking portal
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Official Email ID</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@gov.in" 
                    className="pl-10"
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-xs text-primary hover:underline font-medium">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    className="pl-10"
                    required 
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 py-6 text-lg"
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Login to Portal"}
                {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="bg-secondary/50 p-6 flex flex-col items-center gap-2 border-t">
            <p className="text-sm text-muted-foreground">Don't have an account yet?</p>
            <Button variant="outline" className="w-full border-primary text-primary" asChild>
              <Link href="/auth/register">Register Your Organization</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
      <footer className="py-6 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Official State Booking Portal. Authorized Access Only.</p>
      </footer>
    </div>
  );
}
