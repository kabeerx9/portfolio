'use client';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

interface Command {
	input: string;
	output: JSX.Element | string;
	timestamp: Date;
}

export default function Terminal() {
	const [history, setHistory] = useState<Command[]>([]);
	const [input, setInput] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const commands = {
		help: () => (
			<div className="space-y-1">
				<p>Available commands:</p>
				<p className="text-green-500">/about - View about section</p>
				<p className="text-green-500">/skills - List technical skills</p>
				<p className="text-green-500">/projects - Browse projects</p>
				<p className="text-green-500">/contact - Contact information</p>
				<p className="text-green-500">clear - Clear terminal</p>
				<p className="text-green-500">
					/view-project &lt;project-name&gt; - Detailed project view
				</p>
				<p className="text-green-500">
					/run-demo &lt;project-name&gt; - Launch live demos
				</p>
				<p className="text-green-500">/download-resume - Download your CV</p>
				<p className="text-green-500">/theme --dark/--light - Toggle theme</p>
				<p className="text-green-500">/history - View command history</p>
			</div>
		),
		about: () => (
			<div className="prose prose-invert">
				<h2>Kabeer Joshi</h2>
				<p>Frontend Developer specializing in React and Next.js</p>
			</div>
		),
		clear: () => {
			setHistory([]);
			return '';
		},
		'view-project': (projectName: string) => (
			<div className="prose prose-invert">
				<h2>Project: {projectName}</h2>
				<p>Details about the project...</p>
			</div>
		),
		'run-demo': (projectName: string) => (
			<div className="prose prose-invert">
				<h2>Running demo for: {projectName}</h2>
				<p>Launching live demo...</p>
			</div>
		),
		'download-resume': () => (
			<div className="prose prose-invert">
				<h2>Downloading Resume...</h2>
				<p>Your resume is being downloaded.</p>
			</div>
		),
		theme: (theme: string) => {
			if (theme === '--dark') {
				document.documentElement.classList.add('dark');
				return 'Switched to dark theme.';
			} else if (theme === '--light') {
				document.documentElement.classList.remove('dark');
				return 'Switched to light theme.';
			} else {
				return 'Invalid theme option. Use --dark or --light.';
			}
		},
		history: () => (
			<div className="prose prose-invert">
				<h2>Command History</h2>
				<ul>
					{history.map((cmd, i) => (
						<li key={i}>{cmd.input}</li>
					))}
				</ul>
			</div>
		),
		skills: () => (
			<div className="prose prose-invert">
				<h2>Technical Skills</h2>
				<ul>
					<li>Frontend: React, Next.js, TypeScript, Tailwind CSS</li>
					<li>Backend: Node.js, Express, MongoDB</li>
					<li>Tools: Git, Docker, VS Code</li>
					<li>Other: REST APIs, GraphQL, Responsive Design</li>
				</ul>
			</div>
		),
		projects: () => (
			<div className="prose prose-invert">
				<h2>Projects</h2>
				<ul>
					<li>Portfolio Website - Personal portfolio built with Next.js</li>
					<li>Project 2 - Description of project 2</li>
					<li>Project 3 - Description of project 3</li>
				</ul>
			</div>
		),
		contact: () => (
			<div className="prose prose-invert">
				<h2>Contact Information</h2>
				<p>Email: your.email@example.com</p>
				<p>GitHub: github.com/yourusername</p>
				<p>LinkedIn: linkedin.com/in/yourusername</p>
			</div>
		),
	};

	const handleCommand = (cmd: string) => {
		const [command, ...args] = cmd.toLowerCase().trim().split(' ');
		const output =
			commands[command as keyof typeof commands]?.(...args) ||
			'Command not found. Type "help" for available commands.';

		setHistory((prev) => [
			...prev,
			{
				input: cmd,
				output,
				timestamp: new Date(),
			},
		]);

		// scroll to the bottom
	};

	return (
		<div className="flex items-center w-full justify-center p-4">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="bg-black/90 text-green-500 p-4 rounded-lg font-mono text-sm h-[500px] overflow-auto w-full"
				onClick={() => inputRef.current?.focus()}>
				<div className="flex items-center gap-2 mb-4 border-b border-green-500/20 pb-2">
					<div className="w-3 h-3 rounded-full bg-red-500" />
					<div className="w-3 h-3 rounded-full bg-yellow-500" />
					<div className="w-3 h-3 rounded-full bg-green-500" />
					<span className="ml-2 text-xs">portfolio-cli</span>
				</div>

				<div className="space-y-2">
					{history.map((cmd, i) => (
						<div key={i} className="space-y-1">
							<div className="flex items-center gap-2">
								<span className="text-purple-500">→</span>
								<span>{cmd.input}</span>
							</div>
							<div className="pl-6">{cmd.output}</div>
						</div>
					))}
				</div>

				<div className="flex items-center gap-2 mt-4">
					<span className="text-purple-500">→</span>
					<input
						ref={inputRef}
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								handleCommand(input);
								setInput('');
							}
						}}
						className="bg-transparent focus:outline-none flex-1"
						autoFocus
					/>
				</div>
			</motion.div>
		</div>
	);
}
