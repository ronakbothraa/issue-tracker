import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation';
import React from 'react'

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    function isNumeric(value: any) {
        return /^-?\d+$/.test(value);
    }

    if (!isNumeric(params.id)) {
        notFound()
    }

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id)}
    });

    if (!issue) {
        notFound()
    }
  return (
    <div>
        <p>{issue.title}</p>
        <p>{issue.description}</p>
        <p>{issue.status}</p>
        <p>{issue.createdAt.toDateString()}</p>
    </div>
  )
}

export default IssueDetailPage