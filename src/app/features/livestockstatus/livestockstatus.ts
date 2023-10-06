import { Buyerinfo } from "../buyerinfo/buyerinfo";

export interface Livestockstatus {
  id?: string;
  regid?:string;
  remark?:string;
  status?:string;
  transdate?:Date;
  buyer?:Buyerinfo;
  chgdate?:Date;
  soldamt?:number;

}
