export const site = {
  name: "Sam Fiallos",
  title: "Sam Fiallos — Portfolio",
  description:
    "NYU Computer Science. Two Microsoft AI engineering internships. Systems, product interfaces, and shipped projects.",
  location: "New York, NY",
  email: "s.fiallos@nyu.edu",
  phone: "(516) 234-1433",
  links: {
    linkedin: "https://linkedin.com/in/sam-fiallos",
    github: "https://github.com/samthropic",
  },
};

export type Still = {
  src: string;
  alt: string;
  /** CSS object-position, e.g. "center top" */
  position?: string;
};

export type Experience = {
  company: string;
  role: string;
  location: string;
  dates: string;
  highlights: string[];
  stills?: Still[];
};

export const experience: Experience[] = [
  {
    company: "Microsoft",
    role: "SWE Intern, Commercial Engineering & AI",
    location: "Redmond, WA",
    dates: "May 2026 – Aug 2026",
    highlights: [
      "Launched a secure AI Workspace admin portal in React and TypeScript, cutting multi-hour workflows by over 90%.",
      "Built a C# .NET authorization system that validates identity against Microsoft ServiceTree via Azure Kusto.",
      "Shipped a Cosmos DB–backed MCP server registry for creating and managing AI tool connections end to end.",
      "Delivered a self-service slash-command platform for instant access to critical business data.",
    ],
    stills: [
      {
        src: "/stills/msft-swe-01.jpg",
        alt: "Sam at the Microsoft campus sign in Redmond",
      },
      {
        src: "/stills/msft-swe-02.jpg",
        alt: "Sam during Microsoft SWE internship summer 2026",
      },
      {
        src: "/stills/msft-swe-03.jpg",
        alt: "Microsoft internship still from summer wrap post",
      },
      {
        src: "/stills/msft-swe-04.jpg",
        alt: "Sam with Microsoft internship teammates",
      },
    ],
  },
  {
    company: "Microsoft",
    role: "Explorer Intern, AI Transformations",
    location: "Redmond, WA",
    dates: "May 2025 – Aug 2025",
    highlights: [
      "Launched a centralized dashboard and preferences platform that saved users about 52 minutes per week.",
      "Built a responsive React and TypeScript frontend with Redux Toolkit.",
      "Developed C# .NET APIs with Cosmos DB–backed preference syncing.",
      "Implemented AI-powered personalization across users, accounts, and tenants — helping unblock roughly $133M in blocked tasks.",
    ],
    stills: [
      {
        src: "/stills/msft-explore-01.jpg",
        alt: "Sam during Microsoft Explorer internship summer 2025",
        position: "center 28%",
      },
      {
        src: "/stills/msft-explore-02.jpg",
        alt: "Explorer internship moment in Redmond",
      },
      {
        src: "/stills/msft-explore-03.jpg",
        alt: "Microsoft Explorer internship campus still",
      },
      {
        src: "/stills/msft-explore-04.jpg",
        alt: "Sam with Explorer internship cohort",
      },
    ],
  },
  {
    company: "New York University",
    role: "Course Assistant, Introduction to Programming",
    location: "New York, NY",
    dates: "Sep 2024 – Present",
    highlights: [
      "Selected as 1 of 6 assistants from 120+ applicants for CS-1114.",
      "Run weekly office hours and labs for 20+ students, reinforcing Python fundamentals, debugging, and exam prep.",
    ],
  },
];

export type Project = {
  title: string;
  logline: string;
  detail: string;
  stack: string[];
  href?: string;
  stills?: Still[];
};

