/**
 * Centralized Data Memory for Portfolio AI Chatbox
 *
 * This file serves as the single source of truth for the AI Assistant.
 * You can easily edit your profile, add new projects, update business offerings,
 * or add new FAQs here. Changes here will immediately reflect in the chatbox responses.
 */

export interface ProjectMemory {
  name: string;
  slug: string;
  category: string;
  summary: string;
  businessProblem: string;
  businessSolution: string;
  keyFeatures: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface ExperienceMemory {
  company: string;
  role: string;
  period: string;
  businessImpact: string[];
  technologies: string[];
}

export interface ServiceOffering {
  title: string;
  tagline: string;
  description: string;
  idealFor: string;
}

export interface FaqItem {
  question: string;
  keywords: string[];
  answer: string;
}

export interface AiMemoryData {
  profile: {
    name: string;
    role: string;
    title: string;
    location: string;
    experienceYears: number;
    email: string;
    github: string;
    linkedin: string;
    instagram: string;
    availability: string;
    shortBio: string;
    businessValueProposition: string;
  };
  services: ServiceOffering[];
  skills: {
    frontend: string[];
    backend: string[];
    database: string[];
    architectureAndTools: string[];
  };
  experiences: ExperienceMemory[];
  educations: {
    institution: string;
    degree: string;
    period: string;
    focus: string;
  }[];
  projects: ProjectMemory[];
  faqs: FaqItem[];
  suggestedQuestions: string[];
}

export const aiMemory: AiMemoryData = {
  profile: {
    name: "Irly Fizaharis",
    role: "Full-Stack Developer",
    title: "Full-Stack Developer & Software Engineer",
    location: "Bandung, Indonesia",
    experienceYears: 3,
    email: "irly.fizaharis.dev@gmail.com",
    github: "https://github.com/ItsLyy",
    linkedin: "https://www.linkedin.com/in/irly-fizaharis-aa8896298/",
    instagram: "https://www.instagram.com/irlydev/",
    availability: "Available for full-time engineering roles, contract engagements, and high-impact digital product development.",
    shortBio:
      "Full-stack software engineer who translates complex business requirements into fast, reliable, and user-centered digital products. Specializing in TypeScript, Next.js, Node.js, and PostgreSQL.",
    businessValueProposition:
      "I bridge intuitive UI design with robust, scalable backend architecture. Instead of just writing code, I focus on measurable business outcomes: accelerating time-to-market, optimizing performance for user retention, building maintainable codebases that minimize technical debt, and delivering secure end-to-end applications.",
  },

  services: [
    {
      title: "End-to-End Full-Stack Web Development",
      tagline: "Turn ideas into production-ready web applications",
      description:
        "Complete lifecycle product engineering from database design and RESTful APIs to responsive, high-performance web frontends with Next.js and TypeScript.",
      idealFor: "Startups, scale-ups, and businesses needing a robust web application built right from day one.",
    },
    {
      title: "MVP & Rapid Product Prototyping",
      tagline: "From concept to working software with speed",
      description:
        "Building validated Minimum Viable Products (MVPs) with clean architecture, helping founders launch quickly and gather real user feedback.",
      idealFor: "Founders and teams looking to validate a digital product idea fast without sacrificing code quality.",
    },
    {
      title: "Backend Engineering & API Development",
      tagline: "Resilient systems and structured data models",
      description:
        "Architecting clean relational databases with PostgreSQL/Drizzle, secure authentication, role-based access control, and robust API endpoints with Node.js and Laravel.",
      idealFor: "Companies needing dependable backend services, third-party integrations, or database migrations.",
    },
    {
      title: "Frontend Performance & UX Optimization",
      tagline: "Faster loading, higher conversions, and seamless usability",
      description:
        "Optimizing Core Web Vitals, responsive layouts, accessibility (a11y), and state management to deliver instant page loads and delightful experiences across all screen sizes.",
      idealFor: "Businesses looking to increase user retention and search engine visibility through technical excellence.",
    },
  ],

  skills: {
    frontend: [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Framer Motion",
      "Responsive & Mobile-First Design",
      "Core Web Vitals & Web Performance",
      "Accessibility (WCAG)",
    ],
    backend: [
      "Node.js",
      "Next.js Server Actions & Route Handlers",
      "RESTful API Design",
      "Laravel (PHP)",
      "Authentication & Authorization",
      "Zod Schema Validation",
    ],
    database: [
      "PostgreSQL",
      "Supabase",
      "Drizzle ORM",
      "Database Modeling & Migrations",
      "SQL Query Optimization",
    ],
    architectureAndTools: [
      "Git & GitHub Version Control",
      "Figma UI/UX Implementation",
      "CI/CD Workflows",
      "Edge & Serverless Deployment (Vercel)",
      "System Architecture & Modularity",
    ],
  },

  experiences: [
    {
      company: "PT. Tilikgram",
      role: "Full-stack Web Developer (Internship)",
      period: "2025 - Present",
      businessImpact: [
        "Architected responsive, conversion-focused user interfaces using Next.js and Tailwind CSS.",
        "Engineered and optimized backend service endpoints and business logic using Laravel.",
        "Streamlined frontend-backend API integrations, reducing latency and operational friction.",
        "Collaborated cross-functionally from Figma wireframing to production deployment.",
      ],
      technologies: ["Next.js", "Tailwind CSS", "Laravel", "REST APIs", "Figma"],
    },
    {
      company: "DBS Coding Camp 2025",
      role: "Full-stack & Frontend Engineering Fellow",
      period: "2025",
      businessImpact: [
        "Built responsive, accessible web interfaces delivering smooth user experiences with React.",
        "Integrated secure REST API endpoints with robust error handling and optimistic state management.",
        "Improved frontend performance metrics and usability standards across multi-device screens.",
        "Delivered production-grade team capstone meeting rigorous business acceptance criteria.",
      ],
      technologies: ["React", "Tailwind CSS", "REST APIs", "JavaScript", "Responsive UI"],
    },
  ],

  educations: [
    {
      institution: "Telkom University",
      degree: "Bachelor of Informatics (S1 Informatika)",
      period: "2025 - 2029 (Expected)",
      focus: "Computer Science, Software Architecture, Data Structures & Algorithms",
    },
    {
      institution: "SMK Negeri 1 Wonosobo",
      degree: "Vocational High School - Software Engineering (RPL)",
      period: "2022 - 2025",
      focus: "Software Engineering fundamentals, Web Development, Database Management",
    },
  ],

  projects: [
    {
      name: "Portfolio Website v1",
      slug: "portfolio",
      category: "Full-Stack Web Platform",
      summary:
        "Modern developer portfolio built with Next.js 16, React 19, Tailwind CSS 4, and Drizzle ORM.",
      businessProblem:
        "Presenting a professional, high-performance digital identity that clearly communicates business value, technical versatility, and full-stack capabilities to prospective clients and employers.",
      businessSolution:
        "Engineered a lightning-fast web application featuring server-side rendering, dynamic project indexing, Catppuccin-themed minimalist UI, and an intelligent AI assistant powered by centralized memory.",
      keyFeatures: [
        "Next.js 16 App Router architecture with SSR & ISR caching",
        "Responsive, accessible UI styled with Tailwind CSS 4",
        "Integrated AI Chatbox with centralized knowledge memory",
        "PostgreSQL + Drizzle ORM data pipeline for dynamic project showcase",
        "Interactive timeline, skills matrices, and direct contact form",
      ],
      techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "PostgreSQL", "Drizzle ORM", "Framer Motion"],
      githubUrl: "https://github.com/ItsLyy",
      liveUrl: "https://irly.fizaharis.dev",
    },
    {
      name: "FinQuest — Financial Intelligence & Gamification",
      slug: "finquest",
      category: "Fintech & Interactive Application",
      summary:
        "An engaging financial management application designed to help users track budgets, build saving habits, and master personal finance through gamified goals.",
      businessProblem:
        "Traditional personal finance tools are tedious and suffer from low user retention because data entry feels like a chore.",
      businessSolution:
        "Created an intuitive application combining real-time budget tracking with milestone achievements, helping users build lasting financial discipline.",
      keyFeatures: [
        "Clean interactive dashboard for income and expense tracking",
        "Goal-oriented savings milestones and progress visualizer",
        "Responsive layout optimized for mobile and desktop workflows",
        "Modular full-stack architecture with secure data persistence",
      ],
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Supabase"],
      githubUrl: "https://github.com/ItsLyy",
    },
  ],

