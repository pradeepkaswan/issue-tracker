'use client';

import dynamic from 'next/dynamic';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import Spinner from '@/components/ui/Spinner';

const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), {
	ssr: false,
});

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
	const router = useRouter();
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const form = useForm<IssueForm>({
		resolver: zodResolver(createIssueSchema),
	});

	const onSubmit = form.handleSubmit(async (data) => {
		try {
			setIsLoading(true);
			await axios.post('/api/issues', data);
			router.push('/issues');
		} catch (error) {
			setIsLoading(false);
			setError('An unexpected error occured.');
		}
	});

	return (
		<div className='max-w-xl'>
			{error && (
				<Alert
					variant='destructive'
					className='mb-5'
				>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}
			<Form {...form}>
				<form
					onSubmit={onSubmit}
					className=' space-y-3'
				>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input
										placeholder='title'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<SimpleMdeReact
										placeholder='description of the bug'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						disabled={isLoading}
						type='submit'
						className='gap-2'
					>
						Submit New Issue {isLoading && <Spinner />}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default NewIssuePage;
