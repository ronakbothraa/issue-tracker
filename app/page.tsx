import { prisma } from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const close = await prisma.issue.count({ where: { status: "CLOSED" } });
  const in_progress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }}>
      <Flex direction="column" gap="4">
        <IssueSummary open={open} in_progress={close} close={in_progress} />
        <LatestIssues />
      </Flex>
    </Grid>
  );
}

 