  faqs: [
    {
      question: "What is Irly's core expertise?",
      keywords: ["expertise", "skills", "what do you do", "role", "specialty", "tech stack"],
      answer:
        "Irly Fizaharis is a Full-Stack Developer & Software Engineer based in Bandung, Indonesia. He specializes in end-to-end web product development using TypeScript, Next.js 16, React 19, Node.js, PostgreSQL, Supabase, and Drizzle ORM. His focus is bridging high-converting user interfaces with scalable, maintainable backend architectures.",
    },
    {
      question: "Why should businesses or clients hire Irly?",
      keywords: ["why hire", "business value", "hire", "client", "value", "benefits"],
      answer:
        "Businesses hire Irly because he brings a product and business mindset to engineering: \n1. **End-to-End Ownership**: Handles everything from UI/UX implementation to backend APIs and database modeling.\n2. **Fast Time-to-Market**: Builds rapidly using modern tools (Next.js, Tailwind, Drizzle) without sacrificing code quality.\n3. **Business Alignment**: Prioritizes conversion, Core Web Vitals, SEO, and maintainability to ensure technical work drives real business revenue.",
    },
    {
      question: "What kind of projects or services can Irly deliver?",
      keywords: ["services", "offerings", "deliver", "what can you build", "mvp", "freelance"],
      answer:
        "Irly delivers:\n- **Full-Stack Web Applications** (Next.js, Node.js, PostgreSQL)\n- **Startup MVPs** (rapid concept-to-launch prototyping)\n- **Backend APIs & Database Architecture** (Supabase, Drizzle, Laravel, REST APIs)\n- **Performance & UX Optimization** (speed audits, responsiveness, accessibility)",
    },
    {
      question: "Is Irly available for hire or freelance work?",
      keywords: ["available", "hire", "freelance", "contract", "full-time", "job", "work together"],
      answer:
        "Yes! Irly is currently open to full-time full-stack developer roles, contract engagements, and select freelance product development. You can reach out directly via the contact form on this site or email him at irly.fizaharis.dev@gmail.com.",
    },
    {
      question: "What projects has Irly built?",
      keywords: ["projects", "portfolio", "finquest", "work", "showcase", "built"],
      answer:
        "Key projects include:\n1. **Portfolio Website v1**: A modern, high-performance portfolio with dynamic projects, Drizzle ORM, and this intelligent AI assistant.\n2. **FinQuest**: A fintech and gamified personal finance tracker combining expense analytics with milestone goals.\nVisit the /projects page to explore details and code repositories!",
    },
    {
      question: "Where is Irly located and what are his working arrangements?",
      keywords: ["location", "bandung", "indonesia", "remote", "timezone"],
      answer:
        "Irly is based in Bandung, Indonesia (GMT+7). He is experienced with remote collaboration, asynchronous workflows, and flexible scheduling for global teams and clients.",
    },
  ],

