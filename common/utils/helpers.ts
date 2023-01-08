import { format } from "date-fns";

export const getDisplayDate = (dateString: string) => {
  return format(new Date(dateString), "MMM dd, yyyy, HH:mm");
};

export const markupToPlainText = (markup: string) => {
  return markup.replace(/<[^>]*>/g, "") 
};
