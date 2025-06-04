import { EFile } from "./efile";

export class Partner{
  id?:number;
  name?: string;
  e_file_id?: number;
  e_file?:EFile;
  created_at?: string;
  updated_at?: string;
}
