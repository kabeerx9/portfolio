import BackgroundAnimation from '@/components/ui/BackgroundAnimation';
import { cn } from '@/lib/utils';
import { Download, Github, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
	return (
		<section className="min-h-[90vh] flex flex-col items-center justify-center gap-8 px-4 relative">
			<BackgroundAnimation />

			{/* Profile Image */}
			<div className="relative w-32 h-32 rounded-full overflow-hidden ring-2 ring-zinc-200 dark:ring-zinc-800">
				<Image
					src="/public/assets/my-photo.jpg" // Add your image path here
					alt="Kabeer Joshi"
					fill
					className="object-cover"
					priority
				/>
			</div>

			{/* Main Content */}
			<div className="text-center space-y-4">
				<h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
					Kabeer Joshi
				</h1>
				<p className="text-lg text-zinc-600 dark:text-zinc-400">
					Frontend Developer | Problem Solver | Tech Enthusiast
				</p>
			</div>

			{/* CTA Buttons */}
			<div className="flex flex-wrap gap-4 justify-center">
				<Link
					href="/resume.pdf" // Add your resume path here
					className={cn(
						'flex items-center gap-2 px-6 py-3',
						'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900',
						'rounded-lg font-medium transition-colors',
						'hover:bg-zinc-700 dark:hover:bg-zinc-200'
					)}>
					<Download size={20} />
					Download Resume
				</Link>

				<div className="flex gap-4">
					<Link
						href="https://github.com/yourusername" // Add your GitHub profile
						className={cn(
							'p-3 rounded-lg transition-colors',
							'hover:bg-zinc-100 dark:hover:bg-zinc-800'
						)}>
						<Github size={24} />
					</Link>
					<Link
						href="mailto:your.email@example.com" // Add your email
						className={cn(
							'p-3 rounded-lg transition-colors',
							'hover:bg-zinc-100 dark:hover:bg-zinc-800'
						)}>
						<Mail size={24} />
					</Link>
				</div>
			</div>
		</section>
	);
}
