# TextileFlow Pro — Enterprise Wholesale Textile ERP

[![React](https://img.shields.io/badge/React-18.x-61dafb.svg?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646cff.svg?style=flat&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8.svg?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-crimson.svg)](#)

A high-performance, enterprise-grade Enterprise Resource Planning (ERP) platform meticulously designed for wholesale textile manufacturers, saree houses, and lehenga manufacturing hubs (Surat, Ahmedabad, Navsari).

Built from the ground up to solve complex textile supply chain bottlenecks: multi-stage job work tracking, atomic inventory reservations, true landed cost BOM calculation, GST e-Invoicing, and WhatsApp broadcast marketing.

---

## 🚀 Key Highlights & Architecture

- **Clean Minimalist Design System**: Obsidian dark aesthetic inspired by Apple and Linear, zero visual clutter, fluid transitions, and responsive mobile-ready layout.
- **Section 22 Mathematical Proof Engine**: End-to-end verified accounting proof (`LH-101` Landed Cost ₹1,800, Wholesale ₹2,400, 25.0% Gross Margin, ₹15,000 net profit, ₹30,000 bank advance allocation).
- **Atomic Stock Reservation**: `Available Stock = Physical QC Pass − Active Reservations`. Prevents overselling during high-volume wholesale booking rushes with atomic locking simulation.
- **True Landed Cost BOM Engine**: Multi-component Bills of Material (Fabric, Embroidery, Khatla Handwork, Stitching, Dupatta, Luxury Packaging, and Inward Freight).
- **Multi-Stage Job Work Tracking**: Track material issues, job work inward, rework, and wastage with **CGST Rule 45 Statutory Job-work Delivery Challan** generation.
- **Quality Control (QC) & 4-Way Inward**: Inward GRN verification with 4-way classification: *Accepted*, *Hold*, *Rework*, and *Rejected* (with automatic debit note generation).
- **GST Compliance & Invoicing**: Comprehensive GST invoice generator (HSN 5407 / 6204), e-Invoice IRN & e-Way bill readiness, and printable tax invoices.
- **Credit Limit & Risk Guardrails**: Real-time customer exposure limits (Unpaid Invoices + Committed Orders vs. Sanctioned Credit Limits).
- **WhatsApp Marketing & AI Drafter**: 24-hour service window badges, opt-in verified customer broadcasts, and one-click order drafting.
- **Role-Based Access Control (RBAC)**: Dedicated viewpoints for 7 roles (Owner/Executive, Production/Purchasing, Store & QC, Sales Executive, Logistics & Dispatch, Finance & Accounts, and Artisan/Vendor).

---

## 📦 System Modules

1. **Executive Dashboard**: Live KPIs (Invoiced Revenue, Real Landed COGS, Real Gross Profit, Margin %, Outstanding Receivables, Available Stock Units), 4-way top seller analytics, and exception queues.
2. **Design & Sample Catalog**: Versioned garment profiles (V1, V2), physical sample lending register with due dates, and watermarked digital catalog links.
3. **Khatas & Procurement**: Suppliers, jobbers, and master artisans with Purchase Orders, color/size tolerances, and 3-way matching.
4. **Job Work Pipeline**: Material issue, embroidery, handwork, stitching, and finishing tracking with statutory Form 45 delivery challan generation.
5. **Quality Control (QC)**: Fabric roll and stitched set inspections with shade consistency, defect logging, and instant ledger updates.
6. **Stock & Reservations**: Live SKU balances, rack/bin locations, atomic lock simulation, and barcode/QR scanner integration.
7. **Sales Orders**: Tiered wholesale pricing (Tier 1 vs. Tier 2), order confirmation, backorders, and credit limit validations.
8. **Packing & Dispatch**: Pick lists, carton/bale packaging, tamper-proof seal logging, and transporter LR/AWB booking tracking.
9. **Finance & Billing**: Real landed cost breakdown, GST invoice generation, advance allocations, and payment reconciliation.
10. **WhatsApp Marketing**: Broadcast campaigns, opt-in filter, approved templates, and conversational AI order generation.
11. **Audit Trail**: Immutable system activity log recording actor, IP, timestamp, and payload changes.

---

## 🛠️ Tech Stack

- **Frontend Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS + Custom CSS Variables (Obsidian Dark Theme)
- **Icons**: Lucide React
- **State Management**: Reactive React Context with automatic `localStorage` persistence
- **Build Tool**: Vite with ESBuild

---

## ⚡ Quick Start

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation
```bash
# Clone the repository
git clone https://github.com/yogeshkukadiya92-stack/Textileflow-pro.git
cd Textileflow-pro

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Building for Production
```bash
# Generate optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 🔒 License & Copyright

Copyright © 2026 Yogesh AI Hub / TextileFlow Pro. All rights reserved.
Developed for wholesale textile operations and high-volume garment manufacturing enterprises.
