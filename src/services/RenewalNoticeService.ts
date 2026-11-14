
import type { User } from "../models/User.js";
import type { Contract } from "../models/Contract.js";
import { UserService } from "./UserService.js";
import { RecipientService } from "./RecipientService.js";

export class RenewalNoticeService {
  private userService = new UserService();
  private recipientService = new RecipientService();

  getFinalRecipients(contract: Contract): User[] {
    const eligibleRecipients =
      this.recipientService.collectRecipients(contract);

    console.log("Collected recipients:", eligibleRecipients);

    const uniqueRecipients =
      this.recipientService.removeDuplicates(eligibleRecipients);

    console.log("Unique recipients:", uniqueRecipients);

    const contractManager =
      this.userService.findUser(contract.contractManagerId);

    console.log("Contract Manager:", contractManager);

    if (contractManager) {
      const alreadyExists = uniqueRecipients.some(
        (user) => user.id === contractManager.id
      );

      if (!alreadyExists) {
        uniqueRecipients.push(contractManager);
      }
    }

    return uniqueRecipients;
  }
}
