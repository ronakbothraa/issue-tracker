"use client";
import { User } from "@prisma/client";
import { Avatar, Flex, Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Island_Moments } from "next/font/google";
import React, { useEffect, useState } from "react";

const AssigneeSelect = () => {
  const {data: users, error, isLoading} = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get<User[]>("/api/users").then(res => res.data),
    staleTime: 60*1000,
    retry: 3
  })

  if (error) return null

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>suggestions</Select.Label>
          {isLoading && <Select.Item value="loading">Loading...</Select.Item>}
          {users?.map((user) => (
            // <Flex>
            //   <Avatar radius="full" size="2" src={user.image!} fallback="?" />
              <Select.Item key={user.id} value={user.id}>
                {user.email}
              </Select.Item>
            // </Flex>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
