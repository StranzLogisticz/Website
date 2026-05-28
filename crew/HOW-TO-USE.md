# HOW TO USE YOUR CREW
> Keep this open. Copy-paste the prompts below.

---

## STARTING ANY PROJECT

**Open terminal → navigate to your project folder → type `claude`**

Then paste this (replace the last line with your project):
```
You are LUFFY. Read CLAUDE.md and agents/LUFFY.md fully.
I need you to build: [your project description in plain English]
```

---

## ACTIVATING EACH CREW MEMBER

Open a **separate terminal tab** for each. Navigate to the same project folder first.

### 🏴‍☠️ LUFFY — Start here, every project
```
You are LUFFY. Read CLAUDE.md and agents/LUFFY.md.
Here's the project: [describe it]
Create the project brief and task files. Assign tasks to the crew.
```

### 🗺️ NAMI — After Luffy creates the brief
```
You are NAMI. Read CLAUDE.md and agents/NAMI.md.
Read PROJECT_BRIEF.md and your task in /tasks/.
Write ARCHITECTURE.md, DATABASE_SCHEMA.sql, and the API contract in /handoffs/.
```

### ⚙️ ITACHI — After Nami writes the architecture
```
You are ITACHI. Read CLAUDE.md and agents/ITACHI.md.
Read ARCHITECTURE.md and your task in /tasks/.
Build the backend. When done, write your handoff to /handoffs/.
```

### 🍥 NARUTO — After Itachi writes the API contract
```
You are NARUTO. Read CLAUDE.md and agents/NARUTO.md.
Read ARCHITECTURE.md and your task in /tasks/.
Read Itachi's handoff in /handoffs/ for the API contract.
Build the frontend. When done, write your handoff to /handoffs/.
```

### 👑 HANCOCK — After Naruto finishes the UI
```
You are HANCOCK. Read CLAUDE.md and agents/HANCOCK.md.
Read Naruto's handoff in /handoffs/.
Run the app with npm run dev and review the entire interface.
Write your review to /handoffs/hancock-review-TASK-XXX.md.
```

### 🧠 SHIKAMARU — After Hancock approves
```
You are SHIKAMARU. Read CLAUDE.md and agents/SHIKAMARU.md.
Read all handoff files in /handoffs/.
Test everything. Write your QA report to /handoffs/shikamaru-report-TASK-XXX.md.
```

---

## SHORTCUT PROMPTS BY PROJECT TYPE

### Portfolio Site
```
You are LUFFY. Read CLAUDE.md and agents/LUFFY.md.
Build a portfolio website for [full name], 
[job title] at [company], specializing in [specialization].
Stack: React + Vite + Tailwind. Deploy: Vercel.
Pages: Hero, About, Experience, Skills, Projects, Certificates, Contact.
Resume PDF is at /public/resume.pdf.
```

### HR Payroll SaaS
```
You are LUFFY. Read CLAUDE.md and agents/LUFFY.md.
Build an HR + payroll SaaS app (like SalaryBox).
Company size: ~[N] employees. Industry: [industry].
Must have: Employee records, daily attendance, monthly payroll 
with Indian PF/ESI/TDS calculations, payslip PDF export, leave management.
Roles: Admin, HR Manager, Employee self-service.
Stack: React + Supabase. Deploy: Vercel.
```

### Gear Calculator
```
You are LUFFY. Read CLAUDE.md and agents/LUFFY.md.
Build a spur gear pair calculator web tool.
Inputs: Module, number of teeth (gear + pinion), pressure angle, face width.
Outputs: PCD1 & PCD2, addendum, dedendum, center distance, gear ratio, 
contact ratio, tangential/radial/axial forces.
Show all formulas + step-by-step working. Export to PDF.
Standard: IS 4460 / ISO 6336. No backend needed.
```

### Bearing Life Calculator
```
You are LUFFY. Read CLAUDE.md and agents/LUFFY.md.
Build a rolling bearing life calculator.
Inputs: Dynamic load rating C (kN), static load rating C0 (kN), 
equivalent load P (kN), speed N (RPM), bearing type (ball / roller).
Outputs: L10 life (million revolutions + hours), static safety factor, 
adjusted life with reliability factor.
Show formulas + working. Standard: ISO 281. PDF export. No backend needed.
```

### GD&T Calculator
```
You are LUFFY. Read CLAUDE.md and agents/LUFFY.md.
Build a GD&T tolerancing calculator tool.
Features: MMC, LMC, Virtual Condition, Bonus Tolerance, Resultant Condition.
Input: Feature type (hole/shaft/flat), nominal size, dimensional tolerance, 
geometric tolerance, tolerance type (position/circularity/etc.).
Show GD&T callout symbol + all calculated values + formulas.
Standard: ISO 2692. PDF export. No backend needed.
```

---

## QUICK TROUBLESHOOT

| Problem | What to type |
|---|---|
| Agent going off script | "Stop. Re-read CLAUDE.md and your agent file from the beginning." |
| Using wrong tech | "Our stack is React + Supabase only. Restart with the correct tech." |
| Agent asking too many questions | "You have enough. Make decisions autonomously and continue." |
| Naruto built UI but no Itachi backend yet | "Use mock data from src/lib/mockData.js. Itachi will replace it." |
| Calculation seems wrong | "SHIKAMARU — verify the [gear/payroll/bearing] calculation manually." |
| Deploy failed | "SHIKAMARU — check the build errors and tell me what's wrong." |

---

## CREW WORKFLOW DIAGRAM

```
YOU (Owner)
     │
     ▼
🏴‍☠️ LUFFY ─── writes PROJECT_BRIEF.md
     │          writes /tasks/*.md
     ▼
🗺️  NAMI  ─── writes ARCHITECTURE.md
     │         writes DATABASE_SCHEMA.sql
     │         writes /handoffs/nami-api-contract.md
     ▼
⚙️  ITACHI ──► builds backend (/src/lib/api/, /src/lib/calculations/)
     │          writes /handoffs/itachi→naruto-*.md
     │
     │ (ITACHI and NARUTO can work in parallel)
     │
🍥  NARUTO ──► builds frontend (/src/pages/, /src/components/)
     │          writes /handoffs/naruto→hancock-*.md
     ▼
👑  HANCOCK ─► reviews UI/UX
     │          writes /handoffs/hancock-review-*.md
     │          (sends back to NARUTO if rejected)
     ▼
🧠  SHIKAMARU ► tests everything
     │           verifies all calculations
     │           writes /handoffs/shikamaru-report-*.md
     │           (sends back to ITACHI or NARUTO if rejected)
     ▼
🚀  DEPLOY
    vercel --prod
```
