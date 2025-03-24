"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  
  const router = useRouter();
  const [assignedUser, setAssignedUser] = useState(issue.assignedToUserID);

  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (error) return null;


  const handleUserAssign = async (userId: string) => {
    try {
      setAssignedUser(userId);
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserID: userId,
      });
      toast.success('User succesfully assigned!');
      if (issue.status === "OPEN") {
        await axios.patch(`/api/issues/${issue.id}`, {
          status: "IN_PROGRESS",
        });
      }
      router.push(`/issues/${issue.id}`);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Select.Root
      defaultValue={assignedUser || ""}
      onValueChange={handleUserAssign}
    >
      <Toaster />
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>suggestions</Select.Label>
          {isLoading && <Select.Item value="loading">Loading...</Select.Item>}
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.email}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
