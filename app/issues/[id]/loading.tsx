import { Skeleton } from '@/components/ui/Skeleton';

const LoadingIssueDetailPage = () => {
	return (
		<div>
			<Skeleton className='w-[200px] h-[20px] rounded-full' />
			<div className='flex space-x-3 my-3'>
				<Skeleton className='w-[50px] h-[20px] rounded-full' />
				<Skeleton className='w-[100px] h-[20px] rounded-full' />
			</div>
			<div className='rounded-xl border bg-card text-card-foreground shadow p-4'>
				<Skeleton className='w-[200px] h-[40px] rounded-full' />
			</div>
		</div>
	);
};

export default LoadingIssueDetailPage;
