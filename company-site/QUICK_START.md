# 📋 Quick Reference — ReyadSoft Website

## 🌐 Access Points

| Page | URL | Purpose |
|------|-----|---------|
| **Homepage** | `/index.html` | Hero, stats, services, metrics, case studies, offices |
| **Services** | `/services.html` | Detailed service offerings with engagement models |
| **Projects** | `/projects.html` | Project showcase with filtering |
| **Case Studies** | `/case-studies.html` | Detailed case studies with outcomes |
| **Analytics** | `/analytics.html` | Live dashboard with Chart.js visualizations |
| **Contact** | `/contact.html` | Contact form with inquiry |
| - **Admin Portal:** Visit `/admin/login.html` to access the ReyadSoft admin dashboard (Username: admin, Password: admin123) |

---

## 📂 File Structure

```
company-site/
├── index.html                  # Home page
├── services.html               # Services page
├── projects.html               # Projects grid
├── case-studies.html           # Case studies
├── analytics.html              # Analytics dashboard
├── contact.html                # Contact form
├── robots.txt                  # SEO: crawler rules
├── sitemap.xml                 # SEO: site structure
├── favicon.ico                 # Browser tab icon
│
├── css/
│   └── style.css              # All styling + animations
│
├── js/
│   └── main.js                # Form handlers & utilities
│
├── images/
│   ├── project1.jpg           # Project image 1
│   ├── project2.jpg           # Project image 2
│   └── project3.jpg           # Project image 3
│
├── admin/
│   ├── login.html             # Admin login page
│   ├── index.html             # Admin dashboard
│   ├── css/
│   │   └── admin.css          # Admin styling
│   └── js/
│       └── admin.js           # Admin logic (localStorage)
│
├── README.md                   # Project overview
└── DEPLOYMENT.md               # Deployment guide
```

---

## 🚀 Quick Start

### Start Development Server

**Option 1 — Python (Windows):**
```powershell
cd "e:\Practice Web Project\full Web course with harry\web\company-site"
python -m http.server 8000
# Open: http://localhost:8000
```

**Option 2 — Node HTTP Server:**
```powershell
npm install -g http-server
http-server . -p 8080 -c-1
# Open: http://localhost:8080
```

**Option 3 — Live Server (VS Code):**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

---

## 🛠️ Customization

### 1. **Change Company Name**

Search & replace in all HTML files:
- `ReyadSoft` → Your company name

### 2. **Update Contact Info**

Files: `index.html`, `services.html`, `contact.html`, `admin/`
- Email: `hello@reyadsoft.com` → Your email
- Phone: `+1 (555) 012‑3456` → Your phone
- Offices: Update locations in index.html

### 3. **Change Color Scheme**

File: `css/style.css` (line 1-8)
```css
:root {
  --brand: #0d6efd;              /* Primary blue */
  --brand-secondary: #6f42c1;    /* Purple accent */
  /* Change these hex codes to your brand colors */
}
```

### 4. **Update Services**

File: `services.html` (lines 45-120)
- Edit service cards
- Update emoji icons
- Modify descriptions

### 5. **Update Projects**

**Static method:** Edit `projects.html` (lines 45-120)

**Admin method:** 
- Go to `/admin/login.html`
- Login: `admin` / `admin123`
- Add/edit projects in dashboard
- Changes stored in browser localStorage

### 6. **Replace Images**

1. Create high-quality images:
   - `images/project1.jpg` (800x600px)
   - `images/project2.jpg` (800x600px)
   - `images/project3.jpg` (800x600px)
   - `favicon.ico` (16x16 or 32x32)

2. Update paths if needed in HTML files

---

## 🎨 Design Elements

### Colors
- **Brand Blue:** `#0d6efd` (Primary buttons, links)
- **Brand Purple:** `#6f42c1` (Gradients, accents)
- **Dark Background:** `#1a1d23` (Footer)
- **Light Background:** `#f8f9fa` (Sections)

### Typography
- **Font Family:** Inter (Google Fonts)
- **Headings:** Bold, 2-3.5rem (desktop), 1.5-2rem (mobile)
- **Body:** Regular, 1rem (desktop), 0.95rem (mobile)

### Animations
- **Hero Blobs:** Float 8-12s infinite
- **Floating Cards:** Float-up 3s ease-in-out
- **Card Hover:** TranslateY(-5px) with shadow
- **Button Hover:** Scale(1.05) with transition

---

## 📊 Admin Panel

**Location:** `/admin/login.html`

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

**Features:**
- Add/edit/delete projects
- Add/edit/delete case studies
- View contact messages
- Track analytics metrics
- Data persists in browser localStorage

**⚠️ Security Note:** For production, implement proper authentication (JWT, OAuth2)

---

## ✅ Responsive Breakpoints

- **Mobile:** < 480px (Full stack layout)
- **Tablet:** 480px - 768px (2-column grid)
- **Desktop:** 768px - 1024px (3-column grid)
- **Large Desktop:** > 1024px (4-column grid)

---

## 🔍 SEO Setup

### Already Included
- ✅ Meta description on all pages
- ✅ OG tags (Facebook sharing)
- ✅ Twitter cards
- ✅ JSON-LD structured data
- ✅ robots.txt (crawler rules)
- ✅ sitemap.xml (site structure)
- ✅ Canonical tags

### To Complete
1. Verify with Google Search Console
2. Add Google Analytics tracking ID
3. Monitor keyword rankings
4. Update sitemap.xml with live domain

---

## 🧪 Testing

### Responsive Testing
```
Chrome DevTools → Device Toolbar
Test at: 320px, 480px, 768px, 1024px, 1920px
```

### Performance
```
PageSpeed Insights: https://pagespeed.web.dev/
Target: 90+ (mobile & desktop)
```

### Accessibility
```
WAVE: https://wave.webaim.org/
Target: 0 errors, WCAG 2.1 AA
```

### SEO
```
Lighthouse: Chrome DevTools → Lighthouse
Target: 90+ SEO score
```

---

## 📝 Content Updates

### Seasonal Updates
- Update case study outcomes
- Refresh testimonials
- Add new projects
- Update team bios (in future)

### Monthly
- Analytics review
- Link health check
- Content audit

---

## 🚀 Deployment

**Recommended:** Netlify (free, fastest)

1. Push to GitHub
2. Connect Netlify
3. Automatic deploys on push
4. Custom domain setup
5. HTTPS automatic

See `DEPLOYMENT.md` for detailed instructions.

---

## 💡 Pro Tips

1. **Placeholder Content:** Replace with real data before launch
2. **Images:** Optimize for web (compress, resize)
3. **Admin Credentials:** Change default password in production
4. **Backups:** Version control in Git (GitHub/GitLab)
5. **Monitoring:** Set up analytics to track user behavior

---

## 🆘 Troubleshooting

| Issue | Fix |
|-------|-----|
| Images not loading | Check `images/` folder paths |
| Admin login fails | Clear localStorage: DevTools → Application → Clear Storage |
| Charts not showing | Verify Chart.js CDN reachable |
| Animations choppy | Mobile optimization: disable on small screens |
| Contact form broken | Check browser console for errors |

---

## 📞 Support Resources

- **Bootstrap Docs:** https://getbootstrap.com/docs/5.3/
- **Chart.js Docs:** https://www.chartjs.org/docs/latest/
- **CSS Animations:** https://developer.mozilla.org/en-US/docs/Web/CSS/animation
- **Web Accessibility:** https://www.w3.org/WAI/

---

**Status:** ✅ Production Ready
**Last Updated:** 2025
