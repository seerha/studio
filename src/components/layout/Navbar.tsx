"use client";

import Link from "next/link";
import { Building2, LayoutDashboard, LogOut, Menu, User, BookOpen, ReceiptText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [user, setUser] = useState<{ role: string; name: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem("govbook_session");
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("govbook_session");
    setUser(null);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-accent bg-primary text-primary-foreground shadow-2xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="rounded-2xl bg-accent p-2 shadow-lg group-hover:scale-110 transition-transform">
              <Building2 className="h-7 w-7 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter font-headline text-white leading-none uppercase">Vikas Bhawan Portal</span>
              <span className="text-[9px] opacity-70 uppercase font-black tracking-widest mt-1">Dept. of Rural Development, Punjab</span>
            </div>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-white uppercase font-black tracking-widest text-[10px]">
          <Link href="/availability" className="hover:text-accent transition-all">Public Calendar</Link>
          <Link href="/guidelines" className="hover:text-accent transition-all">Guidelines</Link>
          <Link href="/tariff" className="hover:text-accent transition-all">Tariff</Link>
          {user ? (
            <>
              <Link 
                href={user.role === 'admin' ? '/dashboard/admin' : '/dashboard/requester'} 
                className="hover:text-accent transition-all bg-white/10 px-4 py-2 rounded-xl flex items-center gap-2"
              >
                <LayoutDashboard className="h-3 w-3" /> Dashboard
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-3 hover:bg-white/10 text-white rounded-2xl pr-5 h-12 border border-white/10">
                    <div className="bg-accent rounded-xl p-1.5 shadow-md">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-[9px] font-black truncate max-w-[120px]">{user.name}</span>
                      <span className="text-[7px] opacity-50 uppercase tracking-tighter">{user.role}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2 shadow-2xl border-none">
                  <DropdownMenuLabel className="font-black text-[10px] uppercase tracking-widest text-muted-foreground p-3">Account Security</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="p-3 rounded-xl cursor-pointer hover:bg-secondary">
                    <Link href="/profile" className="flex items-center gap-3 w-full font-bold text-xs uppercase tracking-tight">
                      <ShieldCheck className="h-4 w-4 text-primary" /> Organization Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="p-3 rounded-xl cursor-pointer hover:bg-destructive/10 text-destructive font-black text-xs uppercase tracking-tight">
                    <LogOut className="h-4 w-4 mr-3" /> Terminate Session
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild className="hover:bg-white/10 text-white font-black uppercase tracking-widest text-[10px]">
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button variant="default" className="bg-accent text-primary hover:bg-accent/90 font-black uppercase tracking-widest text-[10px] px-6 py-6 rounded-xl shadow-xl" asChild>
                <Link href="/auth/register">Register Now</Link>
              </Button>
            </div>
          )}
        </nav>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-7 w-7" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-primary text-white border-l-4 border-accent">
              <nav className="flex flex-col gap-6 mt-12 font-black uppercase tracking-widest text-sm">
                <Link href="/" className="hover:text-accent">Home</Link>
                <Link href="/availability" className="hover:text-accent">Public Calendar</Link>
                <Link href="/guidelines" className="hover:text-accent">Guidelines</Link>
                <Link href="/tariff" className="hover:text-accent">Tariff</Link>
                <hr className="border-white/10" />
                {user ? (
                  <>
                    <Link href={user.role === 'admin' ? '/dashboard/admin' : '/dashboard/requester'} className="hover:text-accent">Dashboard</Link>
                    <Link href="/profile" className="hover:text-accent">Profile</Link>
                    <Button variant="ghost" onClick={handleLogout} className="justify-start px-0 font-black text-sm uppercase tracking-widest h-auto text-destructive">
                      <LogOut className="mr-3 h-5 w-5" /> Terminate Session
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" className="hover:text-accent">Login</Link>
                    <Link href="/auth/register" className="text-accent hover:underline">Register Now</Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
