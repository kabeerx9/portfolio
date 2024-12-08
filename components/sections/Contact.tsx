'use client';

import SectionHeader from '@/components/ui/SectionHeader';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Mail, Phone, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const contactFormSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Please enter a valid email address'),
	message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const contactInfo = [
	{
		icon: <Mail className="w-5 h-5" />,
		label: 'Email',
		value: 'kabeerjoshi@gmail.com',
		href: 'mailto:kabeerjoshi@gmail.com',
	},
	{
		icon: <Phone className="w-5 h-5" />,
		label: 'Phone',
		value: '+91 9412120120',
		href: 'tel:+919412120120',
	},
];

export default function Contact() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactFormSchema),
	});

	const onSubmit = async (data: ContactFormData) => {
		try {
			console.log(data);
			// Here you would typically send the form data to your backend
			// For now, we'll just simulate a delay
			await new Promise((resolve) => setTimeout(resolve, 1000));

			toast.success('Message sent successfully!');
			reset();
		} catch (error) {
			console.error(error);
			toast.error('Failed to send message. Please try again.');
		}
	};

	return (
		<section className="py-24 px-4 max-w-6xl mx-auto" id="contact">
			<SectionHeader
				title="Get in Touch"
				subtitle="Have a question or want to work together?"
			/>

			<div className="mt-16 grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-12">
				{/* Contact Info */}
				<div className="space-y-6">
					{contactInfo.map((item) => (
						<motion.a
							key={item.label}
							href={item.href}
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							whileHover={{ x: 5 }}
							className={cn(
								'flex items-center gap-4 p-4',
								'rounded-lg bg-zinc-50 dark:bg-zinc-900/50',
								'border border-zinc-200 dark:border-zinc-800',
								'hover:border-zinc-300 dark:hover:border-zinc-700',
								'transition-colors'
							)}>
							<div className="text-zinc-600 dark:text-zinc-400">
								{item.icon}
							</div>
							<div>
								<p className="text-sm text-zinc-600 dark:text-zinc-400">
									{item.label}
								</p>
								<p className="font-medium">{item.value}</p>
							</div>
						</motion.a>
					))}
				</div>

				{/* Contact Form */}
				<motion.form
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-6">
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
							Name
						</label>
						<input
							{...register('name')}
							type="text"
							className={cn(
								'w-full px-4 py-2 rounded-lg',
								'bg-zinc-50 dark:bg-zinc-900/50',
								'border border-zinc-200 dark:border-zinc-800',
								'focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700',
								'transition-colors'
							)}
						/>
						{errors.name && (
							<p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
						)}
					</div>

					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
							Email
						</label>
						<input
							{...register('email')}
							type="email"
							className={cn(
								'w-full px-4 py-2 rounded-lg',
								'bg-zinc-50 dark:bg-zinc-900/50',
								'border border-zinc-200 dark:border-zinc-800',
								'focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700',
								'transition-colors'
							)}
						/>
						{errors.email && (
							<p className="mt-1 text-sm text-red-500">
								{errors.email.message}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor="message"
							className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
							Message
						</label>
						<textarea
							{...register('message')}
							rows={5}
							className={cn(
								'w-full px-4 py-2 rounded-lg',
								'bg-zinc-50 dark:bg-zinc-900/50',
								'border border-zinc-200 dark:border-zinc-800',
								'focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700',
								'transition-colors'
							)}
						/>
						{errors.message && (
							<p className="mt-1 text-sm text-red-500">
								{errors.message.message}
							</p>
						)}
					</div>

					<motion.button
						type="submit"
						disabled={isSubmitting}
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className={cn(
							'flex items-center justify-center gap-2',
							'w-full md:w-auto px-8 py-3 rounded-lg',
							'bg-zinc-900 dark:bg-zinc-50',
							'text-zinc-50 dark:text-zinc-900',
							'hover:bg-zinc-800 dark:hover:bg-zinc-200',
							'disabled:opacity-50 disabled:cursor-not-allowed',
							'transition-colors'
						)}>
						<Send className="w-4 h-4" />
						{isSubmitting ? 'Sending...' : 'Send Message'}
					</motion.button>
				</motion.form>
			</div>
		</section>
	);
}
