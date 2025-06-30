import SecondaryCard from "@/components/layout/cards/SecondaryCard";
import Sidebar from "@/components/layout/navigation/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const page = () => {
  return (
    <div className="flex">
      <main className="mx-15 w-full bg-background flex flex-col gap-8 h-fit py-5">
        <h1 className="text-7xl">
          <span className="font-medium">$</span>
          {"100,000,00"}
        </h1>
        <div className="flex justify-around flex-wrap gap-5">
          <SecondaryCard />
          <SecondaryCard />
          <SecondaryCard />
        </div>
        <div className="rounded-md border-3 border-primary flex flex-col gap-5 p-2">
          <h1 className="text-2xl font-semibold">Your Monthly money recap</h1>
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
      <Sidebar />
    </div>
  );
};

export default page;
