
import { contract } from "./data/contracts.js";
import { RenewalNoticeService } from "./services/RenewalNoticeService.js";

const renewalNoticeService = new RenewalNoticeService();

const finalRecipients =
  renewalNoticeService.getFinalRecipients(contract);

console.log("Final recipients:", finalRecipients);

