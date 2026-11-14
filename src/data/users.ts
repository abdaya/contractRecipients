
import type { User } from "../models/User.js";

export const users: User[] = [
  {
    id: 1,
    name: "Dana",
    active: true,
    departmentViewRights: [1, 3]
  },
  {
    id: 2,
    name: "Sam",
    active: true,
    departmentViewRights: [2, 3, 5]
  },
  {
    id: 3,
    name: "Alex",
    active: true,
    departmentViewRights: [2]
  },
  {
    id: 4,
    name: "Abd",
    active: true,
    departmentViewRights: [7, 8]
  }
];
