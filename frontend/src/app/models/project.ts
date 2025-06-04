import { EFile } from "./efile";
import { User } from "./user";

export class Project {
  id?:number;
  user_id?: number;
  user?:User;
  name?: string;
  description?: string;
  goal: number;
  e_files?: EFile[];
  start_date: string;
  end_date: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}
