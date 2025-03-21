'use client';

import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { set } from "zod";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter();

    return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Description>
        <AlertDialog.Content>
          <AlertDialog.Title className="m-0 text-[17px] font-medium text-mauve12">
            Are you absolutely sure?
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-5 mt-[15px] text-[15px]">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button disabled={isDeleting} color="red" onClick={async () => {
                try {
                    setIsDeleting(true);
                    await axios.delete(`/api/issues/${issueId}`)
                    router.push("/issues")
                } catch (error) {
                    setIsDeleting(false);
                    console.log(error)
                }
                ;
              }}>{isDeleting && <Spinner />} Delete</Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Description>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
