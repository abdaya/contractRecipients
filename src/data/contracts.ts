
import type { Contract } from "../models/Contract.js";

export const contract: Contract = {
  id: 101,
  title: "Building Maintenance Agreement",
  departmentId: 2,
  contractManagerId: 1,
  endDate: "2026-12-31",
  renewalNoticeDays: 30,
  additionalRecipients: [
    { type: "user", id: 2 }
  ]
};
