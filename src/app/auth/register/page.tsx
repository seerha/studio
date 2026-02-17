
"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Building, GraduationCap, User, Upload, ShieldCheck, CheckCircle2, Fingerprint, Smartphone, UserPlus, FileBadge, ArrowRight, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth, initiateAnonymousSignIn } from "@/firebase";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("govt");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();

  const handleFinalSubmit = () => {
    setIsLoading(true);
    
    // Simulate Firebase Auth
    initiateAnonymousSignIn(auth);

    setTimeout(() => {
      const session = {
        role: "requester",
        name: category === 'govt' ? "Dept. of Rural Development" : "Cultural Society of Punjab",
        email: "verified.requester@punjab.gov.in",
        category: category
      };
      localStorage.setItem("govbook_session", JSON.stringify(session));
      
      toast({
        title: "Registration Submitted",
        description: "Your official credentials and Aadhar identity have been queued for Level-I Verification.",
      });

      router.push("/dashboard/requester");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-secondary/30 pb-12">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-10 text-center space-y-2">
          <h1 className="text-3xl font-black font-headline text-primary uppercase tracking-tighter flex items-center justify-center gap-3">
            <UserPlus className="h-8 w-8 text-accent" />
            Official Portal Onboarding
          </h1>
          <p className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest opacity-60">
            Subject to Section 1.1 & 14.6 of Vikas Bhawan Mandate
          </p>
        </div>

        <div className="mb-12 flex items-center justify-between px-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black border-2 transition-all shadow-lg ${
                step >= s ? 'bg-primary border-primary text-white scale-110' : 'bg-white border-muted-foreground/30 text-muted-foreground/30'
              }`}>
                {step > s ? <CheckCircle2 className="h-6 w-6" /> : s}
              </div>
              {s < 3 && <div className={`h-1 flex-1 mx-4 rounded-full ${step > s ? 'bg-primary' : 'bg-muted-foreground/10'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <Card className="shadow-2xl border-none rounded-3xl overflow-hidden">
            <CardHeader className="bg-primary text-white py-8 px-10">
              <div className="flex items-center gap-4">
                <div className="bg-accent p-2 rounded-xl text-primary">
                  <Fingerprint className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-black uppercase tracking-tight">Step 1: Identity & Contact</CardTitle>
                  <CardDescription className="text-primary-foreground/70 font-bold uppercase text-[10px]">Statutory UIDAI Aadhar Verification Required</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="full-name" className="font-black uppercase text-[10px] tracking-widest text-primary/60">Full Name (As per Aadhar)</Label>
                  <Input id="full-name" placeholder="John Doe" className="py-6 rounded-xl border-2 font-bold" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation" className="font-black uppercase text-[10px] tracking-widest text-primary/60">Official Designation</Label>
                  <Input id="designation" placeholder="e.g. Director, Secretary" className="py-6 rounded-xl border-2 font-bold" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="aadhar" className="font-black uppercase text-[10px] tracking-widest text-primary/60">12-Digit Aadhar Number (UIDAI)</Label>
                <div className="relative">
                  <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/40" />
                  <Input id="aadhar" placeholder="XXXX XXXX XXXX" className="py-6 pl-12 rounded-xl border-2 font-bold tracking-[0.2em]" maxLength={14} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="mobile" className="font-black uppercase text-[10px] tracking-widest text-primary/60">Mobile Number (OTP Link)</Label>
                  <div className="flex gap-2">
                    <Input id="mobile" placeholder="+91 XXXX XXX XXX" className="py-6 rounded-xl border-2 font-bold" />
                    <Button variant="outline" className="shrink-0 h-auto py-4 px-6 font-black uppercase text-[10px] border-primary text-primary">Verify OTP</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-black uppercase text-[10px] tracking-widest text-primary/60">Official Email ID</Label>
                  <Input id="email" type="email" placeholder="official@gov.in" className="py-6 rounded-xl border-2 font-bold" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-secondary/50 p-8 flex justify-end gap-4 border-t">
              <Button className="bg-primary px-12 py-7 rounded-xl font-black uppercase tracking-widest text-xs" onClick={() => setStep(2)}>
                Next Step <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card className="shadow-2xl border-none rounded-3xl overflow-hidden">
            <CardHeader className="bg-primary text-white py-8 px-10">
              <div className="flex items-center gap-4">
                <div className="bg-accent p-2 rounded-xl text-primary">
                  <Building className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-black uppercase tracking-tight">Step 2: Departmental Affiliation</CardTitle>
                  <CardDescription className="text-primary-foreground/70 font-bold uppercase text-[10px]">Category determines tariff rates as per Section 1.5</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-10">
              <RadioGroup defaultValue="govt" onValueChange={setCategory} className="grid grid-cols-1 gap-4">
                <Label
                  htmlFor="govt"
                  className={`flex items-center gap-4 p-6 border-2 rounded-2xl cursor-pointer transition-all ${category === "govt" ? 'border-primary bg-primary/5 shadow-inner' : 'hover:bg-muted border-transparent'}`}
                >
                  <RadioGroupItem value="govt" id="govt" className="sr-only" />
                  <div className={`p-4 rounded-2xl ${category === "govt" ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'}`}>
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-sm uppercase tracking-tight">Category A: Government Department / PSU</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Highest Priority. Base Rent: ₹5,000.</p>
                  </div>
                  <CheckCircle2 className={`h-6 w-6 ${category === "govt" ? 'text-primary' : 'text-transparent'}`} />
                </Label>

                <Label
                  htmlFor="ngo"
                  className={`flex items-center gap-4 p-6 border-2 rounded-2xl cursor-pointer transition-all ${category === "ngo" ? 'border-primary bg-primary/5 shadow-inner' : 'hover:bg-muted border-transparent'}`}
                >
                  <RadioGroupItem value="ngo" id="ngo" className="sr-only" />
                  <div className={`p-4 rounded-2xl ${category === "ngo" ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'}`}>
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-sm uppercase tracking-tight">Category B: Registered NGO / Educational</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Medium Priority. Base Rent: ₹15,000.</p>
                  </div>
                  <CheckCircle2 className={`h-6 w-6 ${category === "ngo" ? 'text-primary' : 'text-transparent'}`} />
                </Label>

                <Label
                  htmlFor="private"
                  className={`flex items-center gap-4 p-6 border-2 rounded-2xl cursor-pointer transition-all ${category === "private" ? 'border-primary bg-primary/5 shadow-inner' : 'hover:bg-muted border-transparent'}`}
                >
                  <RadioGroupItem value="private" id="private" className="sr-only" />
                  <div className={`p-4 rounded-2xl ${category === "private" ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'}`}>
                    <User className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-sm uppercase tracking-tight">Category C: Private / Commercial / Corporate</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Standard Priority. Base Rent: ₹50,000.</p>
                  </div>
                  <CheckCircle2 className={`h-6 w-6 ${category === "private" ? 'text-primary' : 'text-transparent'}`} />
                </Label>
              </RadioGroup>

              <div className="space-y-2">
                <Label htmlFor="org-name" className="font-black uppercase text-[10px] tracking-widest text-primary/60">Organization / Department Name</Label>
                <Input id="org-name" placeholder="Full Registered Name of Entity" className="py-6 rounded-xl border-2 font-bold" />
              </div>
            </CardContent>
            <CardFooter className="bg-secondary/50 p-8 flex justify-between gap-4 border-t">
              <Button variant="ghost" className="font-black uppercase text-[10px] tracking-widest text-muted-foreground" onClick={() => setStep(1)}>Back</Button>
              <Button className="bg-primary px-12 py-7 rounded-xl font-black uppercase tracking-widest text-xs" onClick={() => setStep(3)}>
                Next Step <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card className="shadow-2xl border-none rounded-3xl overflow-hidden">
            <CardHeader className="bg-primary text-white py-8 px-10">
              <div className="flex items-center gap-4">
                <div className="bg-accent p-2 rounded-xl text-primary">
                  <FileBadge className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-black uppercase tracking-tight">Step 3: Document Evidence</CardTitle>
                  <CardDescription className="text-primary-foreground/70 font-bold uppercase text-[10px]">Verification mandated by Section 13.3</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 border-2 border-dashed rounded-3xl bg-primary/5 flex flex-col items-center text-center group hover:border-primary transition-all">
                  <Fingerprint className="h-10 w-10 text-primary mb-4" />
                  <h4 className="font-black text-xs uppercase mb-2 tracking-tight">Aadhar Card Copy</h4>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase mb-6">Front & Back (PDF/JPG)</p>
                  <Button variant="outline" className="border-primary text-primary font-black uppercase text-[10px] rounded-xl hover:bg-primary hover:text-white">Upload Aadhar</Button>
                </div>

                <div className="p-8 border-2 border-dashed rounded-3xl bg-accent/5 flex flex-col items-center text-center group hover:border-accent transition-all">
                  <Building className="h-10 w-10 text-accent mb-4" />
                  <h4 className="font-black text-xs uppercase mb-2 tracking-tight">Departmental Proof</h4>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase mb-6">
                    {category === "govt" ? "Official Letterhead & Seal" : category === "ngo" ? "NGO Registration (80G)" : "PAN / GST Certificate"}
                  </p>
                  <Button variant="outline" className="border-accent text-accent font-black uppercase text-[10px] rounded-xl hover:bg-accent hover:text-white">Upload Evidence</Button>
                </div>
              </div>

              <div className="p-6 bg-destructive/10 border-2 border-destructive/20 rounded-2xl flex gap-4">
                <ShieldAlert className="h-6 w-6 text-destructive shrink-0" />
                <div className="space-y-4">
                  <p className="text-[11px] font-black text-destructive underline uppercase tracking-widest">Legal Declaration (Sec 13.3 & 14.6)</p>
                  <div className="flex items-start gap-4">
                    <Input type="checkbox" id="agree" className="h-5 w-5 mt-1 accent-destructive" />
                    <Label htmlFor="agree" className="text-[10px] text-primary/80 font-bold leading-relaxed uppercase">
                      I solemnly affirm that the information provided is 100% accurate. I acknowledge that misrepresentation of category or identity for subsided rates will result in immediate cancellation of all bookings, forfeiture of all deposits, and legal proceedings as per Department guidelines.
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-secondary/50 p-8 flex justify-between gap-4 border-t">
              <Button variant="ghost" className="font-black uppercase text-[10px] tracking-widest text-muted-foreground" onClick={() => setStep(2)}>Back</Button>
              <Button 
                className="bg-primary px-16 py-7 rounded-xl font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-105 transition-transform" 
                onClick={handleFinalSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Submit for Level-I Review"}
              </Button>
            </CardFooter>
          </Card>
        )}
      </main>
    </div>
  );
}
