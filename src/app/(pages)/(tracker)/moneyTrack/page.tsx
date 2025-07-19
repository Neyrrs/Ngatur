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
import DatePickerField from "@/components/ui/date-picker";
import { successToast } from "@/utils/toast";
import { confirmDialog } from "@/components/ui/alert";
import { useIsMobile } from "@/lib/isMobile";

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
  const isMobile = useIsMobile();

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
      { label: "August", value: 8 },
      { label: "September", value: 9 },
      { label: "October", value: 10 },
      { label: "November", value: 11 },
      { label: "December", value: 12 },
    ],
    year: [{ label: "2025", value: 2025 }],
    status: [
      { label: "Expense", value: "Expense" },
      { label: "Income", value: "Income" },
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
      description: `You've reached ${daily?.count} recap(s) today!`,
    },
    {
      count: monthly?.count || 0,
      title: "Monthly Recap",
      description: `You've reached ${monthly?.count} recap(s) this month!`,
    },
    {
      count: yearly?.count || 0,
      title: "Yearly Recap",
      description: `You've reached ${yearly?.count} recap(s) this year!`,
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
        setCurrentPage(1);
      }
    }
  };

  const onSubmit = async (data: IFormDataAdd) => {
    try {
      setLoading(true);
      const res = await axios.post(`/api/user/track/money`, data);
      const dataRes = res?.data?.data;
      setData((prev) => [...prev, dataRes]);
    } catch {
      successToast({ title: "Failed to submit, please fill out all fields" });
    } finally {
      successToast({ title: "Money recap added" });
      resetData();
      await Promise.all([refetch(), refetchAmount()]);
      setLoading(false);
    }
  };

  const onDelete = async (id: number) => {
    const result = await confirmDialog(
      "Delete Item?",
      "This action cannot be undone!"
    );

    if (result) {
      try {
        setLoading(true);
        await axios.delete(`/api/user/track/money/${id}`);
        await getMoneyData(dateRange.startDate, dateRange.endDate);
      } catch {
        successToast({ title: "Failed to delete, something is wrong" });
      } finally {
        successToast({ title: "Money recap deleted" });
        await Promise.all([refetch(), refetchAmount()]);
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-5 md:gap-10 md:pl-10">
      <main className="w-full md:w-2/3 h-full flex flex-col gap-5 overflow-y-auto px-5 py-5 text-foreground">
        <div className="flex items-center w-fit h-fit">
          <WalletIcon size={isMobile ? 35 : 60} />
          <h1 className="text-2xl md:text-7xl flex ml-4">
            {amount ? calculateBalance(amount) : 0}
          </h1>
        </div>

        <div className="flex justify-between flex-wrap gap-5">
          {secondaryCardContent.map((item, index) => (
            <SecondaryCard
              key={index + 1}
              count={item?.count}
              title={item?.title}
              description={item.description}
            />
          ))}
        </div>

        <div className="rounded-md border-2 border-primary flex flex-col gap-5 p-5 w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold text-foreground">
              Your Monthly Money Recap
            </h1>
            <form
              onSubmit={handleSearchSubmit(onSearch)}
              className="flex flex-wrap gap-3 items-center"
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
              <Button size="icon">
                {!loading ? (
                  <Search size={25} />
                ) : (
                  <Loader2 className="animate-spin" />
                )}
              </Button>
            </form>
          </div>
          <div className="overflow-x-auto w-full">
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
                    <TableCell>
                      {(currentPage - 1) * itemPerPage + index + 1}
                    </TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.status}</TableCell>
                    <TableCell>{item?.date}</TableCell>
                    <TableCell>{item?.amount}</TableCell>
                    <TableCell className="w-10">
                      <Button
                        variant="destructive"
                        size="icon"
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
                  <TableCell colSpan={2} className="text-right">
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
              size="icon"
            >
              <ArrowLeft />
            </Button>
            <Button variant="outline" className="font-semibold">
              {currentPage} of {totalPages}
            </Button>
            <Button
              variant="default"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              size="icon"
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      </main>

      <aside className="bg-secondary w-full md:w-1/3 p-5 flex flex-col md:h-full h-70 md:border-l-4 md:border-t-0 border-t-5 border-primary overflow-y-scroll gap-2 md:gap-5 text-foreground">
        <h1 className="font-semibold text-xl md:text-2xl">Quick Add</h1>
        <form
          onSubmit={handleAddDataSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <Label>Name</Label>
          <Input {...addData("name")} />
          <Label>Status</Label>
          <ComboboxField
            options={comboBoxOption.status}
            control={addDataControl}
            placeholder="Status"
            name="status"
          />
          <Label>Date</Label>
          <DatePickerField
            name="date"
            control={addDataControl}
            placeholder="Choose a date"
          />
          <Label>Amount</Label>
          <Input type="number" {...addData("amount")} />
          <Button size="sm" disabled={loading}>
            {!loading ? "Save" : <Loader2 className="animate-spin" />}
          </Button>
        </form>
      </aside>
    </div>
  );
};

export default Page;
