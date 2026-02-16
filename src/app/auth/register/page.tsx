"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Building, GraduationCap, User, Upload, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("govt");

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold border-2 transition-colors ${
                step >= s ? 'bg-primary border-primary text-white' : 'bg-white border-muted-foreground text-muted-foreground'
              }`}>
                {step > s ? <CheckCircle2 className="h-6 w-6" /> : s}
              </div>
              {s < 3 && <div className={`h-1 flex-1 mx-2 ${step > s ? 'bg-primary' : 'bg-muted'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <Card className="shadow-xl border-none">
            <CardHeader className="bg-primary text-white rounded-t-lg">
              <CardTitle className="text-2xl font-headline">Step 1: Account Information</CardTitle>
              <CardDescription className="text-primary-foreground/80">Basic details for primary contact.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" placeholder="Contact Person Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input id="designation" placeholder="e.g. Secretary, Director" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number (OTP Verification)</Label>
                <div className="flex gap-2">
                  <Input id="mobile" placeholder="+91 XXXX XXX XXX" />
                  <Button variant="outline" className="shrink-0">Send OTP</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Official Email</Label>
                <Input id="email" type="email" placeholder="example@gov.in" />
              </div>
            </CardContent>
            <CardFooter className="bg-secondary/50 p-6 flex justify-end">
              <Button className="bg-primary px-8" onClick={() => setStep(2)}>Next Step</Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card className="shadow-xl border-none">
            <CardHeader className="bg-primary text-white rounded-t-lg">
              <CardTitle className="text-2xl font-headline">Step 2: Category & Organization</CardTitle>
              <CardDescription className="text-primary-foreground/80">Pricing and priority are determined by this selection.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <RadioGroup defaultValue="govt" onValueChange={setCategory} className="grid grid-cols-1 gap-4">
                <Label
                  htmlFor="govt"
                  className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${category === "govt" ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-muted'}`}
                >
                  <RadioGroupItem value="govt" id="govt" className="sr-only" />
                  <div className={`p-3 rounded-full ${category === "govt" ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                    <Building className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">Category A: Government Department</p>
                    <p className="text-sm text-muted-foreground">Highest priority. Maintenance fee only.</p>
                  </div>
                  <ShieldCheck className={`h-6 w-6 ${category === "govt" ? 'text-primary' : 'text-transparent'}`} />
                </Label>

                <Label
                  htmlFor="ngo"
                  className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${category === "ngo" ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-muted'}`}
                >
                  <RadioGroupItem value="ngo" id="ngo" className="sr-only" />
                  <div className={`p-3 rounded-full ${category === "ngo" ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">Category B: NGO / Educational</p>
                    <p className="text-sm text-muted-foreground">Medium priority. Subsidized rates.</p>
                  </div>
                  <ShieldCheck className={`h-6 w-6 ${category === "ngo" ? 'text-primary' : 'text-transparent'}`} />
                </Label>

                <Label
                  htmlFor="private"
                  className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${category === "private" ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-muted'}`}
                >
                  <RadioGroupItem value="private" id="private" className="sr-only" />
                  <div className={`p-3 rounded-full ${category === "private" ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                    <User className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">Category C: Private / Commercial</p>
                    <p className="text-sm text-muted-foreground">Standard priority. Full commercial rates.</p>
                  </div>
                  <ShieldCheck className={`h-6 w-6 ${category === "private" ? 'text-primary' : 'text-transparent'}`} />
                </Label>
              </RadioGroup>

              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input id="org-name" placeholder="Full Registered Name" />
              </div>
            </CardContent>
            <CardFooter className="bg-secondary/50 p-6 flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button className="bg-primary px-8" onClick={() => setStep(3)}>Next Step</Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card className="shadow-xl border-none">
            <CardHeader className="bg-primary text-white rounded-t-lg">
              <CardTitle className="text-2xl font-headline">Step 3: Document Verification</CardTitle>
              <CardDescription className="text-primary-foreground/80">Upload proof of organization and categorization.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="p-6 border-2 border-dashed rounded-xl bg-accent/5 flex flex-col items-center justify-center text-center">
                <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                <h4 className="font-bold mb-2">Upload Mandatory Proof</h4>
                <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                  {category === "govt" ? "Department Letterhead with official stamp" : category === "ngo" ? "Society Registration Certificate / 80G Certificate" : "PAN Card / GST Registration"}
                </p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Choose Files (PDF/JPG)
                </Button>
                <p className="mt-2 text-[10px] text-muted-foreground">Max size: 5MB per file</p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <Input type="checkbox" id="agree" className="mt-1 h-4 w-4" />
                  <Label htmlFor="agree" className="text-sm text-muted-foreground font-normal leading-relaxed">
                    I solemnly declare that all information provided is true to my knowledge. I understand that misrepresentation of category for subsidized rates will result in immediate disqualification and legal action.
                  </Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-secondary/50 p-6 flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button className="bg-primary px-8" asChild>
                <Link href="/dashboard/requester">Submit for Verification</Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </main>
    </div>
  );
}
