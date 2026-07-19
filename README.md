# IOE Student Hub

> Syllabi, course details, notes and official links for the Institute of Engineering (IOE), Tribhuvan University — [ioe.santoshb.com.np](https://ioe.santoshb.com.np)

## Stack

- [React 19](https://react.dev) + [TanStack Start](https://tanstack.com/start) (SSR, file-based routing via TanStack Router)
- [Tailwind CSS v4](https://tailwindcss.com) with a semantic design-token theme (`src/styles/app.css`)
- [MDX](https://mdxjs.com) for course syllabi, notes and legal pages (`src/content/`)
- [Paraglide](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) i18n — UI strings live in `messages/en.json`, compiled to `src/paraglide/` at build time
- TypeScript, strict mode

## Development

```bash
pnpm install       # install dependencies
pnpm dev           # dev server at localhost:3000
pnpm build         # production build
pnpm preview       # preview the production build

pnpm typecheck     # tsc --noEmit
pnpm lint          # eslint
pnpm format        # prettier + eslint --fix
```

Commits follow [Conventional Commits](https://www.conventionalcommits.org) — enforced by commitlint via husky, with lint-staged running Prettier/ESLint on staged files.

## Project layout

```
messages/       # Paraglide message catalogue (en.json)
src/
  components/   # shared building blocks: layout/, ui/ (Button, Input, Container, …), mdx/, providers/
  content/      # MDX content: courses/, notes/, pages/ (privacy, terms)
  data/         # cross-feature data (site config, generated course index)
  features/     # feature modules: <feature>/{components,helpers,data,types}
  lib/helpers/  # shared static helper classes (SeoHelper, FormatHelper, …)
  paraglide/    # generated i18n runtime (gitignored)
  routes/       # file-based routes, one folder per section
  styles/       # Tailwind theme tokens and MDX typography
scripts/        # content migration, sitemap + brand asset generation
```

## Contributing content

Courses live in `src/content/courses/*.mdx` (frontmatter: `slug`, `code`, `title`, `objective`), notes in `src/content/notes/<course>--<note>.mdx`. Program curricula are structured data in `src/data/programs.ts`. Open a PR or file an issue with your material.

## Disclaimer

Independent, student-run project — not affiliated with IOE or Tribhuvan University. Always verify exam-critical information on official sources.
