
export type Recipient =
  | { type: "user"; id: number }
  | { type: "group"; id: number };
