import { format } from "date-fns";

export const getDisplayDate = (dateString: string) => {
  return format(new Date(dateString), " yyyy-MM-dd HH:ss");
};

export const markupToPlainText = (markup: string) => {
  return markup.replace(/<[^>]*>/g, "") 
};
