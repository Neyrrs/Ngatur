"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  CalendarCheck,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Search,
} from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEventSummary, useGetEvent } from "@/hooks/useEvent";
import type { IEvent, IEventResponse } from "@/types/eventType";
import { ComboboxField } from "@/components/ui/combo-box";
import { getDefaultDateRange } from "@/utils/defaultRage";
import { usePaginatedData } from "@/utils/paginatedData";
import DatePickerField from "@/components/ui/date-picker";
import { successToast } from "@/utils/toast";
import { confirmDialog } from "@/components/ui/alert";

interface IFormDataAdd {
  name: string;
  type: string;
  location: string;
  date: string;
}

interface ISearchType {
  month: number;
  year: number;
}

const Page = () => {
  const [data, setData] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const { event, refetch } = useEventSummary();
  const { event: allEvent, refetch: refetchAllEvent } = useGetEvent();

  const {
    register: addData,
    handleSubmit: handleAddDataSubmit,
    reset: resetData,
    control: controlAddDate,
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
      { label: "Family", value: "Family" },
      { label: "Friend", value: "Friend" },
      { label: "Organization", value: "Organization" },
      { label: "Personal", value: "Personal" },
    ],
  };

  const getEventData = async (startDate: string, endDate: string) => {
    try {
      const res = await axios.get<IEventResponse>("/api/user/track/event", {
        params: { startDate, endDate },
      });
      setData(res.data.data || []);
    } catch (err) {
      console.error("Fetch event failed:", err);
    }
  };

  useEffect(() => {
    const { startDate, endDate } = getDefaultDateRange();
    setDateRange({ startDate, endDate });
    getEventData(startDate, endDate);
  }, []);

  const onSubmit = async (data: IFormDataAdd) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/user/track/event", data);
      const dataRes = res?.data?.data;
      setData((prev) => [...prev, dataRes]);
    } catch {
      successToast({ title: "Failed to submit, please fill out all fields" });
    } finally {
      successToast({ title: "Event added" });
      await Promise.all([refetch(), refetchAllEvent()]);
      resetData();
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
        await axios.delete(`/api/user/track/event/${id}`);
        await getEventData(dateRange.startDate, dateRange.endDate);
      } catch {
        successToast({ title: "Failed to delete, something is wrong" });
      } finally {
        successToast({ title: "Task deleted" });
        setLoading(true);
        await Promise.all([refetch(), refetchAllEvent()]);
      }
    }
  };

  const onSearch = async (data: ISearchType) => {
    try {
      setLoading(true);
      const month = data.month.toString().padStart(2, "0");
      const year = data.year;
      const startDate = `${year}-${month}-01`;
      const lastDay = new Date(year, data.month, 0).getDate();
      const endDate = `${year}-${month}-${lastDay.toString().padStart(2, "0")}`;

      setDateRange({ startDate, endDate });
      setCurrentPage(1);
      await getEventData(startDate, endDate);
    } catch (err) {
      console.log(err);
    } finally {
      await Promise.all([refetch(), refetchAllEvent()]);
      setLoading(false);
    }
  };

  const secondaryCardContent = [
    {
      count: event?.daily?.count || 0,
      title: "Daily Event",
      description: `You've added ${event?.daily?.count || 0} event(s) today!`,
    },
    {
      count: event?.monthly?.count || 0,
      title: "Monthly Event",
      description: `You've added ${
        event?.monthly?.count || 0
      } event(s) this month!`,
    },
  ];

  return (
    <div className="flex w-full h-full pl-15 gap-5">
      <div className="h-full py-5 w-2/3 text-foreground overflow-y-scroll flex flex-col gap-5">
        <div className="flex gap-5 w-full h-fit items-center">
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
              What{"'"}s your plan this month?
            </h1>
            <p className="text-secondary-foreground text-justify">
              Plan your events here. You can add and manage events anytime
              during the month!
            </p>
          </div>
        </div>

        <div className="flex justify-between flex-wrap">
          {secondaryCardContent.map((item, index) => (
            <div
              key={index}
              className="border-primary border-2 rounded-md p-4 w-[48%] shadow-sm"
            >
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p className="text-2xl font-semibold">{item.count}</p>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="p-5 border-primary border-2 rounded-md flex flex-col gap-4">
          <div className="flex w-full items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <CalendarCheck size={35} />
              <h1 className="text-2xl font-semibold text-foreground">
                Your Monthly Event Recaps
              </h1>
            </div>
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
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.map((item, idx) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {(currentPage - 1) * itemPerPage + idx + 1}
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="icon"
                      disabled={loading}
                      onClick={() => onDelete(item.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>Total Events</TableCell>
                <TableCell className="text-right">
                  {allEvent?.length || 0}
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

        {/* <h2 className="text-center text-4xl font-semibold">Analytics</h2>
        <div className="flex p-5 w-full min-h-80 rounded-md border-2 border-primary"></div> */}
      </div>

      <div className="bg-secondary w-1/3 p-5 flex flex-col h-full gap-5 text-foreground">
        <h1 className="font-semibold text-2xl">Quick Add</h1>
        <form
          onSubmit={handleAddDataSubmit(onSubmit)}
          className="flex flex-col gap-2 "
        >
          <Label>Name</Label>
          <Input {...addData("name")} />
          <Label>Type</Label>
          <ComboboxField
            options={comboBoxOption?.status}
            control={controlAddDate}
            placeholder="type"
            name="type"
          />
          <Label>Location</Label>
          <Input {...addData("location")} />
          <Label>Date</Label>
          <DatePickerField
            name="date"
            control={controlAddDate}
            label="Date of birth"
            placeholder="Choose a date"
          />
          <Button disabled={loading}>
            {!loading ? "Save" : <Loader2 className="animate-spin" />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
