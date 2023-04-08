import { format } from "date-fns";

export const getDisplayDate = (dateString: string) => {
  return format(new Date(dateString), "do MMMM yyyy");
};

export const markupToPlainText = (markup: string) => {
  return markup.replace(/<[^>]*>/g, "") 
};
