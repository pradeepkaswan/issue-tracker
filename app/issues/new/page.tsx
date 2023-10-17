'use client';

import SimpleMdeReact from 'react-simplemde-editor';
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
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert';

interface IssueForm {
	title: string;
	description: string;
}

const NewIssuePage = () => {
	const router = useRouter();
	const [error, setError] = useState('');
	const form = useForm<IssueForm>();

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
					onSubmit={form.handleSubmit(async (data) => {
						try {
							await axios.post('/api/issues', data);
							router.push('/issues');
						} catch (error) {
							setError('An unexpected error occured.');
						}
					})}
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
					<Button type='submit'>Submit New Issue</Button>
				</form>
			</Form>
		</div>
	);
};

export default NewIssuePage;
