import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueFilter from "./IssueFilter";

const IssueActions = () => {
  return (
      <Flex justify="between">
        <IssueFilter />
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </Flex>
  );
};

export default IssueActions;
