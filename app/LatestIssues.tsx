import { prisma } from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import React from "react";
import { IssueStatusBadge } from "./components";
import Link from "next/link";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });
  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>
      <Flex direction="column" gap="1">
        {issues.map((issue) => (
          <Card
            key={issue.id}
            className={
              issue.status === "OPEN"
                ? "bg-red-500"
                : issue.status === "CLOSED"
                ? "bg-green-500"
                : "bg-violet-500"
            }
          >
            <Flex gap="3" align="center">
              <Avatar
                size="3"
                src={issue.assignedToUser?.image!}
                radius="full"
                fallback="NA"
              />
              <Flex direction="column" align="start" gap="1">
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <IssueStatusBadge status={issue.status} />
              </Flex>
            </Flex>
          </Card>
        ))}
      </Flex>
      {/* <Flex justify="between">
                  <Flex align="start" direction="column" gap="3">
                    {issue.title}
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      src={issue.assignedToUser.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex> */}
    </Card>
  );
};

export default LatestIssues;
