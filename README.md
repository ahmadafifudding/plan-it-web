# PLANIT

A planner for to-dos, events and the money around them. This is the Next.js rebuild of [PLANIT](https://github.com/ahmadafifudding/plan-it), which I first built in PHP.

## Status

Early, and not deployed yet.

**Working now**

- Sign up with a name, email and password, then verify the email with a one-time code sent through Resend.
- Sign in with email and password.
- A to-do list for each account: add a to-do and tick it off.

**Planned**

- Events with a date and a location.
- Payments recorded against an event.

The tables for events and payments are already in the schema. Their screens aren't built yet.

## Stack

- Next.js 15 (App Router, Server Actions), React 19 and TypeScript
- Tailwind CSS 4, Headless UI and Heroicons
- Better Auth: email and password, email OTP verification and the admin plugin
- Drizzle ORM on Neon serverless Postgres
- Resend for verification emails
- React Hook Form and Zod for forms

## Run it locally

You need Node.js 20 or later, pnpm, a Postgres database (a free Neon project works) and a Resend API key.

1. Install the dependencies:

   ```bash
   pnpm install
   ```

2. Create `.env.local` in the project root:

   ```bash
   DATABASE_URL=postgres://user:password@host/dbname
   RESEND_API_KEY=re_xxxxxxxx
   BETTER_AUTH_SECRET=any-long-random-string
   BETTER_AUTH_URL=http://localhost:3000
   ```

3. Create the tables:

   ```bash
   pnpm drizzle-kit migrate
   ```

4. Start the dev server:

   ```bash
   pnpm dev
   ```

5. Open [localhost:3000/register](http://localhost:3000/register) to create an account. After that, `/` takes you to your to-do list, or to `/login` when you're signed out.

Verification emails are sent from the address set in `lib/auth.ts`. Change it to an address on a domain you've verified in Resend, or the codes won't arrive.

## Project layout

```
app/(auth)/       login, register and verify-otp pages
app/(app)/home/   the to-do list
app/api/auth/     Better Auth route handler
lib/auth.ts       Better Auth server config
lib/actions/      server actions for to-dos
database/         Drizzle client and the app's tables
auth-schema.ts    Better Auth's tables
drizzle/          SQL migrations
```

## Author

Built by [Ahmad Afifuddin](https://github.com/ahmadafifudding).
