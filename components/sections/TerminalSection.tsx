import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import Terminal from '../cli/Terminal';

export default function TerminalSection() {
  return (
    <section className="container py-16 sm:py-24">
      <SectionHeader
        title="CLI Interface"
        subtitle="Experience portfolio in terminal style"
      />
      
      <div className="mt-8 flex justify-center">
        <Terminal />
      </div>
    </section>
  );
}