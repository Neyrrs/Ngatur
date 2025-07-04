import { toast } from "sonner";
import { formatFullDateTime } from "./formattedDate";

export const successToast = ({ title = "" }) => {
  toast(title, {
    description: formatFullDateTime(new Date()),
  });
};