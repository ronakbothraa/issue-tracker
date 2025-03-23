import { Table } from "@radix-ui/themes";
import Link from "next/link";
import NextLink from "next/link";
import React from "react";
import { IssueStatusBadge } from "../components";
import { Issue, Status } from "@prisma/client";
import { prisma } from "@/prisma/client";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  sortOrder?: "asc" | "desc";
  page: string;
}

const IssueTables = async ({
  searchParams,
}: {
  searchParams: Promise<IssueQuery>;
}) => {
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
  const statusFilter = {
    status: Object.values(Status).includes(status) ? status : undefined,
  };

  if (
    !SearchParams.orderBy ||
    !Object.values(prisma.issue.fields).map((field) => {
      if (field.name === SearchParams.orderBy) return true;
    })
  ) {
    SearchParams.orderBy = "createdAt";
  }
  if (
    !SearchParams.sortOrder ||
    !Object.values(["asc", "desc"]).includes(SearchParams.sortOrder)
  ) {
    SearchParams.sortOrder = "asc";
  }

  const page = parseInt(SearchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
      where: statusFilter,
      orderBy: {
        [SearchParams.orderBy]: SearchParams.sortOrder,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

  return (
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
                      SearchParams.sortOrder === "asc"
                        ? "desc"
                        : "asc",
                  },
                }}
              >
                {column.label}{" "}
                {column.value === SearchParams.orderBy &&
                  (SearchParams.sortOrder === "asc" ? "🔽" : "🔼")}
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
  );
};

export default IssueTables;
