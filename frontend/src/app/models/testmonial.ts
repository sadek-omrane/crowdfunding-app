import { EFile } from "./efile";

export class Testmonial{
  id?:number;
  name?: string;
  e_file_id?: number;
  e_file?:EFile;
  content ?: string;
  rating ?: number;
  created_at?: string;
  updated_at?: string;
}
