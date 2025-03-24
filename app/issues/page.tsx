import { prisma } from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import Pagination from "../components/Pagination";
import IssueActions from "./IssueActions";
import IssueTables, { IssueQuery } from "./IssueTables";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: Promise<IssueQuery>;
}) => {

  const SearchParams = await searchParams;
  const { status } = SearchParams;

  const statusFilter = {
    status: Object.values(Status).includes(status) ? status : undefined,
  };

  const page = parseInt(SearchParams.page) || 1;
  const pageSize = 10;

  const issueCount = await prisma.issue.count({ where: statusFilter });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <p>Total Count: {issueCount}</p>
      <IssueTables searchParams={searchParams}/>
        <Pagination
          itemCount={issueCount}
          pageSize={pageSize}
          currentPage={page}
        />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description:  'view all project issues'
}


export default IssuesPage;
