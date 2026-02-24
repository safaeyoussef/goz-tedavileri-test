# Visual Identity & UX/UI Architecture: goztedavileri.com

## 1. Core Framework & Performance
- **Framework:** Astro (Static Site Generation for sub-second load times).
- **Responsiveness:** Fluid grid system using CSS Flexbox and Grid. Hardcoded 100% responsiveness across Mobile (360px+), Tablet (768px+), and Desktop (1200px+).
- **Animations:** 100% animated transitions using Framer Motion or View Transitions API for "soft" entry effects.

## 2. Color Palette & Typography
- **Primary:** #0056B3 (Deep Trust Blue) - Evokes medical authority.
- **Secondary:** #E3F2FD (Soft Sky Blue) - Used for backgrounds to reduce eye strain.
- **Accent:** #00C853 (Health Green) - Used for Call-to-Action (CTA) buttons.
- **Typography:** Use "Inter" or "Readex Pro" (Google Fonts) for the entire site to ensure maximum readability.
  - **Scale:** - H1: 2.5rem (Bold)
    - H2: 2rem (Semi-bold)
    - H3: 1.5rem (Medium)
    - Body/Tags: 1rem (Regular)

## 3. Brand Assets (Antigravity Generation Task)
- **Logo A (Header):** Professional vector icon combining an eye silhouette with a digital pulse/node. Colorful (Primary Blue + Accent Green).
- **Logo B (Footer):** Same silhouette, converted to 100% Flat White.

## 4. Component Structure
- **Header:** Sticky glassmorphism effect. Menu: Ana Sayfa, Tedaviler, Güncel Haberler, Göz Testi, İletişim.
- **Footer:** 4-Column Layout. 
  - Col 1: White Logo + Social Icons (FontAwesome/Lucide). 
  - Col 2: Quick Links. 
  - Col 3: Top Treatments. 
  - Col 4: Contact Info with Icons.
- **Sticky Elements:** - WhatsApp Button (Floating Right, #25D366).
  - Treatment Pages: Sticky Sidebar Application Form.

## 5. Vocabulary for Implementation
- **CLS (Cumulative Layout Shift):** Preventing elements from jumping around while loading.
- **Flexbox:** A layout mode for aligning items even when their size is unknown.
- **Negative Space:** Ensuring plenty of "white space" so the user doesn't feel overwhelmed.