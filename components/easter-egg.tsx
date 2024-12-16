"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export function EasterEgg() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);

  const correctPassword = "2007-05-17"; 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsUnlocked(true);
    } else {
      alert("Incorrect password. Try again!");
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-purple-100 to-pink-200">
      <div className="container mx-auto px-4 text-center">
        <Button
          onClick={() => setIsDialogOpen(true)}
          variant="outline"
          className="text-purple-600 border-purple-600 hover:bg-purple-100"
        >
          ❤️ Click for a surprise ❤️
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter the Secret Code</DialogTitle>
              <DialogDescription>
                Hint: It's a special date a queen was born (YYYY-MM-DD)
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="col-span-3"
                    placeholder="YYYY-MM-DD"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
            {isUnlocked && (
              <div className="mt-4">
                <p className="text-green-600 font-bold mb-2">
                  You've unlocked our special memory!
                </p>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="rounded-lg mx-auto w-[400px] h-[350px] object-cover"
                >
                  <source src="/she.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p className="mt-2 text-sm text-gray-600">
                  Remember this moment? It's one of my favorites with you.
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
