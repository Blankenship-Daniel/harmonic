import { HighlightInterface } from "./HighlightInterface";

export interface CompanyInterface {
  id: number;
  name: string;
  description: string;
  highlights: HighlightInterface[];
}
