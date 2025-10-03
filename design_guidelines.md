# CodeBattle Arena - Design Guidelines

## Design Approach

**Hybrid Strategy**: Developer-focused design system for the application core + dynamic, energetic landing page inspired by competitive coding platforms like LeetCode, Codeforces, and HackerRank.

### Core Principle
Create a professional coding environment that balances technical precision with the excitement of competitive programming. The platform should feel like a premium developer tool during competitions and an inspiring gateway on the landing page.

---

## Color Palette

### Dark Mode (Primary)
- **Background Deep**: 15 8% 12% (primary surface)
- **Background Elevated**: 220 10% 16% (cards, editor chrome)
- **Background Subtle**: 220 8% 20% (hover states, secondary surfaces)
- **Primary Brand**: 142 76% 36% (success green for correct submissions)
- **Accent Competitive**: 25 95% 53% (energetic orange for CTAs, warnings)
- **Error Red**: 0 84% 60% (incorrect submissions)
- **Text Primary**: 0 0% 95%
- **Text Secondary**: 220 9% 65%

### Light Mode (Optional Alternative)
- **Background**: 0 0% 98%
- **Primary**: 142 65% 42%
- **Text**: 220 15% 20%

---

## Typography

**Font Stack via Google Fonts CDN**:
- **Code/Monospace**: 'JetBrains Mono', 'Fira Code', monospace (editor, code displays)
- **Headings**: 'Inter', -apple-system, sans-serif (600-800 weights)
- **Body**: 'Inter', -apple-system, sans-serif (400-500 weights)

**Scale**:
- Hero: text-5xl to text-7xl (landing)
- Page Headings: text-3xl to text-4xl 
- Section Titles: text-xl to text-2xl
- Body: text-base
- Code: text-sm (14px for optimal readability)

---

## Layout System

**Spacing Primitives**: Consistent use of Tailwind units **2, 4, 8, 12, 16, 20** (e.g., p-4, gap-8, mt-12)

**Grid Structure**:
- Landing: Full-width hero, max-w-7xl container for content sections
- Application: max-w-screen-2xl with sidebar navigation (w-64 to w-72)
- Problem View: 60/40 split (problem description | code editor + output)
- Leaderboard: Full-width table with sticky headers

---

## Component Library

### Navigation
- **Top Bar**: Fixed, backdrop-blur with glass morphism effect, height h-16
- **User Menu**: Dropdown with avatar, submission count badge
- **Active States**: Border-b-2 with primary color

### Code Editor Zone
- **Monaco Integration**: Full-height editor with custom dark theme matching platform colors
- **Language Selector**: Dropdown top-right of editor (Python/JavaScript)
- **Submit Button**: Large, prominent with loading state animation
- **Output Console**: Bottom panel, collapsible, syntax-highlighted results

### Leaderboard
- **Table Design**: Striped rows (odd: bg-elevated), sticky header
- **Rank Badges**: Top 3 with medal icons (gold/silver/bronze gradients)
- **Live Updates**: Subtle pulse animation on rank changes
- **Columns**: Rank | Avatar+Name | Problems Solved | Latest Submission Time

### Problem Cards
- **Grid Layout**: 3 columns desktop, 1 mobile (landing features section)
- **Card Style**: Elevated surface with subtle border, hover: lift + glow effect
- **Difficulty Badge**: Top-right corner (Easy: green, Medium: orange, Hard: red)

### Anti-Cheat UI
- **Warning Banner**: Slide down from top, warning icon + count remaining
- **Lock State**: Full overlay with reason message when locked out

### Forms & Inputs
- **Auth Forms**: Centered card, max-w-md, generous padding (p-8)
- **Input Fields**: Dark background, border focus: primary color ring
- **Buttons**: Primary (filled primary), Secondary (outline), Danger (red)

---

## Landing Page Structure

### Hero Section (100vh)
- **Layout**: Split hero - Left: Animated code snippets cycling, Right: Headline + CTA
- **Background**: Subtle grid pattern with gradient overlay (15 8% 12% to 142 40% 15%)
- **Headline**: "Compete. Code. Conquer." (text-7xl, font-bold)
- **CTA Buttons**: "Register for Event" (primary), "View Leaderboard" (outline with blur)
- **Floating Elements**: Abstract code brackets/symbols with subtle parallax

### Features Showcase (py-20)
- **Grid**: 3-column cards highlighting key features
- **Icons**: Heroicons (shield for security, bolt for speed, trophy for competition)
- **Cards**: Hover state with border glow, transform scale-105

### Live Event Info (py-16)
- **Countdown Timer**: Large display if event upcoming, prominent stats if live
- **Event Details**: Date, venue (Tumakuru college name), prize info in 2-column layout

### How It Works (py-20)
- **Timeline/Steps**: 4 steps with connecting lines, icons for each stage
- **Visuals**: Screenshots or mockups of platform features

### Testimonials/Past Winners (py-16)
- **Carousel**: 3 visible cards, auto-rotate, pause on hover
- **Winner Profiles**: Photo, quote, achievement, college year

### Final CTA (py-24)
- **Centered**: "Ready to Battle?" heading, registration button, countdown if applicable
- **Background**: Subtle gradient accent

### Footer (py-12)
- **3-Column**: Event info & social links | Quick links | Contact & organizers
- **Social Icons**: GitHub, LinkedIn, Instagram for event updates

---

## Imagery & Assets

### Required Images
1. **Hero Background**: Abstract coding visualization or competitive programming themed illustration
2. **Feature Cards**: Icons from Heroicons for all feature highlights
3. **Platform Screenshots**: Monaco editor in action, leaderboard view, problem interface
4. **Team/Organizer Photos**: For credibility section

### Icon Library
Use **Heroicons** via CDN - solid variants for filled states, outline for minimal UI

---

## Animations (Minimal & Purposeful)

- **Landing Hero**: Typing animation for code snippets, fade-in on scroll for sections
- **Leaderboard**: Subtle row highlight on update (0.3s transition)
- **Submissions**: Loading spinner during judge, success/error badge animation
- **Tab Switch Warning**: Slide-down banner (0.2s ease-out)

**No**: Excessive parallax, complex 3D transforms, distracting particle effects

---

## Accessibility & Quality

- **Contrast Ratios**: WCAG AA minimum, AAA for critical text
- **Focus States**: Visible 2px ring on all interactive elements
- **Monaco Settings**: Line numbers, minimap toggle, keyboard shortcuts enabled
- **Responsive Breakpoints**: 640px, 1024px, 1280px, 1536px
- **Dark Mode Consistency**: All form inputs, modals, dropdowns match theme

---

## Technical Notes

- **Monaco CDN**: Load via npm CDN or unpkg
- **Syntax Themes**: Customize Monaco's dark theme to match brand colors
- **Performance**: Lazy load Monaco only on problem pages, optimize landing animations
- **Code Display**: Use `<pre><code>` with syntax highlighting library for static examples
