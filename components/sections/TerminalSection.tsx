import Terminal from '../cli/Terminal';
import SectionHeader from '../ui/SectionHeader';

export default function TerminalSection() {
	return (
		<section className="container mx-auto py-16" id="cli">
			<SectionHeader
				title="Terminal"
				subtitle="Get the details about me using the below cli commands"
			/>
			<Terminal />
		</section>
	);
}
