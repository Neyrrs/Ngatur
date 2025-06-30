import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Sidebar = () => {
  return (
    <aside className="fixed top-15 right-0 h-screen w-85 p-5 flex flex-col gap-5 bg-[#222831] text-white z-50">
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
    </aside>
  );
};
export default Sidebar;
