# Product Requirements Document & Brand Foundation

**Project:** Irly Fizaharis Portfolio (V1)
**Status:** Finalized Architecture & Design System
**Target Market:** Global (USD-based engagements)
**Stack:** Next.js (App Router), Tailwind CSS, Supabase, Drizzle ORM, Framer Motion

---

## 1. Brand Identity & Positioning (The Reality Check)

The brand rejects manufactured corporate personas in favor of authentic, rigorous technical capability. The positioning reflects the reality of an independent developer with a strong mathematical foundation, bridging complex logic with precise frontend execution.

### 1.1 Core Messaging

- **Primary Identity:** Independent developer based in Indonesia.
- **Tagline:** Modern software, thoughtfully built.
- **Value Proposition:** Full-stack web development for startups, businesses, and people with ideas worth building.
- **The "Build. Refine. Ship." Methodology:** Emphasizing end-to-end execution, from architectural planning to pixel-perfect delivery.

### 1.2 The "Anti-Slop" Mandate

To differentiate from generic, AI-generated portfolio templates, the visual identity follows two strict rules:

- **Rule 01: Use color to indicate, not decorate.** Purple and blue must communicate hierarchy, interaction, or identity. They must never exist merely to make an empty area look interesting.
- **Rule 02: Prefer structure over effects.** Borders, spacing, typography, alignment, and hierarchy create visual interest. Gradients, blur, glow, or animation are strictly secondary.

---

## 2. Design System: Grounded Dark Mode

The aesthetic is dark, precise, minimal, and technical. It relies on solid surfaces and crisp borders rather than glassy translucency.

### 2.1 Color Palette (Semantic Design Tokens)

The palette is expressed as role-based Tailwind tokens so backgrounds, borders, and text never share a token by accident.

| Role                | Token                       | Hex Code  | Usage Rules                                 |
| :------------------ | :-------------------------- | :-------- | :------------------------------------------ |
| **Background**      | `bg-background`             | `#303446` | Base background for all pages.              |
| **Surface**         | `bg-surface`                | `#353B4F` | Inputs, cards, and container wells.         |
| **Raised**          | `bg-raised`                 | `#3B4158` | Hover states and emphasized panels.         |
| **Sunken**          | `bg-sunken`                 | `#2A2F40` | Placeholders, image fills, skeletons.       |
| **Border**          | `border-border`             | `#454D68` | Opaque 1px structural lines.                |
| **Strong Border**   | `border-border-strong`      | `#A5ADCE` | Focus rings and high-emphasis borders.      |
| **Foreground**      | `text-foreground`           | `#C6D0F5` | Headings and primary reading.               |
| **Muted Text**      | `text-muted`                | `#A5ADCE` | Secondary body copy and icons.              |
| **Faint Text**      | `text-faint`                | `#737994` | Tertiary/meta text and labels.              |
| **Dim Text**        | `text-dim`                  | `#51576D` | Placeholders and disabled states.           |
| **Ink (on accent)** | `text-ink`                  | `#232536` | Text sitting on accent/light surfaces.      |
| **Accent**          | `text-accent` / `bg-accent` | `#CA9EE6` | Action buttons, focus rings, active states. |

### 2.2 Typography Architecture

- **Conversational & Reading (Space Grotesk):** `--font-sans`. Used for all headings, paragraph text, and conversational UI elements.
- **Technical & Metadata (JetBrains Mono):** `--font-mono`. Reserved exclusively for structural markers (`[FEATURED_WORK]`, `[FOCUS]`), section labels, tech stack tags, and status badges (`[LIVE_DEMO]`). Loaded via `next/font` as `--font-jetbrains-mono`.

### 2.3 Motion & Interaction (Framer Motion)

- **Hover States:** Restrained to a strict 2px vertical lift (`y: -2`) with an `easeOut` transition and a subtle border color shift. No glowing drop-shadows.
- **Routing Transitions:** Fast (200ms) opacity-only fades to prevent layout flashing.
- **Loading States:** Solid, structural skeleton blocks (using `#161A2D`) that match component geometry with a slow, grounded pulse.

---

