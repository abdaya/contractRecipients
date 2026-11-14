
import type { User } from "../models/User.js";
import type { Contract } from "../models/Contract.js";

export class PermissionService {
  hasViewRights(user: User, departmentId: number): boolean {
    return user.departmentViewRights.includes(departmentId);
  }

  isActive(user: User): boolean {
    return user.active;
  }

  canReceiveNotice(user: User, contract: Contract): boolean {
    return (
      this.isActive(user) &&
      this.hasViewRights(user, contract.departmentId)
    );
  }
}
