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
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Search,
  Trash2,
  WalletIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { IMoney, IMoneyResponse } from "@/types/moneyType";
import { useSummary, useGetMoney } from "@/hooks/useMoney";
import { calculateBalance } from "@/utils/calculateBalance";
import { getDefaultDateRange } from "@/utils/defaultRage";
import { usePaginatedData } from "@/utils/paginatedData";

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

const Page = () => {
  const [data, setData] = useState<IMoney[]>([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const { money, refetch } = useSummary();
  const { money: amount, refetch: refetchAmount } = useGetMoney();
  const [currentPage, setCurrentPage] = useState(1);

  const { control: searchControl, handleSubmit: handleSearchSubmit } =
    useForm<ISearchType>();

  const {
    register: addData,
    handleSubmit: handleAddDataSubmit,
    control: addDataControl,
    reset: resetData,
  } = useForm<IFormDataAdd>();

  useEffect(() => {
    const { startDate, endDate } = getDefaultDateRange();
    setDateRange({ startDate, endDate });
    getMoneyData(startDate, endDate);
  }, []);

  const itemPerPage = 5;
  const { paginatedData, totalPages } = usePaginatedData(
    data,
    currentPage,
    itemPerPage
  );

  const daily = money?.daily;
  const monthly = money?.monthly;
  const yearly = money?.yearly;

  const comboBoxOption = {
    month: [
      { label: "January", value: 1 },
      { label: "February", value: 2 },
      { label: "March", value: 3 },
      { label: "April", value: 4 },
      { label: "May", value: 5 },
      { label: "June", value: 6 },
      { label: "July", value: 7 },
      { label: "Agust", value: 8 },
      { label: "September", value: 9 },
      { label: "Oktober", value: 10 },
      { label: "November", value: 11 },
      { label: "Desember", value: 12 },
    ],
    year: [{ label: "2025", value: 2025 }],
    status: [
      { label: "Expense", value: "expense" },
      { label: "Income", value: "income" },
    ],
  };

  const getMoneyData = async (startDate: string, endDate: string) => {
    try {
      const res = await axios.get<IMoneyResponse>(`/api/user/track/money`, {
        params: { startDate, endDate },
      });
      setData(res?.data?.data);
    } catch (err) {
      console.error("Fetch money failed:", err);
    }
  };

  const secondaryCardContent = [
    {
      count: daily?.count || 0,
      title: "Daily Recap",
      description: `Yo've reached ${daily?.count} racaps today! `,
    },
    {
      count: monthly?.count || 0,
      title: "Monthly Recap",
      description: `Yo've reached ${monthly?.count} racaps this month! `,
    },
    {
      count: yearly?.count || 0,
      title: "Yearly Recap",
      description: `Yo've reached ${yearly?.count} racaps this year! `,
    },
  ];

  const onSearch = async (data: ISearchType) => {
    if (data.year && data.month) {
      try {
        setLoading(true);
        const month = data.month.toString().padStart(2, "0");
        const lastDay = new Date(data.year, data.month, 0).getDate();
        const startDate = `${data.year}-${month}-01`;
        const endDate = `${data.year}-${month}-${lastDay
          .toString()
          .padStart(2, "0")}`;

        await getMoneyData(startDate, endDate);
      } catch (err) {
        console.log(err);
      } finally {
        await Promise.all([refetch(), refetchAmount()]);
        setLoading(false);
      }
    }
  };

  const onSubmit = async (data: IFormDataAdd) => {
    try {
      setLoading(true);
      const res = await axios.post(`/api/user/track/money`, {
        name: data.name,
        status: data.status,
        date: data.date,
        amount: data.amount,
      });
      const dataRes = res?.data?.data;
      setData((prev) => [...prev, dataRes]);
    } catch (error) {
      console.log(error);
    } finally {
      resetData();
      await Promise.all([refetch(), refetchAmount()]);
      setLoading(false);
    }
  };

  const onDelete = async (id: number) => {
    try {
      setLoading(true);
      await axios.delete(`/api/user/track/money/${id}`);
      await getMoneyData(dateRange.startDate, dateRange.endDate);
    } catch (err) {
      console.error("Fetch money failed:", err);
    } finally {
      await Promise.all([refetch(), refetchAmount()]);
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-full pl-15 gap-5">
      <main className="w-2/3 bg-background flex flex-col gap-8 py-5 pr-4 overflow-y-auto">
        <div className="flex items-center w-fit h-fit">
          <WalletIcon size={60} />
          <h1 className="text-7xl flex ml-4">
            {amount ? calculateBalance(amount) : 0}
          </h1>
        </div>

        <div className="flex justify-between flex-wrap">
          {secondaryCardContent.map((item, index) => (
            <SecondaryCard
              key={index + 1}
              count={item?.count}
              title={item?.title}
              description={item.description}
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
                {!loading ? (
                  <Search size={25} />
                ) : (
                  <Loader2 className="animate-spin" />
                )}
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
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedData?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.status}</TableCell>
                    <TableCell>{item?.date}</TableCell>
                    <TableCell>{item?.amount}</TableCell>
                    <TableCell className="w-10">
                      <Button
                        variant={"destructive"}
                        size={"icon"}
                        onClick={() => onDelete(item.id)}
                        disabled={loading}
                      >
                        <Trash2 />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}>Total</TableCell>
                  <TableCell className="text-right" colSpan={2}>
                    {data?.length || "0"}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>

          <div className="flex justify-center gap-2 items-center">
            <Button
              variant="default"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              size={"icon"}
            >
              <ArrowLeft />
            </Button>
            <Button variant={"outline"} className="font-semibold">
              {currentPage} of {totalPages}
            </Button>
            <Button
              variant="default"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <ArrowRight />
            </Button>
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
          <ComboboxField
            options={comboBoxOption?.status}
            control={addDataControl}
            placeholder="status"
            name="status"
          />
          <Label>Date</Label>
          <Input {...addData("date")} type="date" />
          <Label>Amount</Label>
          <Input {...addData("amount")} type="number" />
          <Button size={"sm"} disabled={loading}>
            {!loading ? "Save" : <Loader2 className="animate-spin" />}
          </Button>
        </form>
      </aside>
    </div>
  );
};

export default Page;
