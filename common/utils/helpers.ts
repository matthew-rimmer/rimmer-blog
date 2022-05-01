import { format } from "date-fns";

export const getDisplayDate = (dateString: string) => {
    console.log(dateString);
  return format(new Date(dateString), " yyyy-MM-dd HH:ss");
};
