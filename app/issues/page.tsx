import { Button, buttonVariants } from '@/components/ui/Button';
import prisma from '@/prisma/client';
import Link from 'next/link';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/Table';

import IssueStatusBadge from '@/components/IssueStatusBadge';
import IssueActions from './IssueActions';
import { cn } from '@/lib/utils';

const IssuesPage = async () => {
	const issues = await prisma.issue.findMany();

	return (
		<div>
			<IssueActions />
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='font-bold'>Issue</TableHead>
							<TableHead className='hidden md:table-cell'>Status</TableHead>
							<TableHead className='hidden md:table-cell'>Created</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{issues.map((issue) => (
							<TableRow key={issue.id}>
								<TableCell>
									<Link
										href={`/issues/${issue.id}`}
										className={cn(
											'hover:bg-transparent hover:underline',
											'justify-start',
										)}
									>
										{issue.title}
									</Link>
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
