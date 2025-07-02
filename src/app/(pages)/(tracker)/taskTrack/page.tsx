import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NotebookPenIcon } from "lucide-react";
import SecondaryCard from "@/components/layout/cards/SecondaryCard";

const page = () => {
  return (
    <div className="w-full h-full flex pl-15 gap-10">
      <div className="h-full py-5 w-2/3 text-foreground overflow-y-scroll flex flex-col gap-5">
        <h1 className="text-5xl font-bold">{`${new Date().toDateString()}`}</h1>
        <div className="p-5 border-primary border-2 rounded-md flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <NotebookPenIcon size={35} />
            Your Monthly Task Recap
          </h1>
          <Table className="max-h-50">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
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
                  <TableCell>A</TableCell>
                </TableRow>
              </TableBody>
            ))}

            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>Total</TableCell>
                <TableCell>$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <div className="flex w-full h-fit justify-center gap-2 items-center">
            <Button>Previus</Button>
            <Button>Next</Button>
          </div>
        </div>
        <div className="flex justify-around items-center">
          {Array.from({ length: 2 }).map((_, index) => (
            <SecondaryCard
              key={index}
              count={index + 1}
              title="Ini Judul"
              description="Hi semuanya"
            />
          ))}
        </div>
        <div className="flex p-5 w-full min-h-80 rounded-md border-2 border-primary"></div>
      </div>
      <div className="bg-secondary w-1/3 p-5 flex flex-col h-full gap-5 text-foreground">
        <h1 className="font-semibold text-2xl">Quick Add</h1>
        <form action="" className="flex flex-col gap-2">
          <Label>Name</Label>
          <Input />
          <Label>Type</Label>
          <Input />
          <Label>Status</Label>
          <Input />
          <Label>Date</Label>
          <Input type="date" />
          <Label>Description</Label>
          <Textarea className="resize-none" />
          <Button>Save</Button>
        </form>
      </div>
    </div>
  );
};

export default page;
