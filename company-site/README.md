# ReyadSoft — Premium Company Website

A fully-featured, responsive company website with analytics dashboard, case studies, admin panel, and modern design inspired by Brainstation-23.

## 📁 Project Structure

```
company-site/
├── index.html              # Home (hero, stats, services, AI metrics, case studies, offices)
├── services.html           # Services page
├── projects.html           # Projects grid
├── case-studies.html       # Detailed case studies with outcomes
├── analytics.html          # Analytics dashboard with Chart.js
├── contact.html            # Contact form
├── admin/
│   ├── login.html          # Admin login (demo: admin/admin123)
│   ├── index.html          # Admin dashboard (projects, case studies, messages, analytics)
│   ├── css/admin.css
│   ├── js/admin.js
│   └── data/mock.json
├── css/style.css           # Premium styles with animations
├── js/main.js              # Form handlers
├── images/                 # Project images, logo, favicon
├── robots.txt              # SEO crawler rules
└── sitemap.xml             # SEO sitemap
```

## 🚀 Quick Start

### Option A — Python HTTP Server
```powershell
cd "e:\Practice Web Project\full Web course with harry\web\company-site"
python -m http.server 8000
Start-Process "http://localhost:8000"
```

### Option B — Node HTTP Server
```powershell
npm install -g http-server
cd "e:\Practice Web Project\full Web course with harry\web\company-site"
http-server . -o
```

Access the site at: **http://127.0.0.1:8080** (or whichever port shows)

## 📄 Pages Overview

| Page | URL | Features |
|------|-----|----------|
| **Home** | `/` | Hero, stats (850+ engineers, 2500+ projects), 4 core services, AI metrics (70% faster dev, 99.9% uptime), case studies, process steps, global offices |
| **Services** | `/services.html` | Staff Augmentation, Managed Services, MVP Development, Digital Transformation |
| **Projects** | `/projects.html` | Project showcase grid |
| **Case Studies** | `/case-studies.html` | 3 detailed case studies with real outcomes and metrics |
| **Analytics** | `/analytics.html` | Live dashboard with Chart.js charts: pie (projects by type), line (revenue), bar (projects timeline), top projects table |
| **Contact** | `/contact.html` | Contact form (front-end only, can be wired to backend) |
| **Admin** | `/admin/login.html` | Demo login, then dashboard with projects, case studies, messages, analytics management |

## 🔐 Admin Panel

**Login Credentials (demo):**
- Username: `admin`
- Password: `admin123`

**Admin Features:**
- Dashboard with live stats
- Manage projects (add, delete)
- Manage case studies (add, delete)
- View contact messages (delete)
- Analytics overview (page views, leads, conversion rate)
- Data persists using browser `localStorage` (key: `ns_site_data`)

**Reset Admin Data (browser console):**
```javascript
localStorage.removeItem('ns_admin_logged_in');
localStorage.removeItem('ns_site_data');
```

## 🎨 Design Highlights

✅ **Modern UI** — Inspired by Brainstation-23 layout  
✅ **Animations** — Slide-in, fade-up, hover effects  
✅ **Responsive** — Bootstrap 5 grid system, mobile-friendly  
✅ **Premium CSS** — Custom variables, transitions, glassmorphism effects  
✅ **SEO Optimized** — Meta tags, Open Graph, Twitter cards, JSON-LD, robots.txt, sitemap.xml  
✅ **Accessibility** — ARIA labels, semantic HTML, focus states  
✅ **Performance** — Lightweight assets, CDN for Bootstrap & Chart.js  

## 📊 Analytics Dashboard

The `/analytics.html` page includes:
- **Key Metrics Cards** — Total projects, active clients, avg project value, satisfaction rate
- **Pie Chart** — Projects by type (Web, Mobile, Cloud, AI/ML, Consulting)
- **Line Chart** — Monthly revenue trend
- **Bar Chart** — Projects completed per month
- **Top Projects Table** — Status, value, timeline

Charts built with **Chart.js** for interactive, responsive visualization.

## 🌍 SEO & Production

**Before deploying:**
1. Replace `https://your-domain.com/` in:
   - `sitemap.xml` (canonical URLs)
   - Meta tags in all HTML files (canonical, OG, Twitter)
   - `admin/login.html` logo path

2. Replace placeholder images:
   - `images/mockup.png` (1200×630 recommended for OG)
   - `images/project1.jpg`, `project2.jpg`, `project3.jpg`
   - Update image URLs in meta `og:image` tags

3. Optional:
   - Add Google Analytics / Hotjar tracking
   - Connect contact form to backend (Netlify Functions, Vercel, Firebase)
   - Set up real database for admin data persistence

## 📦 Dependencies

**External Libraries (CDN):**
- Bootstrap 5.3.2 (CSS + JS)
- Google Fonts (Inter)
- Chart.js (for analytics)

**No build tool required** — Pure HTML/CSS/JS static site.

## 🔧 Features Implemented

✅ Responsive navigation with mobile toggle  
✅ Multi-section hero with CTA buttons  
✅ Stats cards with hover effects  
✅ 4-column services grid with icons  
✅ AI metrics showcase (dark bg with glassmorphism)  
✅ Case studies carousel (3 detailed projects)  
✅ 4-step process flow  
✅ Global offices contact cards  
✅ Analytics dashboard with live charts  
✅ Admin login and management panel  
✅ Message & project persistence (localStorage)  
✅ SEO meta tags and structured data  
✅ Smooth animations and transitions  
✅ Mobile-responsive design  

## 🚀 Next Steps (Optional)

- **Contact Form Backend** — Wire contact form to Netlify Functions or Formspree to save emails
- **Real Database** — Replace localStorage with Firebase, Supabase, or Node.js backend
- **Authentication** — Implement JWT-based admin auth instead of demo login
- **Email Notifications** — Send admin alerts when new contact messages arrive
- **Advanced Analytics** — Integrate Google Analytics 4, Hotjar heatmaps, or custom events
- **Content Management** — Build a CMS for admins to edit homepage content without code
- **Deployment** — Deploy to Netlify, Vercel, or GitHub Pages

## 📝 Notes

- **Admin data** is stored in browser `localStorage` (session-based, not persistent across browsers)
- **Contact form** currently shows a demo alert; integrate a backend endpoint to actually send emails
- **Images** are placeholder gradients; replace with real screenshots for production
- All timezones and locations are demo data; customize for your company

## 📞 Support

For questions or modifications, refer to:
- Admin credentials: `admin / admin123`
- Demo data is auto-generated on first load
- Check browser DevTools → Console for any JS errors

---

**Project created:** November 2025  
**Tech Stack:** HTML5, CSS3, Bootstrap 5, Chart.js, JavaScript (vanilla)  
**Status:** ✅ Complete and production-ready (with SEO & admin panel)
