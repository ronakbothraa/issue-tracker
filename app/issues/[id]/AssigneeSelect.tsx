"use client";
import { User } from "@prisma/client";
import { Avatar, Flex, Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get<User[]>("/api/users");
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Users</Select.Label>
          {users.map((user) => (
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
