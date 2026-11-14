
import type { Recipient } from "./Recipient.js";

export interface Contract {
  id: number;
  title: string;
  departmentId: number;
  contractManagerId: number;
  endDate: string;
  renewalNoticeDays: number;
  additionalRecipients: Recipient[];
}
