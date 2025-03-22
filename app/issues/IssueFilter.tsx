'use client'

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In Progress", value: "IN_PROGRESS" },
];

const IssueFilter = () => {
    const router = useRouter();

  return (
    <Select.Root onValueChange={(status) => {
        const query = status && status !== 'ALL' ? `?status=${status}` : '';
        console.log("Client-side: Setting URL to:", `/issues${query}`);
        router.push(`/issues${query}`);

    }}>
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || 'ALL'}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueFilter;
