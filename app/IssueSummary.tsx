import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  close: number;
  in_progress: number;
}

const IssueSummary = ({ open, close, in_progress }: Props) => {

  const containers: {
    label: string;
    value: number;
    status: Status;
    color: string;
  }[] = [
    { label: "Open Issues", value: open, status: "OPEN", color: "bg-red-600" },
    { label: "Closed Issues", value: close, status: "CLOSED", color: "bg-green-600" },
    {
      label: "In Progress Issues",
      value: in_progress,
      status: "IN_PROGRESS",
      color: "bg-violet-600",
    },
  ];

  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card className={`${container.color}`} key={container.label}>
          <Flex direction="column" gap="2">
            <Link
              className="text-sm font-medium"
              href={`/issues?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
