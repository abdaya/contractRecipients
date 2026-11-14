
import { test } from "node:test";
import assert from "node:assert/strict";

import { RecipientService } from "../services/RecipientService.js";
import type { Contract } from "../models/Contract.js";
import { users } from "../data/users.js";
import { groups } from "../data/groups.js";

const recipientService = new RecipientService();

// TC-09: Exclude users without Department View rights
test("TC-09: Exclude unauthorized recipients", () => {
  const contract: Contract = {
    id: 101,
    title: "Facilities Contract",
    departmentId: 1,
    contractManagerId: 1,
    endDate: "2026-12-31",
    renewalNoticeDays: 30,
    additionalRecipients: [
      { type: "user", id: 1 }, // Dana: authorized
      { type: "user", id: 2 }, // Sam: unauthorized
    ],
  };

  const recipients = recipientService.collectRecipients(contract);

  assert.deepEqual(
    recipients.map((user) => user.name),
    ["Dana"]
  );
});

// TC-17: Prevent duplicates between individual and group
test("TC-17: Avoid duplicate recipients", () => {
  const contract: Contract = {
    id: 102,
    title: "Facilities Contract",
    departmentId: 1,
    contractManagerId: 1,
    endDate: "2026-12-31",
    renewalNoticeDays: 30,
    additionalRecipients: [
      { type: "user", id: 1 },  // Dana individually
      { type: "group", id: 1 }, // Facilities group includes Dana
    ],
  };

  const collected = recipientService.collectRecipients(contract);
  const unique = recipientService.removeDuplicates(collected);

  const danaCount = unique.filter((user) => user.id === 1).length;

  assert.equal(danaCount, 1);
});

// TC-16: Exclude a user removed from a group before sending
test("TC-16: Use current group membership at send time", () => {
  const group = groups.find((group) => group.id === 1);
  assert.ok(group, "Facilities group must exist");

  const originalMemberIds = [...group.memberIds];

  const contract: Contract = {
    id: 103,
    title: "Facilities Contract",
    departmentId: 1,
    contractManagerId: 1,
    endDate: "2026-12-31",
    renewalNoticeDays: 30,
    additionalRecipients: [
      { type: "group", id: 1 },
    ],
  };

  try {
    // Simulate Dana being removed AFTER saving the contract.
    group.memberIds = group.memberIds.filter((id) => id !== 1);

    // Resolve recipients at send time.
    const recipients = recipientService.collectRecipients(contract);

    assert.equal(
      recipients.some((user) => user.id === 1),
      false
    );
  } finally {
    // Restore group data after the test.
    group.memberIds = originalMemberIds;
  }
});