## 3. Site Architecture & Page Requirements

### 3.1 Homepage (`/`)

- **Hero Section:**
  - **H1:** "Full-Stack Web Development."
  - **Metadata:** `[BASED IN] INDONESIA / REMOTE`.
  - **Bio:** _"Independent developer based in Indonesia. I spend my time turning ideas into software, solving complex logic problems, and building things that are useful beyond the code itself."_
  - **CTAs:** Primary Electric Purple button (`[ Let's talk ]`), Secondary outline button (`[ View my work ]`).
- **Capabilities List ("What I build"):**
  - Grouped into `01 — Web Interfaces`, `02 — Backend & APIs`, `03 — Data & Logic`.
- **Featured Work Grid:** 2-column structural grid pulling projects where `isFeatured == true`.
- **Background & Foundation (Timeline):** A vertical timeline emphasizing the reality of your trajectory:
  - _Independent Developer (2024 — Present):_ Focus on full-stack React/Next.js UI architecture.
  - _Digital Product Intern (2023 — 2024):_ Bridging design requirements and technical execution in production environments.
  - _Mathematics & Statistical Analysis (Academic Foundation):_ Highlighting rigorous study in advanced calculus, limit definitions, and RStudio data analysis to prove high-level logic capabilities.

### 3.2 Dynamic Work Index & Case Studies (`/work` & `/work/[slug]`)

- **Index:** Complete grid of all builds, utilizing monospace tags to denote `[LAB_EXPERIMENT]` (prototypes/boilerplates) versus client builds.
- **Case Studies (Database-Driven):** Renders raw Markdown from Supabase.
- **Structure:** Follows the strict brand sequence of Problem, Approach, Build, Result, and Reflection.
- **Custom Markdown UI:**
  - `<blockquote>` renders as a Deep Navy block with an Electric Purple left border.
  - `<code>` blocks utilize JetBrains Mono on `#161A2D` backgrounds.

### 3.3 The Process Page (`/process`)

- A static layout detailing the "Build. Refine. Ship." execution strategy.
- Functions as the primary authority-builder in the absence of initial client testimonials.

### 3.4 Contact & Lead Qualification (`/contact`)

- **Objective:** Filter out vague requests and low-budget inquiries to protect time and maintain premium positioning.
- **UI:** Deep Navy inputs, pure `#262A40` borders, 1px Electric Purple focus rings.
- **Required Fields:** Name, Email, Project Details (Textarea).
- **Engagement Type Dropdown:** End-to-End Product Build, Backend & API Development, Architecture & UI Refinement.
- **Global Budget Dropdown (USD):** `<$2,000`, `$2,000 - $5,000`, `$5,000 - $10,000`, `$10,000+`.
- **Submission State:** Button disables and transitions to "Sending...". On success, the form is replaced by a grounded confirmation text block.

---

## 4. Backend Infrastructure & Data Models

### 4.1 Database Schema (Drizzle ORM via Supabase)

- **`projects` Table:**
  - `slug`, `title` (Varchar)
  - `summary` (Text - Stores raw Markdown case study)
  - `techStack` (JSONB Array)
  - `isPlaceholder`, `isFeatured` (Boolean)
  - `demoUrl`, `githubUrl` (Varchar)
- **`testimonials` Table:**
  - `authorName`, `authorRole`, `content` (Varchar/Text)
  - `isPublished` (Boolean)

### 4.2 Zero-State Architecture

To maintain absolute brand confidence, the application employs zero-state logic for missing data. If the `testimonials` query returns an empty array, the React component returns `null` and unmounts completely. The portfolio will never display "Coming Soon" or empty placeholder blocks.

---

## 5. Social Proof & External Links

Social media acts as a quiet proof-of-work rather than a marketing loudspeaker.

- **Placement:** Minimal monochrome icons in the top Navbar and simple text links in the Footer.
- **Channels:** GitHub (primary technical proof), LinkedIn (B2B networking), and X/Twitter (optional, for development logs only).
- **Styling:** Icons remain Soft White (`#F4F5FA`) or Muted Gray (`#9299AD`), transitioning to Electric Purple strictly on hover.
