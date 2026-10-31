// Copy is authoritative from the design source (docs/handoff/design-source). Do not reword facts.
export type Fact = { label: string; value: string; href?: string };
export type Stat = { big: string; label: string };
export type Section = { h: string; paras?: string[]; list?: string[]; chips?: string[]; note?: string };
export type Asset = {
  src: string;          // path under /public
  alt: string;
  caption: string;
  rot: string;
  kind?: 'image' | 'video' | 'pixel';
  poster?: string;
  webm?: string;
};
export type CasePage = {
  slug: string;
  activeTab: 'Work' | 'Projects' | 'About';
  memo: string;
  footer: string;
  backHref: string;
  backLabel: string;
  kicker: string;
  title: string;
  docTitle: string;
  description: string;
  subtitle: string;
  lede: string;
  heroNote: string;
  stack?: string;
  facts: Fact[];
  stats: Stat[];
  sections: Section[];
  assets: Asset[];
  next?: { href: string; kicker: string; label: string };
  titleDesk?: number;
};

export const siteTabs = (active: string) => [
  { label: 'Home', href: '/', current: false },
  { label: 'Work', href: '/#work', current: active === 'Work' },
  { label: 'Projects', href: '/projects/', current: active === 'Projects' },
  { label: 'About', href: '/about/', current: active === 'About' },
];

// Phone title size from the design: fit to width, at most 60px.
export const phoneTitle = (title: string) => Math.min(60, Math.floor(330 / (title.length * 0.63)));

export const maintenance: CasePage = {
  slug: 'maintenance-log',
  activeTab: 'Work',
  memo: '06', footer: 'Maintenance Logging System',
  backHref: '/#work', backLabel: 'All work',
  kicker: 'CASE STUDY 02 · AKTAN MISR · AUG 2026 → NOW',
  title: 'Factory log',
  docTitle: 'Maintenance Logging System, case study · Ayman Osama Hassan',
  description: 'A breakdown logging system for a textile factory: 100 machines, 17 technicians, summaries by department and machine.',
  subtitle: 'Maintenance Logging System: breakdowns off paper, for 100 machines.',
  lede: 'The factory tracked machine breakdowns on paper. I designed and rolled out a logging system for 100 machines and 17 technicians, with summaries that show where the downtime goes.',
  heroNote: 'used on a real\nfactory floor',
  stack: 'Google Sheets (data) · Google Apps Script (input forms and summaries) · built with Claude Code',
  next: { href: '/work/opengl-game/', kicker: 'Next case study', label: '2-Player OpenGL Game' },
  facts: [
    { label: 'My role', value: 'Designed it, directed the build, rolled it out' },
    { label: 'Users', value: '17 technicians and the production manager; top management has access' },
    { label: 'Scale', value: '100 machines' },
    { label: 'Status', value: 'In trial, alongside the paper logs' },
  ],
  stats: [],
  sections: [
    { h: 'The problem', paras: ['With breakdowns on paper, there was no easy way to see which machines broke down most, how long repairs took, or how much downtime each department lost.'], note: 'paper cannot tell you\nwhich machine fails most' },
    { h: 'What I built', paras: ['A shared log where every breakdown is one entry. The system builds summaries by department and by machine. Each entry records:'], chips: ['Breakdown type', 'Machine', 'Technician', 'Downtime', 'Repair time', 'Parts replaced', 'Open / closed'], note: 'one entry per breakdown' },
    { h: 'Why Google Sheets', paras: ['It is free, and the team already knew spreadsheets. I tried Microsoft’s free tier first and it did not fit. I designed the system and directed the build; the code was written with Claude Code.'], note: 'tried Microsoft first:\nit did not fit' },
    { h: 'Rolling it out', paras: ['The paper logs are still running alongside it during the trial period. I did not want to remove the old system before the new one had proven itself, because that change is hard to undo on a factory floor.'], note: 'paper logs kept\nrunning in parallel' },
    { h: 'Related: choosing an ERP', paras: ['I also advise management on choosing an ERP. I reviewed three vendor proposals, asked vendors how they handle customizations, factory-specific workflows and on-premise hosting, and explained the difference between Odoo and ERPNext, including Odoo’s licensing. No decision has been made yet.'], note: '3 vendor proposals\nreviewed' },
  ],
  // Shown only once the file exists in public/ (the build never ships an empty slot).
  assets: [
    { src: '/img/maintenance-summary.webp', alt: 'The maintenance summary page: downtime and breakdowns by department', caption: 'Summary by department', rot: '1deg' },
  ],
};

