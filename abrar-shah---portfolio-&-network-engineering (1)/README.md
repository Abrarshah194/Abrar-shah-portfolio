# Abrar Shah - Full-Stack Professional Portfolio & CMS Platform
### Brand: EXPORTON NETWORKS

A production-ready, full-stack personal portfolio and Content Management System (CMS) engineered for **Abrar Shah** (BS Computer Science, AWKUM · CGPA 3.87). Built with a high-performance modern tech stack, REST APIs, password-hashed authentication, media uploads, and granular administrative control.

---

## 1. Project Overview

This platform transforms Abrar Shah's academic and practical network engineering journey into a corporate, high-technology web application under the professional banner of **EXPORTON NETWORKS**.

### Primary Target Areas:
- **Academic Distinction**: BS Computer Science at Abdul Wali Khan University Mardan (AWKUM, 2023–2027, current CGPA 3.87/4.00), DIT 2024 (Grade A, 753 marks), FSc Pre-Medical (Grade A1, 918/1100), Matric Science (Grade A, 868/1100).
- **Core Engineering**: Cisco Packet Tracer, GNS3, VLAN 802.1Q, STP, OSPF routing, ACLs, NAT/PAT, DHCP/DNS, SNMP monitoring, and Python network automation with Netmiko.
- **Practical Mobility**: Official Motor Car Driving with LTV License (2 years verified experience).
- **Featured Project Spotlight**: Automated Network Device Configuration and Monitoring.

---

## 2. Key Features

### Public Website
- **Hero & Interactive Network Canvas**: Dynamic HTML5 Canvas rendering animated routers, switches, and packet transmissions with prefers-reduced-motion support.
- **About & Vision**: Professional bio, career goals, personal strengths, and downloadable CV actions.
- **Categorized Skills**: Interactive tabs for Networking, Software, Simulation Tools, Office, and CAD with percentage visualizations.
- **Services Showcase**: Network Configuration, Troubleshooting, Monitoring, IT Support, and Web Development with interactive consultation triggers.
- **Projects & Labs**: Filterable projects catalog, detail modals with architecture breakdowns, and featured spotlight.
- **Academic Timeline**: Chronological education track highlighting degrees, boards, marks, and GPA.
- **Experience Timeline**: Hands-on network configuration labs and commercial LTV vehicle operation.
- **Certificates & Diplomas**: Searchable credentials with verification URLs and credential IDs.
- **Interactive & Printable A4 Resume**: Modeled after Abrar Shah's CV with navy and royal blue styling, ready for instant A4 printing and PDF export.
- **Technical Blog**: Markdown-rendered networking and automation writeups with view tracking and estimated read times.
- **Validated Contact System**: Live message dispatch stored in the database with rate limiting and floating WhatsApp button (when configured).
- **Global Search**: Quick search modal across projects, articles, and credentials.
- **Dark & Light Mode**: Accessible contrast ratios with localStorage persistence.

### Administrator CMS Dashboard (`/admin`)
- **Secure Authentication**: Hashed password checks with bcrypt, secure JWT tokens, and rate-limited endpoints.
- **KPI Dashboard**: Instant counters for projects, published articles, inbound messages, and skills.
- **Full CRUD Management**:
  - Profile & Brand Settings
  - Academic Education CRUD
  - Experience CRUD
  - Skills & Proficiency CRUD
  - Services & Deliverables CRUD
  - Projects & Architecture Showcase CRUD
  - Certificates & Accreditations CRUD
  - Blog & Markdown Articles CRUD (Draft/Publish states)
  - Testimonials CRUD
  - Inbound Message Manager (Read, Archive, Delete, Mailto Reply)
  - Social Media Links CRUD
  - Media Library (Real file uploads via Multer to disk with instant URL generation)
  - Website & SEO Metadata Editor (Meta titles, OpenGraph image, Google Analytics ID)
  - Security (Administrative password rotation)

---

## 3. Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS 4, Lucide React icons, Motion
- **Backend**: Node.js, Express.js, TypeScript
- **Database / Persistence**: Relational file-backed JSON database engine with atomic disk writing, schema validation, and automatic directory initialization
- **Authentication**: bcryptjs password hashing, JSON Web Tokens (JWT), HTTP-only cookies
- **File Uploads**: Multer with MIME and size verification
- **Validation**: Zod schema validation
- **Dev & Build Tooling**: Vite 8, TSX, esbuild

---

## 4. Admin Credentials & Setup

An initial administrator account is automatically initialized upon startup:

- **Login URL**: `/admin` (or click the **Admin** button in the top navigation bar)
- **Default Email**: `admin@exporton.net`
- **Default Password**: `Admin@123456`

*(You can change the password at any time inside the Admin Panel under **Security & Password**).*

---

## 5. Environment Variables (`.env`)

Refer to `.env.example`:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET="your-secure-jwt-secret-key"
SESSION_SECRET="your-session-cookie-secret"
ADMIN_EMAIL="admin@exporton.net"
ADMIN_INITIAL_PASSWORD="Admin@123456"
UPLOAD_DIR="./uploads"

# Optional Email / Notification settings
EMAIL_HOST="smtp.example.com"
EMAIL_PORT="587"
EMAIL_USER="notifications@exporton.net"
EMAIL_PASSWORD=""
EMAIL_FROM="Abrar Shah Portfolio <contact@exporton.net>"
```

---

## 6. Local Development & Running

### Install Dependencies:
```bash
npm install
```

### Start Development Server:
Runs Express backend on port 3000 with Vite middleware integrated for instant live reloading:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production:
```bash
npm run build
```

### Run Production Server:
```bash
npm run start
```

---

## 7. Security Architecture

1. **Authentication Protection**: Passwords hashed with bcrypt; routes guarded with `requireAuth` middleware.
2. **Rate Limiting**: In-memory rate limiting throttles brute-force attempts on `/api/auth/login` and `/api/contact`.
3. **Safe Uploads**: Only image formats (`.jpg`, `.png`, `.webp`, `.svg`, `.gif`) and `.pdf` documents under 10MB are permitted.
4. **Data Isolation**: Secrets are kept on the server; client never receives password hashes.
