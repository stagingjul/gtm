# GTM - Football Teams & Players Portal

A stunning Next.js application with heavy animations and beautiful design, featuring football teams and players data from Supabase.

## Features

- 🎨 **Beautiful Design** - Modern UI with gradient backgrounds and glassmorphism effects
- ⚡ **Heavy Animations** - Powered by Framer Motion for smooth, engaging interactions
- 🏆 **5 Pages Total**:
  - 3 Static Pages: About, Services, Contact
  - 2 SSR Pages: Teams List, Players by Team (using Supabase)
- 📊 **Real-time Data** - Football players data fetched from Supabase
- 🎯 **Responsive** - Works perfectly on all devices
- 📈 **Analytics** - Google Analytics (GA4) and Google Tag Manager integrated

## Tech Stack

- **Framework**: Next.js 15.5.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Database**: Supabase
- **Font**: Geist Sans & Geist Mono

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. The environment variables are already configured in `.env.local`:
- Supabase URL
- Supabase Anon Key

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
├── page.tsx          # Home page with navigation
├── about/            # Static page - About
├── services/         # Static page - Services
├── contact/          # Static page - Contact
├── teams/            # SSR page - Teams list from Supabase
└── players/[team]/   # SSR page - Players filtered by team
lib/
└── supabase.ts       # Supabase client configuration
```

## Database Schema

The app uses a `players` table in Supabase with the following structure:

```sql
table players (
    id bigint generated always as identity primary key,
    name text not null,
    position text,
    team text,
    goals int default 0,
    created_at timestamp with time zone default now()
);
```

## Pages

1. **Home** - Landing page with animated navigation cards
2. **About** - Company information with feature cards
3. **Services** - Pricing and service offerings
4. **Contact** - Contact form with info cards
5. **Teams** - List of all teams with stats (SSR from Supabase)
6. **Players** - Detailed player cards filtered by team (SSR from Supabase)

## Animation Features

- Floating background orbs
- Particle effects
- Card hover animations
- Text gradient animations
- Smooth page transitions
- Interactive button states
- Rotating elements
- Scale and position animations

## Analytics Integration

The application includes:

- **Google Analytics (GA4)** - Tracking ID: `G-P6E7Q30JBT`
- **Google Tag Manager** - Container ID: `GTM-MV9BWR29`

Both analytics tools are configured with Next.js `Script` component using the `afterInteractive` strategy for optimal performance. The GTM noscript fallback is also included for users with JavaScript disabled.

## Build

```bash
npm run build
npm start
```

Enjoy exploring the beautiful GTM portal! ⚽✨
