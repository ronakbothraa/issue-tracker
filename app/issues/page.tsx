import React from "react";
import { Table } from "@radix-ui/themes";
import { prisma } from "@/prisma/client";
import { Link, IssueStatusBadge } from "@/app/components";
import NextLink from "next/link";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";

interface Props {
  status: Status;
  orderBy: keyof Issue;
  sortOrder?: "asc" | "desc";
}

const IssuesPage = async ({ searchParams }: { searchParams: Promise<Props> }) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issues", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const SearchParams = await searchParams;
  const { status } = SearchParams;

  if (!SearchParams.orderBy) {
    SearchParams.orderBy = "createdAt";
  }
  const sortOrder = SearchParams.sortOrder || "asc";

  const issues = await prisma.issue.findMany({
    where: {
      status: Object.values(Status).includes(status) ? status : undefined,
    },
    orderBy: {
      [SearchParams.orderBy]: sortOrder,
    },
  });
  
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.label}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: {
                      ...SearchParams,
                      orderBy: column.value,
                      sortOrder:
                        SearchParams.orderBy === column.value &&
                        sortOrder === "asc"
                          ? "desc"
                          : "asc",
                    },
                  }}
                >
                  {column.label}{" "}
                  {column.value === SearchParams.orderBy &&
                    (sortOrder === "asc" ? "🔽" : "🔼")}
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="text-xs block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
