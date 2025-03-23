import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const IssueStatusBadge = ({ status }: { status: Status }) => {
  const statusMap: Record<
    Status,
    { label: string; color: "red" | "violet" | "green" }
  > = {
    OPEN: { label: "Open", color: "red" },
    CLOSED: { label: "Closed", color: "green" },
    IN_PROGRESS: { label: "In Progress", color: "violet" },
  };
  return (
    <Badge color={statusMap[status].color} size="3">
      {statusMap[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
