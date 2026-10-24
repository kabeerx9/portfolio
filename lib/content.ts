import type { LucideIcon } from 'lucide-react';
import {
  AppWindow,
  Brain,
  GitCompareArrows,
  HeartPulse,
  Layers,
  MousePointerClick,
  Pill,
  Users,
} from 'lucide-react';

export const profile = {
  name: 'Kabeer Joshi',
  role: 'Mobile & backend engineer',
  location: 'Dehradun, India',
  intro:
    'I build mobile apps and the backends behind them. At a US fantasy sports startup I own the React Native app end to end and work across its backend services, from the Go realtime draft room to the Django API.',
  email: 'kabeer786joshi@gmail.com',
  github: 'https://github.com/kabeerx9',
  linkedin: 'https://www.linkedin.com/in/kabeer-joshi-7173061aa',
  stack: ['TypeScript', 'React Native', 'Expo', 'React', 'Go', 'Django', 'Node', 'Postgres', 'Redis', 'Swift'],
};

export interface Work {
  company: string;
  url?: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  links?: { label: string; href: string }[];
}

export const work: Work[] = [
  {
    company: 'Shotgun Fantasy',
    url: 'https://shotgunfantasysports.com',
    role: 'React Native & backend engineer',
    period: 'Jun 2025 – now',
    summary:
      'Fantasy sports app for a US startup, in active development. I own the Expo app end to end and build backend features in Go and Django.',
    highlights: [
      'Realtime snake draft: turn resolution and auto-pick in the app, versioned room state written atomically to Redis in the Go service',
      'Draft state that recovers cleanly on lossy mobile networks',
      'Private contests end to end: invite deep links in the app, preparation, settlement and refunds on the server',
      'Clerk session verification on draft routes and Ably token auth for mobile realtime',
      'Checkout status endpoint and wallet flows that only show balances the backend has confirmed',
      'Contest join cutoffs re-checked right before charging',
    ],
  },
  {
    company: 'Goreeva',
    role: 'Frontend engineer',
    period: 'May 2023 – May 2025',
    summary:
      'School platform for students, teachers and parents. I delivered the frontend across three mobile apps and a multi-tenant React dashboard, and still ship the occasional fix.',
    highlights: [
      'Printable report cards with variable grading schemes and bulk assessment editing',
      'Role-dependent navigation across student, teacher and parent apps',
      'Shared auth, token refresh and API error handling behind one boundary',
      'Push notifications and localization',
    ],
    links: [
      { label: 'Student app', href: 'https://apps.apple.com/in/app/goreeva/id6468810844' },
      { label: 'Teacher app', href: 'https://apps.apple.com/in/app/goreeva-teacher/id6477329536' },
    ],
  },
];

export interface Project {
  name: string;
  description: string;
  tech: string[];
  repo: string;
  live?: string;
  icon: LucideIcon;
}

export const projects: Project[] = [
  {
    name: 'Caretalk',
    description:
      'Health memory you talk to. Plain-language updates become dated facts, with an MCP server so Claude can read and write them.',
    tech: ['TypeScript', 'MCP', 'Postgres'],
    repo: 'https://github.com/kabeerx9/MediMemory',
    live: 'https://caretalk-web.vercel.app',
    icon: HeartPulse,
  },
  {
    name: 'LinkWheel',
    description:
      'A macOS default browser that opens a radial menu at the cursor so every link lands in the right Dia profile.',
    tech: ['Swift', 'AppKit'],
    repo: 'https://github.com/kabeerx9/linkwheel',
    icon: MousePointerClick,
  },
  {
    name: 'Throughline',
    description:
      'Agent skill that turns a git change into a two-pane reader: full diff on the left, the reasoning, diagrams and a quiz on the right.',
    tech: ['Agent skill', 'HTML'],
    repo: 'https://github.com/kabeerx9/throughline',
    icon: GitCompareArrows,
  },
  {
    name: 'think-first',
    description:
      'Agent skill that makes you answer each design decision first. The agent seals its own approach, then compares and merges.',
    tech: ['Agent skill'],
    repo: 'https://github.com/kabeerx9/think-first',
    icon: Brain,
  },
  {
    name: 'Decio',
    description:
      'People-first city network: profiles, connections, city posts and direct chat.',
    tech: ['Expo', 'Go', 'Postgres', 'Ably'],
    repo: 'https://github.com/kabeerx9/decio',
    icon: Users,
  },
  {
    name: 'Tattvix',
    description:
      'Polyglot monorepo where a React web app, an Expo app and a Django API share typed contracts and validated env config.',
    tech: ['React', 'Expo', 'Django'],
    repo: 'https://github.com/kabeerx9/Tattvix',
    icon: Layers,
  },
  {
    name: 'Project Sessions',
    description:
      'Native macOS app that restores a dev workspace in one action: browser profile, folder, editor and terminal processes.',
    tech: ['Swift', 'SwiftUI'],
    repo: 'https://github.com/kabeerx9/Project-Sessions',
    icon: AppWindow,
  },
  {
    name: 'Cancer Compass',
    description:
      'Chemotherapy companion: an Expo app and React dashboard on an Express/Prisma API, sharing one typed contract package.',
    tech: ['Expo', 'React', 'Prisma'],
    repo: 'https://github.com/kabeerx9/Cancer-Compass',
    icon: Pill,
  },
];
