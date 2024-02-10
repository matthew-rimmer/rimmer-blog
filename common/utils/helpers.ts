import { format } from "date-fns";

/** Formats a date string to display on the page */
export const getDisplayDate = (dateString: string) => {
  return format(new Date(dateString), "do MMMM yyyy");
};

/** Converts a markup string to plain text. */
export const markupToPlainText = (markup: string) => {
  return markup.replace(/<[^>]*>/g, "");
};

/** Removes the initial headers of a markup string */
export const contentMarkupToPreviewMarkup = (content: string) => {
  // Split the content into an array of strings line by line.
  const splitString = content.split("\n");
  const parsedString: String[] = [];

  // Loop through each line of the content.
  for (let index = 0; index < splitString.length; index++) {
    if (
      splitString.length === 1 ||
      splitString[index].startsWith("#") ||
      splitString[index + 1].startsWith("--")
    ) {
      break;
    } else {
      parsedString.push(splitString[index]);
    }
  }
  return parsedString.join("\n");
};

/** Returns the first paragraph of a markup string as plain text. */
export const getFirstParagraph = (content: string) => {
  // Split the content into an array of strings line by line.
  const splitString = content.split("\n");
  const parsedString: String[] = [];

  const markupCheck: RegExp = /^#|--|\*|\>|\-|\=/

  // Loop through each line of the content.
  for (let index = 0; index < splitString.length; index++) {
    const line = splitString[index];
    if (line?.length > 1 && !markupCheck.test(line)) {
      return markupToPlainText(line);
    }
  }
  return "";
};