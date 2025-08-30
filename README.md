# RPR Custom Page Generator

Internal tool for creating professional custom page inserts for RPR (Realtors Property Resource) reports.

## Overview

This React application generates branded cover pages, agent bios, testimonials, and fact sheets that integrate with RPR report systems. Built for internal use with specific branding and template requirements.

## Features

- Multiple document categories (Cover Pages, Agent Bios, Testimonials, Fact Sheets)
- 19+ professional templates across all categories
- Dynamic theming system with brand color customization
- Background image gallery with curated professional imagery
- PDF generation optimized for RPR integration
- Form validation and data persistence

## Setup

### Prerequisites
- Node.js (v16+)
- npm

src/
├── components/templates/    # Template definitions by category
├── hooks/                   # State management hooks
├── services/               # PDF and background services
└── templateCategories.js  # Field and category definitions

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- Custom React hooks for state management
- HTML-to-PDF conversion

## Development

npm run dev - Development server
npm run build - Production build
npm run lint - Code linting

## Template Development
Templates are JavaScript functions returning HTML strings. Follow existing patterns in /src/components/templates/ for consistency.