# CLAUDE.md — The Ship's Log
> Every crew member reads this before touching anything. No exceptions.

---

## THE CREW

| Character | Role | Responsibility |
|---|---|---|
| 🏴‍☠️ **LUFFY** | Captain / PM | Leads, plans, coordinates. Never codes. |
| 🗺️ **NAMI** | Architect | Tech design, DB schema, folder structure, stack decisions |
| ⚙️ **ITACHI** | Backend Dev | All server code, APIs, database, auth, business logic |
| 🍥 **NARUTO** | Frontend Dev | All UI code, React components, pages, animations |
| 👑 **HANCOCK** | UI Reviewer | Reviews interface beauty, UX logic, visual quality |
| 🧠 **SHIKAMARU** | QA / Debug | Testing, bug hunting, formula verification, final sign-off |

**Workflow order — never skip steps:**
```
LUFFY → NAMI → ITACHI → NARUTO → HANCOCK → SHIKAMARU → 🚀 DEPLOY
```

---

## THE OWNER
- Mechanical CAD Engineer (Alstom — rolling stock, GD&T, modular design)
- Builds web apps and tools for engineers + businesses
- Does NOT write code — the crew handles everything
- Communicates in plain English

---

## TECH STACK (Fixed — do not deviate without LUFFY approval)

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Icons | lucide-react |
| State | useState / zustand (complex apps) |
| Forms | react-hook-form + zod |
| Charts | recharts |
| Animation | Framer Motion (portfolios), CSS (apps) |
| Math | mathjs |
| PDF Export | jsPDF + html2canvas |
| Backend | Supabase (primary) / Node.js + Express (complex logic) |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Payments | Stripe |
| Email | Resend |
| Deploy (FE) | Vercel |
| Deploy (BE) | Railway |
| Version Control | GitHub |

---

## PROJECT TYPES

### 1. PORTFOLIO WEBSITES
Clean, engineering-precision aesthetic. Multi-page. Mobile-first.
Pages: Hero, About, Experience, Skills, Projects, Tools, Certificates, Contact.
Must have: Resume download, contact form, fast load.

### 2. HR / PAYROLL SAAS (SalaryBox-style)
Indian payroll: PF, ESI, TDS. Roles: Admin, HR, Employee.
Features: Employee records, attendance, monthly payroll, payslip PDF, leave management.

**Indian Payroll Formula (EXACT — ITACHI must implement this):**
```
Basic Salary         = Defined per employee
HRA                  = Defined per employee (or 40-50% of Basic)
Special Allowance    = Defined per employee
Gross                = Basic + HRA + Special Allowance

PF (Employee)        = 12% × Basic (max Basic cap = ₹15,000 → max PF = ₹1,800)
PF (Employer)        = 12% × Basic (8.33% EPS + 3.67% EPF)
ESI (Employee)       = 0.75% × Gross  [only if Gross ≤ ₹21,000]
ESI (Employer)       = 3.25% × Gross  [only if Gross ≤ ₹21,000]
TDS                  = Per slab (0% / 5% / 20% / 30%)
Professional Tax     = Per state slab (Maharashtra: ₹200/month if salary > ₹10,000)

Net Salary           = Gross - PF(emp) - ESI(emp) - TDS - PT
```

### 3. GD&T TOOLS
Calculators for MMC, LMC, Virtual Condition, Bonus Tolerance.
Standard: ISO 2692. Show symbols, formulas, step-by-step working.

### 4. MECHANICAL CALCULATORS
- **Gears**: Module, teeth, pressure angle → PCD, center distance, forces, contact ratio. Standard: IS 4460 / ISO 6336
- **Bearings**: C, C0, load, speed → L10 life (hours + revolutions), static safety factor. Standard: ISO 281
- **Shafts**: Torque, bending moment → torsional stress, Von Mises, safety factor. Standard: ASME/IS 4600
All must: show formula, show working, export to PDF.

### 5. GENERAL WEB APPS

---

## CREW AUTONOMY RULES
1. Minor decisions (colors, variable names, component layout) → decide and continue
2. Major decisions (change tech stack, add new feature, remove scope) → log in DECISIONS.md then continue
3. Only stop for owner if: missing API key / unclear core business rule
4. Crew members self-assign tasks from /tasks/
5. Handoffs go to /handoffs/ — next crew member picks up automatically

---

## QUALITY BAR (non-negotiable)
- Mobile-first, responsive at 375px minimum
- Lighthouse score > 90
- All forms validated before submit
- All errors handled (no blank white screens, no "undefined")
- All calculators show formula + standard reference
- No lorem ipsum in final output
- No hardcoded secrets ever

---

## CURRENT PROJECTS
| Project | Type | Status | Repo |
|---|---|---|---|
| — | — | — | — |
