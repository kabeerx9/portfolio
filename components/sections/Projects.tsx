'use client';

import ProjectCard from '@/components/ui/ProjectCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { motion } from 'framer-motion';

const projects = [
	{
		title: 'Interactive Messaging Platform',
		description:
			'Real-time chat application with features like authentication, file sharing, and responsive design.',
		image: '/assets/interactive-messaging.png',
		technologies: ['Next JS', 'Clerk', 'Convex DB', 'Tailwind CSS'],
		liveUrl: 'https://interactive-messaging.vercel.app/',
		githubUrl: 'https://github.com/kabeerx9/chat-app',
	},
	{
		title: 'React Explorer',
		description:
			'A comprehensive React components library featuring dynamic form builders and internationalization.',
		image: '/assets/react-explorer.png',
		technologies: ['ReactJS', 'TypeScript', 'i18n', 'TanStack Query'],
		liveUrl: 'https://www.react-explorer.in/',
		githubUrl: 'https://github.com/kabeerx9/react-examples',
	},
	{
		title: 'CodeSync',
		description:
			'Real-time collaborative code editor with syntax highlighting and WebSocket integration.',
		image: '/assets/code-sync.png',
		technologies: ['ReactJS', 'WebSocket', 'CodeMirror', 'Node.js'],
		liveUrl: 'https://nalle-logggg.onrender.com/',
		githubUrl: 'https://github.com/kabeerx9/code-editor',
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
	},
};

export default function Projects() {
	return (
		<section className="py-24 px-4 max-w-6xl mx-auto" id="projects">
			<SectionHeader
				title="Featured Projects"
				subtitle="Some of my recent work"
			/>

			<motion.div
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
				{projects.map((project) => (
					<motion.div key={project.title} variants={itemVariants}>
						<ProjectCard {...project} />
					</motion.div>
				))}
			</motion.div>
		</section>
	);
}
