import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const IssuesPage = () => {
	return (
		<div>
			<Button>
				<Link href='/issues/new'>New Issue</Link>
			</Button>
		</div>
	);
};

export default IssuesPage;