export const projects: Project[] = [
  {
    title: "OweNone",
    logline: "Group IOUs, fewer transfers.",
    detail:
      "Settlement app with a Go and PostgreSQL backend for live transactions, a debt-graph compression engine that minimizes transfers, and a Next.js frontend for graph visualization and expense tracking.",
    stack: ["TypeScript", "Go", "React", "Next.js", "PostgreSQL"],
    href: "https://owe-none-sooty.vercel.app/",
  },
  {
    title: "Microsoft Step",
    logline: "Social walking with an AI coach.",
    detail:
      "Hackathon app with GPS-verified walks, live navigation, leaderboards, and tiered rewards. Cerebras-powered coaching on a Go and SQLite backend, React on the client, Azure VPS hosting.",
    stack: ["React", "Go", "Azure", "SQLite", "Cerebras"],
    href: "https://microsoft-step.vercel.app/",
  },
  {
    title: "Ares",
    logline: "Canary delivery that watches itself.",
    detail:
      "Kubernetes platform that automates canary releases, scores real-time service health, and rolls back regressions. Go operator plus a Linux eBPF agent for telemetry, with a React and TypeScript view of rollout status.",
    stack: ["Kubernetes", "Go", "eBPF", "React", "TypeScript"],
  },
  {
    title: "Procrastination Manager",
    logline: "Syllabus in, calendar out.",
    detail:
      "Parses syllabus PDFs with Multer, uses the OpenAI API to extract assignments, and syncs generated tasks to Google Calendar through a Node and Express backend.",
    stack: ["Node.js", "Express", "OpenAI", "Google Calendar"],
  },
  {
    title: "Care Cuff",
    logline: "Child monitoring on a wrist budget.",
    detail:
      "Low-cost wristwatch prototype with embedded C++ on Arduino, multiple sensors, and a companion site for monitoring.",
    stack: ["C++", "Arduino", "HTML", "CSS"],
  },
];

export const education = {
  school: "New York University, Tandon School of Engineering",
  degree: "B.S. Computer Science",
  location: "Brooklyn, NY",
  grad: "Expected May 2027",
  coursework: [
    "Algorithms",
    "Artificial Intelligence",
    "Computer Networking",
    "Operating Systems",
    "Computer Architecture",
    "Agile Development & DevOps",
    "Open Source & Professional Development",
  ],
};

export type StudyAbroad = {
  heading: string;
  terms: { place: string; term: string }[];
  note: string;
  stills: Still[];
};

export const studyAbroad: StudyAbroad = {
  heading: "Study Abroad",
  terms: [
    { place: "NYU London", term: "Spring 2025" },
    { place: "NYU Paris", term: "Spring 2026" },
  ],
  note: "I spent two semesters studying abroad in London and Paris, getting to explore new places, meet people from all over, and experience different cultures. It ended up being one of my favorite parts of college!",
  stills: [
    {
      src: "/stills/abroad-01.jpg",
      alt: "Looking out at the lit Eiffel Tower across the Seine at night",
    },
    {
      src: "/stills/abroad-03.jpg",
      alt: "On a balcony overlooking an oasis valley in traditional white and gold attire",
    },
    {
      src: "/stills/abroad-02.jpg",
      alt: "Sitting in a snowy mountain field near a distant campfire at dusk",
    },
  ],
};

export const skills = {
  languages: ["Python", "Go", "TypeScript", "JavaScript", "C++", "C#", "SQL"],
  frameworks: [
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    ".NET",
    "Redux Toolkit",
  ],
  systems: [
    "Git",
    "Kubernetes",
    "Docker",
    "Linux",
    "eBPF",
    "PostgreSQL",
    "Cosmos DB",
    "Azure",
  ],
};

export type LeadershipRole = {
  title: string;
  org: string;
  stills?: Still[];
};

export const leadership: LeadershipRole[] = [
  {
    title: "Director of Events & Founding Member",
    org: "ColorStack at NYU",
  },
  {
    title: "Public Relations Chair",
    org: "Society of Hispanic Professional Engineers",
    stills: [
      {
        src: "/stills/shpe-04.png",
        alt: "Sam at SHPE National Convention holding the Honduras flag",
      },
      {
        src: "/stills/shpe-01.png",
        alt: "SHPE chapter at the 2023 National Convention with the FAMILIA sign",
      },
      {
        src: "/stills/shpe-02.png",
        alt: "SHPE members with Leading Hispanics in STEM banner by the waterfront",
      },
    ],
  },
];
