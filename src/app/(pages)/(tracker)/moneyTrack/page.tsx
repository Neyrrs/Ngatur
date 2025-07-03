"use client";

import SecondaryCard from "@/components/layout/cards/SecondaryCard";
import { Button } from "@/components/ui/button";
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
import axios from "axios";
import { Search, WalletIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { IResponseMoney, IMoney } from "@/types/moneyType";

interface ISearchType {
  month: number;
  year: number;
}

interface IFormDataAdd {
  name: string;
  status: string;
  date: string;
  amount: number;
}

const comboBoxOption = {
  month: [
    { label: "Januari", value: 1 },
    { label: "Februari", value: 2 },
    { label: "Maret", value: 3 },
    { label: "April", value: 4 },
    { label: "Mei", value: 5 },
    { label: "Juni", value: 6 },
    { label: "Juli", value: 7 },
    { label: "Agustus", value: 8 },
    { label: "September", value: 9 },
    { label: "Oktober", value: 10 },
    { label: "November", value: 11 },
    { label: "Desember", value: 12 },
  ],
  year: [{ label: "2025", value: 2025 }],
};

const Page = () => {
  const [data, setData] = useState<IMoney[]>([]);

  const { control: searchControl, handleSubmit: handleSearchSubmit } =
    useForm<ISearchType>();

  const { register: addData, handleSubmit: handleAddDataSubmit } =
    useForm<IFormDataAdd>();

  const fetchData = async () => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear().toString();

    const res = await axios.get<IResponseMoney>(`/api/user/track/money`, {
      params: {
        startDate: `${year}-${month.toString().padStart(2, "0")}-01`,
        endDate: `${year}-${month.toString().padStart(2, "0")}-31`,
      },
    });
    setData(res?.data?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSearch = async (data: ISearchType) => {
    try {
      const month = data.month.toString().padStart(2, "0");
      const res = await axios.get<IResponseMoney>(`/api/user/track/money`, {
        params: {
          startDate: `${data.year}-${month}-01`,
          endDate: `${data.year}-${month}-31`,
        },
      });
      setData(res?.data?.data);
    } catch (err) {}
  };

  const onSubmit = async (data: IFormDataAdd) => {
    const res = await axios.post(`/api/user/track/money`, {
      name: data.name,
      status: data.status,
      date: data.date,
      amount: data.amount,
    });
    const dataRes = res?.data?.data;
    console.log(dataRes);
    setData((prev) => [...prev, dataRes]);
  };

  return (
    <div className="flex w-full h-full pl-15 gap-5">
      <main className="w-2/3 bg-background flex flex-col gap-8 py-5 pr-4 overflow-y-auto">
        <div className="flex items-center w-fit h-fit">
          <WalletIcon size={60} />
          <h1 className="text-7xl flex ml-4">{"100,000,00"}</h1>
        </div>

        <div className="flex justify-between flex-wrap">
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
          <div className="flex w-full items-center justify-between flex-wrap gap-4">
            <h1 className="text-2xl font-semibold text-foreground">
              Your Monthly Money Recap
            </h1>
            <form
              onSubmit={handleSearchSubmit(onSearch)}
              className="flex gap-3 items-center"
            >
              <ComboboxField
                options={comboBoxOption.month}
                control={searchControl}
                placeholder="Month"
                name="month"
              />
              <ComboboxField
                options={comboBoxOption.year}
                control={searchControl}
                placeholder="Year"
                name="year"
              />
              <Button size={"icon"}>
                <Search size={25} />
              </Button>
            </form>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">No</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              {/* <TableBody>
                {data?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell className="max-w-sm break-words whitespace-normal">
                      {item.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody> */}

              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}>Total</TableCell>
                  <TableCell className="text-right">
                    {data?.length || "0"}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>

          <div className="flex justify-center gap-2 items-center">
            <Button variant="default">Previous</Button>
            <Button variant="default">Next</Button>
          </div>
        </div>
      </main>

      <aside className="bg-secondary w-1/3 p-5 flex flex-col h-full gap-5 text-foreground">
        <h1 className="font-semibold text-2xl">Quick Add</h1>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleAddDataSubmit(onSubmit)}
        >
          <Label>Name</Label>
          <Input {...addData("name")} />
          <Label>Status</Label>
          <Input {...addData("status")} />
          <Label>Date</Label>
          <Input {...addData("date")} type="date" />
          <Label>Amount</Label>
          <Input {...addData("amount")} type="number" />
          <Button>Save</Button>
        </form>
      </aside>
    </div>
  );
};

export default Page;
