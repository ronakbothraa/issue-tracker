"use client";

import { ErrorMessage, Spinner } from "@/app/components";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import {
  Badge,
  Box,
  Button,
  Callout,
  Card,
  Flex,
  RadioCards,
  Select,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          if (issue?.id) {
            console.log(data);
            try {
              setIsSubmitting(true);
              await axios.patch(`/api/issues/${issue?.id}`, data);
              router.push(`/issues/${issue.id}`);
            } catch (error) {
              console.log(error);
            }
          } else {
            try {
              setIsSubmitting(true);
              await axios.post("/api/issues", data);
              router.push("/issues");
              router.refresh();
            } catch (error) {
              setIsSubmitting(false);
              setError(`Something unexpected happened! ${error}`);
            }
          }
        })}
      >
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Controller
          name="status"
          control={control}
          defaultValue={issue?.status}
          render={({ field }) => (
            <Select.Root value={field.value} onValueChange={field.onChange}>
              <Select.Trigger placeholder="Update status" />
              <Select.Content>
                <Select.Item value="OPEN">OPEN</Select.Item>
                <Select.Item value="CLOSED">CLOSED</Select.Item>
                <Select.Item value="IN_PROGRESS">IN PROGRESS</Select.Item>
              </Select.Content>
            </Select.Root>
          )}
        />

        <Button disabled={isSubmitting}>
          {issue?.id ? (
            <>
              <Pencil2Icon /> Save Edit
            </>
          ) : (
            "Submit New Issue"
          )}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