export const game: CasePage = {
  slug: 'opengl-game',
  activeTab: 'Work',
  memo: '07', footer: '2-Player OpenGL Game',
  backHref: '/#work', backLabel: 'All work',
  kicker: 'CASE STUDY 03 · COMPUTER GRAPHICS COURSE · TEAM PROJECT',
  title: 'Two players',
  docTitle: '2-Player OpenGL Game, case study · Ayman Osama Hassan',
  description: 'A two-player platformer written without a game engine: collisions, physics, input, sprite animation and a state machine in Python and PyOpenGL.',
  subtitle: '2-Player OpenGL Game: game logic with no engine underneath.',
  lede: 'A two-player platform game built for a computer-graphics course. We wrote the game logic ourselves instead of using a game engine, with PyOpenGL for rendering and Pygame used only to load assets. I wrote most of it.',
  heroNote: 'no engine,\njust math and Python',
  stack: 'Python · PyOpenGL · Pygame (asset loading only)',
  next: { href: '/work/t-racers/', kicker: 'Next case study', label: 'T-Racers Formula Student' },
  facts: [
    { label: 'Context', value: 'Computer graphics course, team project' },
    { label: 'My part', value: 'Most of the code' },
    { label: 'Status', value: 'Unfinished, as the repo says' },
    { label: 'Code', value: 'Repo on GitHub', href: 'https://github.com/AymanOHM/project_gg' },
  ],
  stats: [],
  sections: [
    { h: 'What I wrote from scratch', paras: ['Everything a game engine would normally hand you:'], list: ['Collision detection', 'Physics-based movement: landing, wall jumps and friction', 'Input handling for two players', 'Sprite animation', 'A game-state machine'], note: 'landing, wall jumps,\nfriction: all by hand' },
    { h: 'Why it is here', paras: ['The game is unfinished. I am including it because the logic layer is the interesting part: the physics, the collisions and the state machine all had to work without an engine doing the hard parts.'], note: 'the logic layer\nis the point' },
  ],
  assets: [
    { src: '/img/game.mp4', webm: '/img/game.webm', poster: '/img/game-poster.webp', kind: 'video', alt: 'Gameplay: two players on a pixel-art level of floating platforms', caption: 'Gameplay: two players on screen', rot: '-1.2deg' },
    { src: '/img/game-sprite.gif', kind: 'pixel', alt: 'An animated pixel-art player sprite with a red headband', caption: 'A player sprite', rot: '1deg' },
  ],
};

export const racing: CasePage = {
  slug: 't-racers',
  activeTab: 'Work',
  memo: '08', footer: 'T-Racers Formula Student',
  backHref: '/#work', backLabel: 'All work',
  kicker: 'CASE STUDY 04 · ELECTRICAL SYSTEMS · FEB 2024 → JUL 2026',
  title: 'T-Racers',
  docTitle: 'T-Racers Formula Student, case study · Ayman Osama Hassan',
  description: 'Electrical systems for a concept-class Formula Student car: ECU and sensor selection, pinout and documentation. 1st in Concept Class at Silverstone 2026.',
  subtitle: 'Formula Student: the electrical side of a concept-class race car.',
  lede: 'T-Racers is a ~63-member student team that competed in IMechE Formula Student 2026 at Silverstone Circuit, UK, from 15 to 19 July 2026. We entered the Concept Class, which judges the design of a car on paper. I worked on the electrical systems: the ECU and the sensors.',
  heroNote: 'Silverstone,\nJuly 2026',
  stack: 'Haltech Nexus R3 ECU · O2, position and engine sensors · pinout · 2D wiring · documentation',
  next: { href: '/projects/', kicker: 'More work', label: 'Other projects' },
  facts: [
    { label: 'My role', value: 'Electrical systems: ECU and sensors' },
    { label: 'Team', value: '~63 members' },
    { label: 'Team site', value: 'tracersmec.com', href: 'https://www.tracersmec.com/' },
    { label: 'Competition', value: 'IMechE Formula Student', href: 'https://www.imeche.org/events/formula-student/about-formula-student' },
  ],
  stats: [
    { big: '1st', label: 'Concept Class' },
    { big: '1st', label: 'Project Management, overall' },
    { big: '3rd', label: 'Overall' },
    { big: '3rd', label: 'Business Plan' },
  ],
  sections: [
    { h: 'My work', list: ['Selected the ECU (Haltech Nexus R3) and the sensor suite (O2, position and engine sensors) from supplier catalogs.', 'Produced the ECU pinout and connection plan.', 'Contributed to the 2D wiring diagrams.', 'Wrote the electrical-system documentation.', 'Prepared the documentation and presentation materials for the Project Management event.'], note: 'pinout and\nconnection plan: mine' },
    { h: 'Team results', paras: ['We placed 1st in the Concept Class and 3rd overall, won the Project Management event outright, and came 3rd in the Business Plan. We were the first Egyptian team to reach the Business Plan final.'], note: 'first Egyptian team\nin the Business Plan final' },
  ],
  assets: [
    { src: '/img/tracers-team.webp', alt: 'The T-Racers team, about thirty members, posing on the steps outside a building', caption: 'The T-Racers team', rot: '-1.2deg' },
  ],
};

