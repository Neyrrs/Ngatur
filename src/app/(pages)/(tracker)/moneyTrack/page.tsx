"use client";

import SecondaryCard from "@/components/layout/cards/SecondaryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WalletIcon } from "lucide-react";
import React, { useEffect } from "react";
import axios from "axios";

const Page = () => {
  useEffect(() => {
    const fetching = async () => {
      const result = await axios.get("/api/user/track/money");
      console.log(result.data.data);
    };
    fetching();
  }, []);

  return (
    <div className="flex h-full w-full pl-15 gap-5">
      <main className="w-2/3 bg-background flex flex-col gap-8 h-fit py-5">
        <div className="flex items-center w-fit h-fit">
          <WalletIcon size={60} />
          <h1 className="text-7xl flex">{"100,000,00"}</h1>
        </div>
        <div className="flex justify-around flex-wrap">
          {Array.from({ length: 3 }).map((_, index) => (
            <SecondaryCard
              key={index + 1}
              count={index + 1}
              title="Ini Judul"
              description="Ini Deskripsi"
            />
          ))}
        </div>
        <div className="rounded-md border-2 border-primary flex flex-col gap-5 p-5">
          <h1 className="text-2xl font-semibold text-foreground">
            Your Monthly Money Recap
          </h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]"></TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <div className="flex justify-center gap-2 items-center">
            <Button variant={"default"} className="flex items-center">
              Preivous
            </Button>
            <Button variant={"default"} className="flex items-center">
              Next
            </Button>
          </div>
        </div>
      </main>
      <div className="bg-secondary w-1/3 p-5 flex flex-col h-full gap-5 text-foreground">
        <h1 className="font-semibold text-2xl">Quick Add</h1>
        <form action="" className="flex flex-col gap-2">
          <Label>Name</Label>
          <Input />
          <Label>Amount</Label>
          <Input />
          <Label>Status</Label>
          <Input />
          <Label>Date</Label>
          <Input type="date" />
          <Button>Save</Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
