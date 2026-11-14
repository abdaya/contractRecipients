import type { User } from "../models/User.js";
import type { Contract } from "../models/Contract.js";
import { UserService } from "./UserService.js";
import { PermissionService } from "./PermissionService.js";

export class RecipientService {
  private userService = new UserService();
  private permissionService = new PermissionService();

  getEligibleUser(userId: number, contract: Contract): User | undefined {
    const user = this.userService.findUser(userId);

    if (!user) {
      return undefined;
    }

    if (!this.permissionService.canReceiveNotice(user, contract)) {
      return undefined;
    }

    return user;
  }

  getEligibleGroupMembers(groupId: number, contract: Contract): User[] {
    const group = this.userService.findGroup(groupId);

    if (!group) {
      return [];
    }

    const members = group.memberIds
      .map((id) => this.userService.findUser(id))
      .filter((user): user is User => user !== undefined);

    return members.filter((user) =>
      this.permissionService.canReceiveNotice(user, contract),
    );
  }

  collectRecipients(contract: Contract): User[] {
    const eligibleRecipients: User[] = [];

    for (const recipient of contract.additionalRecipients) {
      if (recipient.type === "user") {
        const user = this.getEligibleUser(recipient.id, contract);

        if (user) {
          eligibleRecipients.push(user);
        }
      } else if (recipient.type === "group") {
        const members = this.getEligibleGroupMembers(recipient.id, contract);

        eligibleRecipients.push(...members);
      }
    }

    return eligibleRecipients;
  }

  removeDuplicates(recipients: User[]): User[] {
    const uniqueRecipients: User[] = [];

    for (const user of recipients) {
      const alreadyExists = uniqueRecipients.some(
        (existingUser) => existingUser.id === user.id,
      );

      if (!alreadyExists) {
        uniqueRecipients.push(user);
      }
    }

    return uniqueRecipients;
  }
}
