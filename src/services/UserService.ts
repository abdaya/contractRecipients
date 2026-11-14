
import type { User } from "../models/User.js";
import type { Group } from "../models/Group.js";
import { users } from "../data/users.js";
import { groups } from "../data/groups.js";

export class UserService {
  findUser(userId: number): User | undefined {
    return users.find((user) => user.id === userId);
  }

  findGroup(groupId: number): Group | undefined {
    return groups.find((group) => group.id === groupId);
  }
}
