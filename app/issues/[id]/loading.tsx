import { Flex, Card } from "@radix-ui/themes";
import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const loading = () => {
  return (
    <div>
      <Skeleton className="max-w-xl" />
      <Flex className="space-x-3" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="5rem" />
      </Flex>
      <Card className="prose" mt="6">
        <Skeleton count={3} />
      </Card>
    </div>
  );
};

export default loading;
