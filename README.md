# Ticketa - Premium Event Ticketing Platform

![Ticketa Banner](/public/banner-placeholder.png)

Ticketa is a modern, full-stack event ticketing platform designed to provide a seamless experience for event creators and attendees. Built with **Next.js 14**, **Supabase**, and **Tailwind CSS**, it features a premium UI, real-time updates, and robust security.

## 🚀 Features

- **Discovery & Booking**:
  - Dynamic Hero Section with immersive visuals.
  - Real-time search and filtering (by category, location, venue).
  - Premium Event Cards with live status indicators (Available/Sold Out).
  - Smooth animations and glassmorphism UI elements.
- **Event Management**:
  - Create and manage events with ease.
  - Secure image uploads for event banners.
  - Real-time ticket sales tracking.
- **Security & Performance**:
  - Secure authentication via Supabase Auth.
  - Row Level Security (RLS) for data protection.
  - Optimized SEO with dynamic metadata, `robots.txt`, and `sitemap.xml`.
  - Responsive design for all devices.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion (animations).
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions).
- **State Management**: React Query (TanStack Query), Context API.
- **Styling**: Custom Tailwind Theme, CSS Variables, `Outfit` font.
- **Deployment**: Vercel.

## ⚡ Getting Started

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/ticketa.git
    cd ticketa
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Set up environment variables**:
    Create a `.env.local` file and add your Supabase credentials:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server**:

    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🧪 Verification

To ensure code quality and build stability:

- **Linting**: `npm run lint`
- **Build**: `npm run build`

## 📄 License

This project is licensed under the MIT License.
