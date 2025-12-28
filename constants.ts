import { ExperienceItem, AwardItem, ProjectItem } from './types';

export const RESEARCH_EXPERIENCE: ExperienceItem[] = [
  {
    title: 'Cooperative Multi-Agent Reinforcement Learning Benchmark in Doom',
    company: 'Honors Academy',
    period: 'Sep 2025 – Present',
    details: [
      'Working on high-throughput MARL benchmark suite focused on cooperative tasks for vision-based, egocentric, embodied learning.',
      // 'Developed a low-latency multithreaded sampling infrastructure and parallelized training worker architecture. Optimized simulation throughput to 11000+ FPS (RTX 2080Ti / AMD CPU).',
      // 'Developed procedural map generation algorithms for topologically complex multi-room environments, ensuring scalability and diversity.',
      // 'Designing reward function with curriculum learning to optimize convergence rates.',
      // 'Analyzing the degradation of coordination under partial observability and task complexity.'
    ]
  }
];

export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    title: 'University Teaching Assistant',
    company: 'Eindhoven University of Technology',
    period: 'Sep 2024 – Present',
    details: [
      'TA for courses: Programming, Programming for Applied Physics, Calculus, Data Challenge, Probability.',
      'Tutored students in courses I excelled at or that fell into my field of knowledge.',
      'Grading homework, helping students understand material, and clearing up doubts.'
    ]
  },
  {
    title: 'Project Manager & Web Developer',
    company: 'D.S.A. Pattern',
    period: 'Jun 2024 – Sep 2025',
    details: [
      'Designed and implemented dynamic content workflows in Django Wagtail.',
      'Built RESTful APIs and PostgreSQL schemas for data modelling.',
      'Automated deployment and CI/CD pipelines with GitHub Actions and Docker.',
      'Maintained backlog-driven feature development, handling 20+ tickets per sprint.'
    ]
  },
  {
    title: 'Web Developer',
    company: 'E.S.H.A. Trojan',
    period: 'Jul 2024 – Jul 2025',
    details: [
      'Migrated a legacy React site to Next.js.',
      'Implemented secure user authentication flows and role-based access control.',
      'Developed a React Native dashboard for mobile users, integrating with Node.js/MySQL backend.',
      'Coordinated with development team to iterate on UI/UX design/improvements.'
    ]
  },
  {
    title: 'Machine Learning Intern',
    company: 'Robotics & IoT Laboratory, VNU-HCMC',
    period: 'Jun 2022 – Oct 2022',
    details: [
      'Developed end-to-end few-shot voice cloning framework, evaluating Transfer Learning from English to Vietnamese.',
      'Optimized inference pipeline for concurrent requests via multi-threading and asynchronous processing.',
      'Deployed a web-based data collection platform to validate model robustness.'
    ]
  },
  {
    title: 'Data Engineer Intern',
    company: 'SFA division - Abbott Laboratories',
    period: 'Jun 2022 – Sep 2022',
    details: [
      'Developed Python/Flask ETL pipeline for automated data ingestion and model inference.',
      'Conducted comparative analysis of time-series forecasting (SARIMAX vs. baseline ML).',
      'Investigated impact of temporal seasonality on sales volume using exogenous regressors.',
      'Collaborated with SFE, BI divisions and international interns.'
    ]
  }
];

export const PROJECTS_DATA: ExperienceItem[] = [
  {
    title: 'Game Developer (Unity)',
    company: 'Personal & Team Projects',
    period: 'Sep 2024 – Mar 2025',
    details: [
      'Developed and shipped two Unity games: Ruka Rider (team of 6) and Slethered Onslaught (solo).',
      'Optimized rendering, AI NPC systems, and physics to maintain 60+ FPS on mid-range hardware.',
      'Modeled modular 2D/3D assets in Aseprite/Blender.',
      'Integrated custom physics behaviors (player controller, collision triggers, etc.).',
      'Used Agile sprints and Git for collaboration and testing.'
    ]
  },
  {
    title: 'Battery Swap Team',
    company: 'Aero Team Eindhoven',
    period: 'Sep 2023 – Sep 2024',
    details: [
      'Designed a lightweight mechanism to swap an 8kg battery in-flight.',
      'Integrated sensors (ToF, HAL) and control algorithms for precise alignment.',
      'Developed STM32 firmware for low-level system design and real-time constraints.'
    ]
  }
];

export const NON_RESEARCH_EXPERIENCE: ExperienceItem[] = [
  {
    title: 'Treasurer',
    company: 'Full-time Board Year',
    period: 'Sep 2024 – Sep 2025',
    details: [
      'Organized events for the association.',
      'Managed the finance of the association.'
    ]
  }
];


export const COOL_PROJECTS: ProjectItem[] = [
  {
    title: 'Homeless Predictor',
    description: "A 'Moneyball' approach to student housing. This browser extension analyzes housing probability using Z-scores and IQR outlier detection, helping users predict their chances of securing a spot for a place on Vestide.",
    tech: ['JavaScript', 'Statistics', 'Browser Extension'],
    link: 'https://github.com/lmBored/Homeless-predictor',
    repo: 'lmBored/Homeless-predictor'
  },
  {
    title: 'Tethered Onslaught',
    description: "Chaos, co-op, and high voltage. A top-down survival game where two players are physically linked by an electric tether. Coordination is key-use the tether to sheild, zap enemies, or accidentally drag your partner into doom.",
    tech: ['Unity', 'C#', 'Physics2D', 'GameDev'],
    link: 'https://github.com/lmBored/Tethered-Onslaught',
    repo: 'lmBored/Tethered-Onslaught'
  },
  {
    title: 'Wildlife Tracker',
    description: "Modernizing nature conservation. A mobile solution for forest rangers to track biodiversity, utilizing YOLOv11 for real-time species detection and GPS-based mapping to monitor population trends.",
    tech: ['React Native', 'FastAPI', 'YOLOv11', 'Firestore'],
    link: 'https://github.com/lmBored/Wildlife_tracker',
    repo: 'lmBored/Wildlife_tracker'
  },
  {
    title: 'Sujiko Assistant',
    description: "A smart assistant for Sujiko number puzzles. Features an interactive GUI to create, edit, and instantly solve complex grids using backtracking algorithms.",
    tech: ['Java', 'Algorithms', 'UI Design'],
    link: 'https://github.com/lmBored/puzzle_UI-Assistant',
    repo: 'lmBored/puzzle_UI-Assistant'
  },
  {
    title: 'mmb',
    description: "A 'Trust Me Bro' C++ code formatter. Born from frustration, it forces code into compliance. Simple, aggressive, and effective.",
    tech: ['C++', 'CLI', 'Tooling'],
    link: 'https://github.com/lmBored/mmb',
    repo: 'lmBored/mmb'
  }
];

export const AWARDS_DATA: AwardItem[] = [
  { year: '2024', rank: 'Rank 27/1128', title: 'University CTF' },
  { year: '2024', rank: 'Rank 11 worldwide', title: 'Advent of Code Day 19' },
  { year: '2022', title: 'Third Prize (DST Competition)' },
  { year: '2022', rank: 'Rank 19', title: 'Math Modeling Online Contest' }
];
