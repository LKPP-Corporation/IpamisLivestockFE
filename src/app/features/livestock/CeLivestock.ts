import { Livestockstatus } from "../livestockstatus/livestockstatus";

export interface CeLivestock {
  id: string;
  tagid:string;
  name: string;
  currstatus:string;
  entercode:string;
  breedcode:string;
  enterdesc:string;
  breeddesc:string;
  dob:string;
  purchasedt:string;
  purchaseamt:number;
  origin:string;
  sex:string;
  sire:string;
  dam:string;
  statusList?:Livestockstatus[];
}


    



  