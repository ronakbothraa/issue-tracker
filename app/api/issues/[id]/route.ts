import { issueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { NEXT_QUERY_PARAM_PREFIX } from "next/dist/lib/constants";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid issue" }, { status: 400 });
  }
  const updatedIssue = await prisma.issue.update({
    where:{id: issue.id},
    data: {
        title:  body.title,
        description:  body.description,

    }
  })

  return NextResponse.json(updatedIssue);
}
