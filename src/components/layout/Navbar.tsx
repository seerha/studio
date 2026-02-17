
"use client";

import Link from "next/link";
import { Building2, LayoutDashboard, LogOut, Menu, User, BookOpen, ReceiptText } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-full bg-accent p-1.5">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight font-headline text-white leading-tight">Vikas Bhawan Portal</span>
              <span className="text-[10px] opacity-80 uppercase font-medium">Dept. of Rural Development, Punjab</span>
            </div>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-white">
          <Link href="/availability" className="text-sm font-medium hover:text-accent transition-colors">Availability</Link>
          <Link href="/guidelines" className="text-sm font-medium hover:text-accent transition-colors">Guidelines</Link>
          <Link href="/tariff" className="text-sm font-medium hover:text-accent transition-colors">Tariff</Link>
          {user ? (
            <>
              <Link 
                href={user.role === 'admin' ? '/dashboard/admin' : '/dashboard/requester'} 
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                Dashboard
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-white/10 text-white rounded-full pr-4">
                    <div className="bg-accent rounded-full p-1">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-xs font-bold truncate max-w-[100px]">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2 cursor-pointer w-full">
                      <User className="h-4 w-4" /> Profile Details
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild className="hover:bg-primary-foreground/10 text-white">
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button variant="default" className="bg-accent text-primary hover:bg-accent/90" asChild>
                <Link href="/auth/register">Register Now</Link>
              </Button>
            </div>
          )}
        </nav>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-primary text-primary-foreground">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium">Home</Link>
                <Link href="/availability" className="text-lg font-medium">Availability</Link>
                <Link href="/guidelines" className="text-lg font-medium">Guidelines</Link>
                <Link href="/tariff" className="text-lg font-medium">Tariff</Link>
                <hr className="border-primary-foreground/20" />
                {user ? (
                  <>
                    <Link href={user.role === 'admin' ? '/dashboard/admin' : '/dashboard/requester'} className="text-lg font-medium">Dashboard</Link>
                    <Link href="/profile" className="text-lg font-medium">Profile</Link>
                    <Button variant="ghost" onClick={handleLogout} className="justify-start px-0 font-medium text-lg h-auto">
                      <LogOut className="mr-2 h-5 w-5" /> Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" className="text-lg font-medium">Login</Link>
                    <Link href="/auth/register" className="text-lg font-medium text-accent">Register</Link>
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