  suggestedQuestions: [
    "Tell me about Irly Fizaharis",
    "Why hire Irly for full-stack development?",
    "What projects has Irly built?",
    "What services does Irly offer?",
    "How can I get in touch with Irly?",
  ],
};

/**
 * Builds a structured system prompt for Gemini LLM using the centralized memory.
 */
export function buildAiSystemPrompt(memory: AiMemoryData = aiMemory): string {
  const { profile, services, skills, experiences, educations, projects, faqs } = memory;

  return `
You are the official AI Assistant for Irly Fizaharis's developer portfolio website.
Your mission is to represent Irly accurately, professionally, and persuasively to prospective clients, hiring managers, recruiters, and engineering collaborators.

### IRLY'S PROFILE & POSITIONING:
- Name: ${profile.name}
- Title/Role: ${profile.title} (${profile.role})
- Location: ${profile.location}
- Experience: ${profile.experienceYears}+ years
- Email: ${profile.email}
- GitHub: ${profile.github}
- LinkedIn: ${profile.linkedin}
- Availability: ${profile.availability}
- Core Bio: ${profile.shortBio}
- Business Value Proposition: ${profile.businessValueProposition}

### SERVICES & BUSINESS OFFERINGS:
${services
  .map(
    (s) => `- **${s.title}**: ${s.tagline}. ${s.description} (Ideal for: ${s.idealFor})`,
  )
  .join("\n")}

### TECHNICAL CAPABILITIES:
- **Frontend**: ${skills.frontend.join(", ")}
- **Backend & APIs**: ${skills.backend.join(", ")}
- **Database & ORM**: ${skills.database.join(", ")}
- **Architecture & Tools**: ${skills.architectureAndTools.join(", ")}

### KEY PROJECTS:
${projects
  .map(
    (p) => `
- **${p.name}** [${p.category}] (Slug: ${p.slug}):
  - Summary: ${p.summary}
  - Business Problem: ${p.businessProblem}
  - Technical Solution: ${p.businessSolution}
  - Key Features: ${p.keyFeatures.join("; ")}
  - Tech Stack: ${p.techStack.join(", ")}
  - Links: ${p.liveUrl ? `Live: ${p.liveUrl} | ` : ""}${p.githubUrl ? `GitHub: ${p.githubUrl}` : ""}`,
  )
  .join("\n")}

### WORK EXPERIENCE:
${experiences
  .map(
    (e) => `
- **${e.role}** at **${e.company}** (${e.period}):
  ${e.businessImpact.map((b) => `  * ${b}`).join("\n")}
  Tech: ${e.technologies.join(", ")}`,
  )
  .join("\n")}

### EDUCATION:
${educations
  .map((ed) => `- ${ed.degree}, ${ed.institution} (${ed.period}) - ${ed.focus}`)
  .join("\n")}

### FREQUENTLY ASKED QUESTIONS & REFERENCE ANSWERS:
${faqs
  .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
  .join("\n\n")}

### CONVERSATION & BEHAVIOR GUIDELINES:
1. **Tone**: Warm, confident, professional, articulate, business-savvy, and concise.
2. **Business Alignment**: Highlight business outcomes, speed-to-market, reliable engineering, and ROI whenever discussing technical choices.
3. **Format**: Use clear Markdown formatting with bullet points and bold highlights for readability.
4. **Call to Action**: When a user expresses interest in working together, building a project, or hiring Irly, invite them to use the contact form at the bottom of the page (#contact) or send an email directly to ${profile.email}.
5. **Honesty**: If asked about something not in this memory (e.g. personal secrets or unlisted tech), politely explain what you know about Irly and offer to connect them directly.
`.trim();
}

