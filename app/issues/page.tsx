import { Button } from '@/components/ui/Button';
import prisma from '@/prisma/client';
import Link from 'next/link';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/Table';
import delay from 'delay';
import IssueStatusBadge from '@/components/IssueStatusBadge';

const IssuesPage = async () => {
	const issues = await prisma.issue.findMany();

	return (
		<div>
			<div className='mb-5'>
				<Button>
					<Link href='/issues/new'>New Issue</Link>
				</Button>
			</div>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Issue</TableHead>
							<TableHead className='hidden md:table-cell'>Status</TableHead>
							<TableHead className='hidden md:table-cell'>Created</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{issues.map((issue) => (
							<TableRow key={issue.id}>
								<TableCell>
									{issue.title}
									<div className='block md:hidden'>
										<IssueStatusBadge status={issue.status} />
									</div>
								</TableCell>
								<TableCell className='hidden md:table-cell'>
									<IssueStatusBadge status={issue.status} />
								</TableCell>
								<TableCell className='hidden md:table-cell'>
									{issue.createdAt.toDateString()}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default IssuesPage;
