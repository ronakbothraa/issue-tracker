'use client'

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In Progress", value: "IN_PROGRESS" },
];

const IssueFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
  return (
    <Select.Root defaultValue={searchParams.get('status') || 'ALL'} onValueChange={(status) => {
        const params = new URLSearchParams()
        if (status !== 'ALL') params.append('status', status)
        if (searchParams.get('orderBy')) 
            params.append('orderBy', searchParams.get('orderBy')!)
        const query = params.size ? `?${params.toString()}` : '';
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
