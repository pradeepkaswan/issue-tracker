import { Skeleton } from '@/components/ui/Skeleton';

const LoadingNewIssuePage = () => {
	return (
		<div className='max-w-xl'>
			<Skeleton className='w-[100px] h-[20px] rounded-full' />
		</div>
	);
};

export default LoadingNewIssuePage;
