"use client";

import { useEffect, useState } from "react";
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
import {
  NotebookPenIcon,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Search,
  Loader2,
} from "lucide-react";
import SecondaryCard from "@/components/layout/cards/SecondaryCard";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ComboboxField } from "@/components/ui/combo-box";
import type { ITask, ITaskResponse } from "@/types/taskType";
import { useGetTask, useTaskSummary } from "@/hooks/useTask";
import { usePaginatedData } from "@/utils/paginatedData";
import { getDefaultDateRange } from "@/utils/defaultRage";
import { successToast } from "@/utils/toast";
import DatePickerField from "@/components/ui/date-picker";
import { confirmDialog } from "@/components/ui/alert";
import { useIsMobile } from "@/lib/isMobile";

interface IFormDataAdd {
  name: string;
  type: string;
  status: string;
  date: string;
  description: string;
}

interface ISearchType {
  month: number;
  year: number;
}

const Page = () => {
  const [data, setData] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const { task, refetch } = useTaskSummary();
  const { task: alltask, refetch: refetchAllTask } = useGetTask();
  const isMobile = useIsMobile();

  const {
    register: addData,
    handleSubmit: handleAddDataSubmit,
    control: controlAddData,
    reset: resetAddForm,
  } = useForm<IFormDataAdd>();

  const { control: searchControl, handleSubmit: handleSearchSubmit } =
    useForm<ISearchType>();

  const itemPerPage = 5;
  const { paginatedData, totalPages } = usePaginatedData(
    data,
    currentPage,
    itemPerPage
  );

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
    year: [
      { label: "2024", value: 2024 },
      { label: "2025", value: 2025 },
    ],
    status: [
      {
        label: "Done",
        value: "Done",
      },
      {
        label: "In Progress",
        value: "inProgress",
      },
      {
        label: "Pending",
        value: "pending",
      },
    ],
    type: [
      { label: "School", value: "School" },
      { label: "Personal", value: "Personal" },
      { label: "Organization", value: "Organization" },
      { label: "Work", value: "Work" },
      { label: "Research", value: "Research" },
    ],
  };

  const getTaskData = async (startDate: string, endDate: string) => {
    try {
      const res = await axios.get<ITaskResponse>("/api/user/track/task", {
        params: { startDate, endDate },
      });
      setData(res?.data?.data ?? []);
    } catch (err) {
      console.error("Fetch task failed:", err);
    }
  };

  useEffect(() => {
    const { startDate, endDate } = getDefaultDateRange();
    setDateRange({ startDate, endDate });
    getTaskData(startDate, endDate);
  }, []);

  const onSearch = async (form: ISearchType) => {
    try {
      const month = form.month.toString().padStart(2, "0");
      const year = form.year;
      const startDate = `${year}-${month}-01`;
      const lastDay = new Date(year, form.month, 0).getDate();
      const endDate = `${year}-${month}-${lastDay.toString().padStart(2, "0")}`;

      setDateRange({ startDate, endDate });
      await getTaskData(startDate, endDate);
    } catch (error) {
      console.log(error);
    } finally {
      await Promise.all([refetch(), refetchAllTask()]);
      setCurrentPage(1);
    }
  };

  const onSubmit = async (data: IFormDataAdd) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/user/track/task", data);
      const newTask = res?.data?.data;
      setData((prev) => [...prev, newTask]);
    } catch {
      successToast({ title: "Task added" });
    } finally {
      await Promise.all([refetch(), refetchAllTask()]);
      resetAddForm();
      setLoading(false);
      successToast({ title: "Task added" });
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
        await axios.delete(`/api/user/track/task/${id}`);
        await getTaskData(dateRange.startDate, dateRange.endDate);
      } catch {
        successToast({ title: "Failed to delete, something is wrong" });
      } finally {
        successToast({ title: "Task deleted" });
        await Promise.all([refetch(), refetchAllTask()]);
        setLoading(false);
      }
    }
  };

  const daily = task?.daily;
  const monthly = task?.monthly;
  const yearly = task?.yearly;

  const secondaryCardContent = [
    {
      count: daily?.count || 0,
      title: "Daily Recap",
      description: `Yo've reached ${daily?.count} racap(s) today! `,
    },
    {
      count: monthly?.count || 0,
      title: "Monthly Recap",
      description: `Yo've reached ${monthly?.count} racap(s) this month! `,
    },
    {
      count: yearly?.count || 0,
      title: "Yearly Recap",
      description: `Yo've reached ${yearly?.count} racap(s) this year! `,
    },
  ];
  return (
    <div className="w-full h-full flex md:flex-row flex-col md:pl-10 md:gap-10">
      <div className="h-full md:px-15 px-5 py-5 md:w-2/3 w-full text-foreground overflow-y-scroll flex flex-col gap-5">
        <h1 className="md:text-5xl text-2xl font-bold">{`${new Date().toDateString()}`}</h1>
        <div className="p-5 border-primary border-2 rounded-md flex flex-col gap-4">
          <div className="flex justify-between flex-wrap gap-y-4 items-center">
            <h1 className="text-lg md:text-2xl font-semibold flex items-center gap-2">
              <NotebookPenIcon size={isMobile ? 25 : 35} />
              Your Monthly Task Recap
            </h1>
            <form
              onSubmit={handleSearchSubmit(onSearch)}
              className="flex gap-2 items-center"
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
                  <Search size={20} />
                ) : (
                  <Loader2 className="animate-spin" />
                )}
              </Button>
            </form>
          </div>

          <Table className="max-h-50">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.map((item, idx) => (
                <TableRow key={item?.id ?? `row-${idx}`} className="text-sm">
                  <TableCell>
                    {(currentPage - 1) * itemPerPage + idx + 1}
                  </TableCell>
                  <TableCell>{item?.name}</TableCell>
                  <TableCell>{item?.type}</TableCell>
                  <TableCell>{item?.status}</TableCell>
                  <TableCell>{item?.date}</TableCell>
                  <TableCell>{item?.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => onDelete(item?.id)}
                      disabled={loading}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}>Total</TableCell>
                <TableCell className="text-right">
                  {alltask?.length || 0}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          <div className="flex w-full h-fit justify-center gap-2 items-center">
            <Button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ArrowLeft />
            </Button>
            <Button variant="outline">
              {currentPage} of {totalPages}
            </Button>
            <Button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-y-5 justify-between items-center">
          {secondaryCardContent.map((item, index) => (
            <SecondaryCard
              key={index}
              count={item?.count || 0}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>

      <div className="bg-secondary w-full md:w-1/3 p-5 flex flex-col md:h-full h-70 md:border-l-4 md:border-t-0 border-t-5 border-primary overflow-y-scroll gap-2 md:gap-5 text-foreground">
        <h1 className="font-semibold text-xl md:text-2xl">Quick Add</h1>
        <form
          onSubmit={handleAddDataSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <Label>Name</Label>
          <Input {...addData("name")} />
          <Label>Type</Label>
          <ComboboxField
            options={comboBoxOption.type}
            control={controlAddData}
            placeholder="Type"
            name="type"
          />
          <Label>Status</Label>
          <ComboboxField
            options={comboBoxOption.status}
            control={controlAddData}
            placeholder="Status"
            name="status"
          />
          <Label>Date</Label>
          <DatePickerField
            name="date"
            control={controlAddData}
            placeholder="Choose a date"
          />
          <Label>Description</Label>
          <Textarea className="resize-none" {...addData("description")} />
          <Button disabled={loading}>
            {!loading ? "Save" : <Loader2 className="animate-spin" />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
