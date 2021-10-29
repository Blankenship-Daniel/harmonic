import { CompanyHighlightCategory } from "./CompanyHighlightCategory";

export interface HighlightInterface {
  category: CompanyHighlightCategory;
  date_added?: string;
  text?: string;
}
