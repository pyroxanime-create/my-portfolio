## Adam Calliste — Portfolio

Interactive Next.js portfolio that showcases Figma prototypes (finance, streaming, wellness, travel, etc.), rich motion, and theme controls (dark/dim/light). Built with the App Router, Tailwind, Framer Motion, and React Three Fiber fallbacks.

## Tech Stack

- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind + custom tokens
- **Animation:** Framer Motion
- **3D / Canvas:** React Three Fiber with graceful degradation
- **UI Embeds:** Responsive Figma iframes (auto scales to 16:9)

## Local Development

```bash
npm install          # install dependencies
npm run dev          # start dev server on http://localhost:3000
npm run lint         # optional: lint the project
```

Any .env-specific values belong in `.env.local` (ignored by git).

## Preparing the Repo for GitHub

1. Make sure you are in the project root:  
   `cd "/Users/pyropenname/Desktop/portfolio copy 2"`
2. Review changes:  
   `git status -sb`
3. Stage everything you want to publish:  
   `git add .`
4. Commit with a descriptive message:  
   `git commit -m "Describe your updates"`
5. Create a GitHub repo (empty) and connect:  
   `git remote add origin https://github.com/<user>/<repo>.git`
6. Push the main branch:  
   `git branch -M main`  
   `git push -u origin main`

On subsequent updates just repeat steps 2–4 and `git push`.

## Deploying

- **Vercel (recommended):** Import the GitHub repo and deploy (auto detects Next.js). Add any env vars in the Vercel dashboard.
- **Static export:** `npm run build` followed by `npm run start` for Node hosting.
- **Other hosts:** Netlify, Render, or custom Node server work; point them at `npm run build` / `npm run start`.

## Project Structure

```
app/portfolio/Portfolio.tsx   // main portfolio surface
app/portfolio/PaySplitEmbedPhone.tsx
public/                       // static assets
next.config.ts                // Next.js configuration (+ Turbopack root override)
```

Feel free to update this README with links, case-study notes, or deployment URLs once the site is live. 
