# DataSphere

A comprehensive database platform for anime, movies, series, manga, and novels, similar to AniList, MyAnimeList, and IMDb.

## Features

- **Roles & Permissions**: Owner, Database Admin, Database Adder, Database Entry Moderator, Community Admin, Community Moderator, Comment Admin, Comment Moderator, Users
- **Categories**: Anime, Movies, Series, Manga, Novels
- **User Features**: Rate entries, post comments, track content (Watching/Reading, On Hold, Completed, Dropped), view rating charts
- **Database Entry Fields**: ID, Title, Type, Status, Description, Genres, Tags, Average Rating, Episodes/Duration, Studio, Language, Country, Release Date, Poster, Characters, Cast, Staff, Seasons, Related Titles
- **UI**: Glassmorphism design with custom color palette
- **Social Integration**: Discord, Twitter, Reddit links

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with credentials provider

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up PostgreSQL database (for Supabase, use your Supabase Postgres connection string)
4. Update `.env.local` with your database URL and NextAuth secrets
5. Run Prisma migrations: `npm run db:migrate`
6. Generate Prisma client: `npm run db:generate`
7. Seed the main owner account: `npm run seed`
8. Start the development server: `npm run dev`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Create and run migrations
- `npm run db:studio` - Open Prisma Studio

## Project Structure

- `app/` - Next.js app router pages and UI routes
- `app/api/` - API routes organized by feature
- `components/` - Reusable React components
- `lib/` - Utility functions and configurations
- `prisma/` - Database schema and migrations

## Route Organization

- `GET /` - Homepage
- `GET /categories/[category]` - Category listing pages for anime, movies, series, manga, novels
- `GET /entries/[id]` - Entry detail pages
- `GET /users/[id]` - User profile pages
- `GET /admin` - Admin dashboard placeholder

### API routes

- `GET /api/entries` - List entries with optional type filtering
- `POST /api/entries` - Create entries (database adder/admin/owner)
- `GET /api/entries/[id]` - Read entry details
- `PUT /api/entries/[id]` - Update entries (moderator/admin/owner)
- `DELETE /api/entries/[id]` - Delete entries (admin/owner)
- `POST /api/entries/[id]/rate` - Rate an entry
- `GET, POST /api/entries/[id]/comments` - Fetch/add comments
- `GET, POST /api/tracking` - Manage user tracking
- `GET /api/users/[id]` - Fetch user profile data
- `GET /api/users` - List users for authorized admins
- `POST /api/admin/roles` - Assign roles to users (owner only)

## Vercel Deployment

1. Push this repository to GitHub.
2. Sign in to Vercel and import the repository.
3. Ensure the root is the repository root and the framework is detected as Next.js.
4. Set environment variables in Vercel:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (e.g. `https://your-site.vercel.app`)
5. Vercel will run `npm install` and `npm run build` automatically.
6. Deploy the project and open the live site.

## Cloudflare Protection

To protect the site with Cloudflare, point your domain to Cloudflare and enable the Web Application Firewall (WAF). This app also includes middleware-based protection for login and auth endpoints, including rate limiting for `/auth/signin`, `/auth/signup`, and `/api/auth/*` requests.

For local preview and mobile testing, run `npm run dev` and use a tunnel service like localtunnel or ngrok if needed.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License