export const about: CasePage = {
  slug: 'about',
  activeTab: 'About',
  memo: '10', footer: 'About',
  backHref: '/', backLabel: 'Home',
  kicker: 'ABOUT · NEW CAIRO, EGYPT',
  title: 'About me',
  docTitle: 'About · Ayman Osama Hassan',
  description: 'Computer engineer, backend by choice. Tanta University 2026, Excellent (90%). ICPC, NTI DevSecOps track. New Cairo, Egypt.',
  subtitle: 'Computer engineer, backend by choice.',
  lede: 'I studied Computer and Automatic Control Engineering at Tanta University from 2021 to 2026 and graduated with Excellent (90%). I like backend work because it handles the logic behind the internet, and doing it well takes a broad range of knowledge and skills.',
  heroNote: 'graduated 2026,\nExcellent (90%)',
  facts: [
    { label: 'Based in', value: 'New Cairo, Egypt' },
    { label: 'Open to', value: 'Backend, software engineering, junior DevOps / DevSecOps' },
    { label: 'Where', value: 'Greater Cairo or remote' },
    { label: 'Email', value: 'ayman_osama@outlook.com', href: 'mailto:ayman_osama@outlook.com' },
  ],
  stats: [
    { big: '90%', label: 'Final grade, Excellent' },
    { big: '3rd', label: 'ICPC, across Tanta University' },
    { big: '22nd', label: 'ECPC qualifications 2025, up from 34th' },
    { big: '420 h', label: 'NTI DevSecOps track' },
  ],
  sections: [
    { h: 'Competitive programming', paras: ['I competed in ICPC for several years in C++. I placed 3rd across Tanta University, one rank short of the regional qualification, and moved from 34th to 22nd in the ECPC qualifications between 2023 and 2025. I now teach and set problems for the Tanta University ICPC Community.'], note: 'one rank short\nof regionals' },
    { h: 'Right now', paras: ['I am in NTI’s Professional DevSecOps track, a 420-hour program from 17 October 2026 to February 2027 covering Linux, Docker, Kubernetes, AWS, Terraform and CI/CD with security scanning. DevSecOps is one of the directions I am considering after it.'], note: 'started\n17 October' },
    { h: 'Also', paras: ['I work one day a week at Aktan Misr Textile and Dyeing on internal tools and ERP selection, and I use Claude daily for coding and planning.'], note: 'one day a week\nat the factory' },
  ],
  assets: [],
};

export const projects = {
  memo: '09',
  kicker: 'MORE WORK · EACH ONE LINKS TO ITS CODE',
  title: 'Other projects',
  subtitle: 'Smaller builds that round out the backend work.',
  lede: 'A full Django application, networking with raw sockets, an operating-system scheduler, and a front end built as part of a team.',
  heroNote: 'short entries,\nthe code says the rest',
  items: [
    { kicker: 'ITI Full Stack Python · final project', h: 'Crowdfunding Platform', paras: ['Sign-up with email activation, projects with images and tags, donations with progress tracking, ratings, threaded comments and tag-based suggestions.'], chips: ['Django 5', 'PostgreSQL', 'Bootstrap 5'], href: 'https://github.com/AymanOHM/croudfund', note: 'the full Django stack,\nend to end' },
    { kicker: 'Networking', h: 'TCP Chat Application', paras: ['A client/server chat where the server runs each client on its own thread.'], chips: ['Python', 'sockets', 'threads'], href: 'https://github.com/AymanOHM/chat_app', note: 'one thread per client' },
    { kicker: 'Operating systems', h: 'CPU Scheduling Simulator', paras: ['First-Come-First-Served and Round-Robin schedulers over generated workloads, with statistics and charts.'], chips: ['Python', 'Matplotlib'], href: 'https://github.com/AymanOHM/Process-scheduling-simulation', note: 'FCFS against Round-Robin' },
    { kicker: 'Team of 5', h: 'App Store Web App', paras: ['I built the front end in HTML, CSS and JavaScript. Teammates built the Flask backend and the SQL Server procedures.'], chips: ['HTML', 'CSS', 'JavaScript'], href: 'https://github.com/AymanOHM/app_store', note: 'my part: the front end' },
  ],
};