/**
 * Intelligent Offline/Rule-based Query Matcher:
 * Provides instant, high-quality responses even without an external API key.
 */
export function queryOfflineAiMemory(
  userQuery: string,
  memory: AiMemoryData = aiMemory,
): string {
  const q = userQuery.toLowerCase().trim();

  // 1. Direct Greetings
  if (/^(hi|hello|hey|halo|selamat pagi|selamat siang|selamat malam|greetings)/i.test(q)) {
    return `Hello! 👋 I'm **Irly's AI Assistant**. 

I can tell you all about Irly's full-stack engineering expertise, recent projects, business offerings, or how he can help you build your next digital product.

What would you like to know? Feel free to ask about:
- **Background & Full-stack Skills**
- **Featured Projects (Portfolio, FinQuest)**
- **Business Value & Services**
- **Hiring / Collaboration Availability**`;
  }

  // 2. Who is Irly / About me
  if (
    q.includes("about") ||
    q.includes("who is") ||
    q.includes("who are you") ||
    q.includes("tell me about") ||
    q.includes("profile") ||
    q.includes("background")
  ) {
    return `### About Irly Fizaharis 👨‍💻
**${memory.profile.title}** based in ${memory.profile.location}.

${memory.profile.shortBio}

#### 💡 Business Value & Philosophy:
${memory.profile.businessValueProposition}

#### 🛠️ Core Capabilities:
- **Frontend**: ${memory.skills.frontend.slice(0, 5).join(", ")}
- **Backend & Data**: ${memory.skills.backend.slice(0, 3).join(", ")}, ${memory.skills.database.slice(0, 3).join(", ")}
- **Status**: ${memory.profile.availability}

Would you like to explore his **projects**, learn about his **services**, or discuss a collaboration?`;
  }

  // 3. Why hire / Business Value
  if (
    q.includes("why hire") ||
    q.includes("hire") ||
    q.includes("value") ||
    q.includes("benefit") ||
    q.includes("why should")
  ) {
    const faq = memory.faqs.find((f) => f.keywords.includes("why hire"));
    if (faq) return faq.answer;
  }

  // 4. Projects query
  if (
    q.includes("project") ||
    q.includes("portfolio") ||
    q.includes("finquest") ||
    q.includes("built") ||
    q.includes("work") ||
    q.includes("showcase")
  ) {
    const projectSummaries = memory.projects
      .map(
        (p) => `
### 🚀 ${p.name} (${p.category})
${p.summary}
- **Business Problem**: ${p.businessProblem}
- **Technical Solution**: ${p.businessSolution}
- **Tech Stack**: ${p.techStack.join(", ")}
${p.liveUrl ? `- **Live Demo**: [${p.liveUrl}](${p.liveUrl})\n` : ""}${p.githubUrl ? `- **GitHub**: [View Repository](${p.githubUrl})` : ""}`,
      )
      .join("\n\n---\n");

    return `${projectSummaries}\n\n👉 You can also browse the full list on the [Projects Page](/projects).`;
  }

  // 5. Skills & Tech Stack
  if (
    q.includes("skill") ||
    q.includes("stack") ||
    q.includes("tech") ||
    q.includes("technolog") ||
    q.includes("languages") ||
    q.includes("framework")
  ) {
    return `### Irly's Full-Stack Technical Stack ⚡

- **Frontend & UX**: ${memory.skills.frontend.join(" • ")}
- **Backend & APIs**: ${memory.skills.backend.join(" • ")}
- **Databases & ORM**: ${memory.skills.database.join(" • ")}
- **DevOps & Architecture**: ${memory.skills.architectureAndTools.join(" • ")}

Irly emphasizes **type safety (TypeScript/Zod)**, **performance (SSR/Edge)**, and **scalable database modeling (PostgreSQL/Drizzle)** to build maintainable products.`;
  }

  // 6. Services & Business Offerings
  if (
    q.includes("service") ||
    q.includes("offering") ||
    q.includes("what can you do") ||
    q.includes("mvp") ||
    q.includes("freelance") ||
    q.includes("consult")
  ) {
    const servicesList = memory.services
      .map(
        (s) => `
#### 🔹 ${s.title}
*${s.tagline}*
${s.description}
**Best for**: ${s.idealFor}`,
      )
      .join("\n");

    return `### Services & Digital Solutions 💼\n${servicesList}\n\nReady to get started? Reach out at **${memory.profile.email}** or fill out the [Contact Form](#contact)!`;
  }

  // 7. Contact / How to get in touch
  if (
    q.includes("contact") ||
    q.includes("touch") ||
    q.includes("email") ||
    q.includes("reach") ||
    q.includes("call") ||
    q.includes("message")
  ) {
    return `### Let's Connect! 📬

Irly is always open to discussing new engineering roles, product collaborations, or freelance projects:

- ✉️ **Direct Email**: [${memory.profile.email}](mailto:${memory.profile.email})
- 📝 **Contact Form**: Scroll to the [Contact Section](#contact) on this page
- 💼 **LinkedIn**: [Irly's Profile](${memory.profile.linkedin})
- 🐙 **GitHub**: [${memory.profile.github}](${memory.profile.github})

Drop a message anytime!`;
  }

  // 8. Experience / Career
  if (
    q.includes("experience") ||
    q.includes("work history") ||
    q.includes("tilikgram") ||
    q.includes("dbs") ||
    q.includes("career")
  ) {
    const expText = memory.experiences
      .map(
        (e) => `
#### 🏢 ${e.company} — ${e.role} (${e.period})
${e.businessImpact.map((b) => `- ${b}`).join("\n")}
*Technologies*: ${e.technologies.join(", ")}`,
      )
      .join("\n");

    return `### Career & Professional Experience 📈\n${expText}`;
  }

  // 9. Education
  if (q.includes("education") || q.includes("university") || q.includes("school") || q.includes("degree")) {
    const eduText = memory.educations
      .map((ed) => `- **${ed.degree}** @ ${ed.institution} (${ed.period})\n  *Focus*: ${ed.focus}`)
      .join("\n\n");
    return `### Education & Academic Background 🎓\n\n${eduText}`;
  }

  // 10. Check specific FAQs keywords
  for (const faq of memory.faqs) {
    if (faq.keywords.some((kw) => q.includes(kw.toLowerCase()))) {
      return faq.answer;
    }
  }

  // Fallback answer
  return `Thank you for asking! 

As **Irly's AI Assistant**, I specialize in answering questions about:
- Irly's **Full-Stack Development skills** (Next.js, TypeScript, PostgreSQL, Node.js)
- **Featured Projects** such as this Portfolio and FinQuest
- **Business Offerings** (MVP development, End-to-End apps, Performance optimization)
- **Hiring & Collaboration** inquiries

Feel free to try asking:
- *"Tell me about Irly's full-stack experience"*
- *"What business value does Irly deliver?"*
- *"What projects has he worked on?"*
- *"How can I hire or contact Irly?"*

Or reach Irly directly at **${memory.profile.email}**!`;
}
