export interface NavLink {
  id: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export const PROFILE = {
  name: 'Harsh Yadav',
  shortName: 'HY',
  title: 'Aspiring IT & Network Engineer',
  location: 'Noida, Delhi NCR, India',
  status: 'Open to Entry-Level Opportunities',
  email: 'harshyadav87k@gmail.com',
  phone: '+91 8707460803',
  linkedin: 'https://www.linkedin.com/in/harshkumaryadav/',
  github: 'https://github.com/Harsh87250',
  degree: 'B.Tech – Computer Science and Business Systems (CSBS)',
  college: 'Oriental Institute of Science and Technology',
  collegeLocation: 'Bhopal, Madhya Pradesh, India',
  resumeUrl: '/Harsh-Kumar-Yadav-Resume.pdf',
};

export interface SkillGroup {
  category: string;
  icon: string;
  skills: { name: string; level: 'Foundational' | 'Learning' | 'Working Knowledge' }[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Networking',
    icon: 'Network',
    skills: [
      { name: 'Networking Fundamentals', level: 'Learning' },
      { name: 'TCP/IP', level: 'Learning' },
      { name: 'IPv4 & IPv6', level: 'Foundational' },
      { name: 'DNS', level: 'Foundational' },
      { name: 'DHCP', level: 'Foundational' },
      { name: 'LAN, MAN & WAN', level: 'Foundational' },
      { name: 'OSI Model', level: 'Learning' },
      { name: 'Router & Switch Fundamentals', level: 'Foundational' },
    ],
  },
  {
    category: 'IT Support',
    icon: 'Wrench',
    skills: [
      { name: 'Windows Troubleshooting', level: 'Working Knowledge' },
      { name: 'Hardware & Software Basics', level: 'Working Knowledge' },
      { name: 'IP Configuration', level: 'Learning' },
      { name: 'Network Connectivity Troubleshooting', level: 'Learning' },
    ],
  },
  {
    category: 'Programming',
    icon: 'Code',
    skills: [
      { name: 'Python', level: 'Learning' },
      { name: 'HTML', level: 'Working Knowledge' },
      { name: 'CSS', level: 'Working Knowledge' },
      { name: 'JavaScript', level: 'Learning' },
    ],
  },
  {
    category: 'Database',
    icon: 'Database',
    skills: [
      { name: 'SQL', level: 'Learning' },
      { name: 'MySQL', level: 'Learning' },
    ],
  },
  {
    category: 'Data Analytics',
    icon: 'BarChart3',
    skills: [
      { name: 'Microsoft Excel', level: 'Working Knowledge' },
      { name: 'Power BI', level: 'Learning' },
      { name: 'Data Cleaning', level: 'Learning' },
      { name: 'Data Visualization', level: 'Learning' },
    ],
  },
  {
    category: 'Tools',
    icon: 'Wrench',
    skills: [
      { name: 'Git', level: 'Learning' },
      { name: 'GitHub', level: 'Learning' },
      { name: 'MySQL Workbench', level: 'Foundational' },
      { name: 'VS Code', level: 'Working Knowledge' },
    ],
  },
];

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  icon: string;
  tag: string;
  gradient: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'Job Market Intelligence & Skill Demand Analytics Platform',
    description:
      'A data analytics project designed to analyse job market trends, in-demand technical skills, company hiring patterns, job locations and salary information.',
    technologies: ['Python', 'MySQL', 'Power BI', 'Data Cleaning', 'Data Analysis'],
    github: 'https://github.com/Harsh87250/job-market-intelligence-analysis',
    icon: 'TrendingUp',
    tag: 'Data Analytics',
    gradient: 'from-neon-blue to-neon-cyan',
  },
  {
    title: 'Network Troubleshooting Practice Lab',
    description:
      'A learning-focused networking practice project covering basic network diagnostics, IP configuration, connectivity troubleshooting, DNS and DHCP fundamentals.',
    technologies: ['TCP/IP', 'DNS', 'DHCP', 'Windows Networking Commands', 'ipconfig'],
    icon: 'Network',
    tag: 'Learning Project',
    gradient: 'from-neon-cyan to-neon-purple',
  },
  {
    title: 'Personal Portfolio Website',
    description:
      'An interactive personal portfolio website designed to showcase technical skills, projects, education and career interests using modern frontend technologies and animations.',
    technologies: ['React', 'JavaScript', 'Three.js', 'Framer Motion', 'CSS'],
    github: 'https://github.com/Harsh87250',
    icon: 'Globe',
    tag: 'Frontend',
    gradient: 'from-neon-purple to-neon-blue',
  },
];

export const CAREER_INTERESTS = [
  'Network Engineering',
  'IT Infrastructure',
  'NOC Operations',
  'IT Support',
  'Technical Troubleshooting',
  'IT Project Coordination',
];
