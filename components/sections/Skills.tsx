'use client';

import SectionHeader from '@/components/ui/SectionHeader';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Code2, Laptop, Server, Smartphone } from 'lucide-react';

const skillCategories = [
	{
		title: 'Frontend Development',
		icon: <Laptop className="w-6 h-6" />,
		skills: [
			{
				name: 'React & Next.js',
				description: 'Building modern, server-side rendered applications',
				tags: ['React 18', 'Next.js 14', 'Server Components'],
			},
			{
				name: 'TypeScript',
				description: 'Type-safe development with advanced patterns',
				tags: ['TypeScript 5', 'Type Systems', 'Generics'],
			},
			{
				name: 'State Management',
				description: 'Complex state handling and data flow',
				tags: ['Redux', 'Zustand', 'React Query'],
			},
		],
	},
	{
		title: 'Mobile Development',
		icon: <Smartphone className="w-6 h-6" />,
		skills: [
			{
				name: 'React Native',
				description: 'Cross-platform mobile app development',
				tags: ['iOS', 'Android', 'Expo'],
			},
			{
				name: 'Native Features',
				description: 'Integration with device capabilities',
				tags: ['Camera', 'Location', 'Push Notifications'],
			},
		],
	},
	{
		title: 'Backend Development',
		icon: <Server className="w-6 h-6" />,
		skills: [
			{
				name: 'Node.js',
				description: 'Server-side JavaScript development',
				tags: ['Express', 'REST APIs', 'WebSocket'],
			},
			{
				name: 'Django',
				description: 'Python web framework for robust backends',
				tags: ['DRF', 'PostgreSQL', 'Authentication'],
			},
		],
	},
	{
		title: 'Development Tools',
		icon: <Code2 className="w-6 h-6" />,
		skills: [
			{
				name: 'Version Control',
				description: 'Code management and collaboration',
				tags: ['Git', 'GitHub', 'CI/CD'],
			},
			{
				name: 'Development Tools',
				description: 'Modern development workflow',
				tags: ['VS Code', 'Docker', 'Postman'],
			},
		],
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.1 },
	},
};

const itemVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
	},
};

export default function Skills() {
	return (
		<section className="py-24 px-4" id="skills">
			<div className="max-w-7xl mx-auto">
				<SectionHeader
					title="Skills & Expertise"
					subtitle="Technologies and tools I work with"
				/>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
					{skillCategories.map((category) => (
						<motion.div
							key={category.title}
							variants={itemVariants}
							className={cn(
								'p-6 rounded-xl',
								'bg-zinc-50 dark:bg-zinc-900/50',
								'border border-zinc-200 dark:border-zinc-800',
								'hover:border-zinc-300 dark:hover:border-zinc-700',
								'transition-all'
							)}>
							<div className="flex items-center gap-3 mb-6">
								<div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800">
									{category.icon}
								</div>
								<h3 className="text-xl font-semibold">{category.title}</h3>
							</div>

							<div className="space-y-6">
								{category.skills.map((skill) => (
									<div key={skill.name} className="space-y-3">
										<h4 className="font-medium">{skill.name}</h4>
										<p className="text-sm text-zinc-600 dark:text-zinc-400">
											{skill.description}
										</p>
										<div className="flex flex-wrap gap-2">
											{skill.tags.map((tag) => (
												<span
													key={tag}
													className="px-2 py-1 text-xs rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
													{tag}
												</span>
											))}
										</div>
									</div>
								))}
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
