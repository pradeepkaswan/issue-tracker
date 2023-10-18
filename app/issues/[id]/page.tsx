import IssueStatusBadge from '@/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

interface Props {
	params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(params.id) },
	});

	if (!issue) notFound();

	return (
		<div>
			<h1 className='scroll-m-20 text-4xl font-bold tracking-tight'>
				{issue.title}
			</h1>
			<div className='flex space-x-3 my-3'>
				<IssueStatusBadge status={issue.status} />
				<p>{issue.createdAt.toDateString()}</p>
			</div>
			<div className='rounded-xl border bg-card text-card-foreground shadow p-4'>
				<ReactMarkdown>{issue.description}</ReactMarkdown>
			</div>
		</div>
	);
};

export default IssueDetailPage;
