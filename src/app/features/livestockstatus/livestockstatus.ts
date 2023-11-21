import { Buyerinfo } from "../buyerinfo/buyerinfo";

export interface Livestockstatus {
  id?: string|null;
  regid?:string;
  remark?:string;
  status?:string;
  transdate?:Date;
  buyer?:Buyerinfo|null;
  chgdate?:Date;
  soldamt?:number;

}
