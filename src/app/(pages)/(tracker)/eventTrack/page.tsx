"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ComboboxField } from "@/components/ui/combo-box";
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
import { CalendarCheck } from "lucide-react";

const Page = () => {
  return (
    <div className="flex w-full h-full pl-15 gap-5">
      <div className="h-full py-5 w-2/3 text-foreground overflow-y-scroll flex flex-col gap-5">
        <div className="flex gap-5 w-full h-fit items-start">
          <div className="w-fit">
            <Calendar
              mode="single"
              className="rounded-md border-primary border-2 shadow-md"
              showOutsideDays={false}
              disableNavigation
            />
          </div>
          <div className="w-1/2 flex flex-col gap-5">
            <h1 className="text-5xl font-bold text-justify">
              What{`'`}s your plan this month?
            </h1>
            <p className="text-secondary-foreground text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              odit obcaecati aperiam, ea eum animi? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quae molestiae fugit, quibusdam
              inventore illum sequi et voluptas laudantium quasi nostrum.
            </p>
          </div>
        </div>
        <div className="p-5 border-primary border-2 rounded-md flex flex-col gap-4">
          <div className="">
            <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
              <CalendarCheck size={35} />
              Your Monthly Event Recaps
            </h1>
            {/* <ComboboxField /> */}
          </div>
          <Table className="max-h-50">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>

            {Array.from({ length: 5 }).map((_, idx) => (
              <TableBody key={idx}>
                <TableRow>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>A</TableCell>
                  <TableCell>A</TableCell>
                  <TableCell>A</TableCell>
                  <TableCell>A</TableCell>
                </TableRow>
              </TableBody>
            ))}

            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell>$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <div className="flex w-full h-fit justify-center gap-2 items-center">
            <Button>Previus</Button>
            <Button>Next</Button>
          </div>
        </div>
      </div>
      <div className="bg-secondary w-1/3 p-5 flex flex-col h-full gap-5 text-foreground">
        <h1 className="font-semibold text-2xl">Quick Add</h1>
        <form action="" className="flex flex-col gap-2 ">
          <Label>Name</Label>
          <Input />
          <Label>Type</Label>
          <Input />
          <Label>Location</Label>
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
