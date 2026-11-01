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
  titleWrap?: boolean;   // long titles wrap onto two lines at a readable size
};

export const siteTabs = (active: string) => [
  { label: 'Home', href: '/', current: false },
  { label: 'Work', href: '/#work', current: active === 'Work' },
  { label: 'Projects', href: '/projects/', current: active === 'Projects' },
  { label: 'About', href: '/about/', current: active === 'About' },
];

// Phone title size from the design: fit to width, at most 60px.
export const phoneTitle = (title: string, wrap = false) => (wrap ? 40 : Math.min(60, Math.floor(330 / (title.length * 0.63))));

export const maintenance: CasePage = {
  slug: 'maintenance-log',
  activeTab: 'Work',
  memo: '06', footer: 'Maintenance Logging System',
  backHref: '/#work', backLabel: 'All work',
  kicker: 'CASE STUDY 02 · AKTAN MISR · AUG 2026 → NOW',
  title: 'Maintenance Logging System',
  titleDesk: 64, titleWrap: true,
  docTitle: 'Maintenance Logging System, case study · Ayman Osama Hassan',
  description: 'A breakdown logging system for a textile factory: 100 machines, 17 technicians, summaries by department and machine.',
  subtitle: 'A breakdown log for a textile factory.',
  lede: 'The factory tracked machine breakdowns on paper, so there was no easy way to see which machines broke down most, how long repairs took, or how much downtime each department lost. I designed the logging system that answers those questions for its 100 machines and 17 technicians.',
  heroNote: '',
  stack: 'Google Sheets (data) · Google Apps Script (input forms and summaries)',
  next: { href: '/work/opengl-game/', kicker: 'Next case study', label: '2-Player OpenGL Game' },
  facts: [
    { label: 'My role', value: 'Designed it, directed the build, rolled it out' },
    { label: 'Users', value: '17 technicians and the production manager; top management has access' },
    { label: 'Status', value: 'In trial' },
  ],
  stats: [],
  sections: [
    { h: 'What it records', paras: ['A shared log with one entry per breakdown, summarized by department and by machine. Each entry records these fields.'], chips: ['Breakdown type', 'Machine', 'Technician', 'Downtime', 'Repair time', 'Parts replaced', 'Open / closed'], note: '' },
    { h: 'Why Google Sheets', paras: ['It is free, and the team already knew spreadsheets. Microsoft’s free tier did not fit.'], note: '' },
    { h: 'Rolling it out', paras: ['The paper logs still run alongside it during the trial period. Replacing the old system before the new one has proven itself would be hard to undo on a factory floor.'], note: '' },
    { h: 'Also', paras: ['I advise management on choosing an ERP and reviewed three vendor proposals.'], note: '' },
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
  title: '2-Player OpenGL Game',
  titleDesk: 64, titleWrap: true,
  docTitle: '2-Player OpenGL Game, case study · Ayman Osama Hassan',
  description: 'A two-player platformer written without a game engine: collisions, physics, input, sprite animation and a state machine in Python and PyOpenGL.',
  subtitle: 'A two-player platformer in Python.',
  lede: 'Written for a computer-graphics course and rendered with PyOpenGL. Pygame only loads the assets.',
  heroNote: 'no engine,\njust math and Python',
  stack: 'Python · PyOpenGL · Pygame',
  next: { href: '/work/t-racers/', kicker: 'Next case study', label: 'T-Racers Formula Student' },
  facts: [
    { label: 'Code', value: 'Repo on GitHub', href: 'https://github.com/AymanOHM/project_gg' },
  ],
  stats: [],
  sections: [
    { h: 'What I wrote', paras: ['The parts a game engine would normally provide.'], list: ['Collision detection', 'Physics-based movement (landing, wall jumps, friction)', 'Input handling for two players', 'Sprite animation', 'A game-state machine'], note: '' },
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
  subtitle: 'Electrical systems for a concept-class race car.',
  lede: 'T-Racers is a student team of about 63 members. We entered the Concept Class at IMechE Formula Student 2026 (Silverstone Circuit, UK, 15 to 19 July 2026), where the car is judged on its design on paper. I worked on the ECU and the sensors.',
  heroNote: '',
  stack: 'Haltech Nexus R3 ECU · O2, position and engine sensors',
  next: { href: '/projects/', kicker: 'More work', label: 'Other projects' },
  facts: [
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
    { h: 'My work', list: ['Selected the ECU and the sensor suite from supplier catalogs.', 'Produced the ECU pinout and connection plan.', 'Contributed to the 2D wiring diagrams and wrote the electrical-system documentation.', 'Prepared the documentation and presentation materials for the Project Management event.'], note: '' },
    { h: 'Team results', paras: ['We were the first Egyptian team to reach the Business Plan final.'], note: '' },
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
  description: 'Backend engineer, training in DevSecOps. Computer and Automatic Control Engineering, Tanta University 2026. ICPC competitor. New Cairo, Egypt.',
  subtitle: 'Backend engineer, training in DevSecOps.',
  lede: 'I studied Computer and Automatic Control Engineering at Tanta University from 2021 to 2026.',
  heroNote: '',
  facts: [],
  stats: [
    { big: '3rd', label: 'ICPC, across Tanta University' },
    { big: '22nd', label: 'ECPC qualifications 2025, up from 34th' },
    { big: '420 h', label: 'NTI DevSecOps track' },
  ],
  sections: [
    { h: 'Competitive programming', paras: ['I competed in ICPC for several years in C++. I placed 3rd across Tanta University, one rank short of the regional qualification, and moved from 34th to 22nd in the ECPC qualifications between 2023 and 2025. I now teach and set problems for the Tanta University ICPC Community.'], note: '' },
    { h: 'Right now', paras: ['I am in NTI’s Professional DevSecOps track, a 420-hour program from 17 October 2026 to February 2027 covering Linux, Docker, Kubernetes, AWS, Terraform and CI/CD with security scanning.'], note: '' },
    { h: 'Also', paras: ['I work one day a week at Aktan Misr Textile and Dyeing on internal tools and ERP selection.'], note: '' },
  ],
  assets: [],
};

export const projects = {
  memo: '09',
  kicker: 'MORE WORK',
  title: 'Other projects',
  subtitle: 'Smaller projects, each with its code on GitHub.',
  lede: 'A Django crowdfunding platform, a TCP chat, a CPU scheduling simulator and the front end of an app store.',
  heroNote: '',
  items: [
    { kicker: 'ITI Full Stack Python · final project', h: 'Crowdfunding Platform', paras: ['Sign-up with email activation, projects with images and tags, donations with progress tracking, ratings, threaded comments and tag-based suggestions.'], chips: ['Django 5', 'PostgreSQL', 'Bootstrap 5'], href: 'https://github.com/AymanOHM/croudfund', note: '' },
    { kicker: 'Networking', h: 'TCP Chat Application', paras: ['A client/server chat where the server runs each client on its own thread.'], chips: ['Python', 'sockets', 'threads'], href: 'https://github.com/AymanOHM/chat_app', note: '' },
    { kicker: 'Operating systems', h: 'CPU Scheduling Simulator', paras: ['First-Come-First-Served and Round-Robin schedulers over generated workloads, with statistics and charts.'], chips: ['Python', 'Matplotlib'], href: 'https://github.com/AymanOHM/Process-scheduling-simulation', note: '' },
    { kicker: 'Team of 5', h: 'App Store Web App', paras: ['I built the front end in HTML, CSS and JavaScript. Teammates built the Flask backend and the SQL Server procedures.'], chips: ['HTML', 'CSS', 'JavaScript'], href: 'https://github.com/AymanOHM/app_store', note: '' },
  ],
};
