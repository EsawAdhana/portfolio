  # HumanBehavior — Local Setup Notes

  Reference for how HumanBehavior (HB) session tracking was installed on this
  portfolio against a **fully local** HB stack. Nothing here is deployed; the SDK,
  the ingestion server, the dashboard, and the database all run on this machine.

  Last updated: 2026-06.

  ---

  ## TL;DR

  - This site embeds the `humanbehavior-js` SDK, built locally from the HB monorepo
    (not the published npm package).
  - It records browser sessions (rrweb) and POSTs them to a local ingestion server
    at `http://localhost:8000`.
  - You view the data in the local HB dashboard at `http://localhost:3000`.
  - Because nothing is deployed, the normal "one command" customer onboarding
    doesn't apply — the SDK was wired in manually (see below).

  ---

  ## What changed in THIS repo

  Total footprint is small:

  | File | Change |
  | --- | --- |
  | `app/components/HumanBehaviorInit.tsx` | **New.** Client component that calls `HumanBehaviorTracker.init(apiKey, { ingestionUrl })` once on mount. No-ops if no key is set. |
  | `app/layout.tsx` | Imported and mounted `<HumanBehaviorInit />` inside `<body>`. |
  | `.env.local` | Added `NEXT_PUBLIC_HB_API_KEY` and `NEXT_PUBLIC_HB_INGESTION_URL`. |
  | `package.json` / `package-lock.json` | Added `humanbehavior-js` and `@humanbehavior/core` as local `file:` tarball dependencies. |

  ### The initializer

  `app/components/HumanBehaviorInit.tsx`:

  ```tsx
  "use client";

  import { useEffect } from "react";
  import { HumanBehaviorTracker } from "humanbehavior-js";

  let initialized = false;

  export default function HumanBehaviorInit() {
    useEffect(() => {
      if (initialized) return;
      const apiKey = process.env.NEXT_PUBLIC_HB_API_KEY;
      if (!apiKey) return;
      initialized = true;
      HumanBehaviorTracker.init(apiKey, {
        ingestionUrl:
          process.env.NEXT_PUBLIC_HB_INGESTION_URL ?? "http://localhost:8000",
      });
    }, []);
    return null;
  }
  ```

  Why it's shaped this way:
  - `"use client"` — the SDK records the DOM, so it only runs in the browser.
  - `initialized` guard — React dev mode renders effects twice; this prevents a
    double `init`.
  - early return on missing key — the site never breaks if the key is absent.

  ### Env vars (`.env.local`)

  ```
  NEXT_PUBLIC_HB_API_KEY=hb_dev_...     # local project key (see "Getting a key")
  NEXT_PUBLIC_HB_INGESTION_URL=http://localhost:8000
  ```

  ---

  ## Where the SDK came from (local build)

  The SDK is **built from source** in the HB monorepo instead of installed from npm,
  because there are local/unpublished changes and nothing is deployed.

  Monorepo location: `/Users/esawadhana/Projects/HumanBehavior/humanbehavior-v2`
  SDK submodule: `humanbehavior-js/` (packages: `core`, `browser`, `react`, `wizard`)

  Steps used to produce the tarballs:

  ```bash
  cd /Users/esawadhana/Projects/HumanBehavior/humanbehavior-v2
  git submodule update --init --recursive       # SDK lives in a git submodule
  npm --prefix humanbehavior-js install
  cd humanbehavior-js
  npx turbo build --filter=humanbehavior-js      # builds @humanbehavior/core + humanbehavior-js
  (cd packages/core    && npm pack --pack-destination /tmp/hb-pkgs)
  (cd packages/browser && npm pack --pack-destination /tmp/hb-pkgs)
  ```

  Then, in this repo:

  ```bash
  npm install /tmp/hb-pkgs/humanbehavior-core-0.7.0.tgz \
              /tmp/hb-pkgs/humanbehavior-js-0.7.0.tgz
  ```

  Notes / gotchas discovered:
  - The `humanbehavior-js` (browser) package keeps `@humanbehavior/core` as an
    external dependency, so **both** tarballs must be installed.
  - Import only from the main `humanbehavior-js` entry. The `humanbehavior-js/react`
    and `/core` subpath exports point to sibling paths that only resolve *inside*
    the monorepo and break in a standalone install.
  - The monorepo's pinned wizard submodule commit was an incomplete/orphaned commit,
    so the device-flow install wizard (`dev:wizard`) could not be run — hence the
    manual install above.

  If the SDK version changes, repeat the build/pack/install with the new filenames.

  ---

  ## Running the whole thing locally

  ### 1. Start the HB backend (in the monorepo)

  `frontend/.env.local` and `ingestion-server/.env` are already configured, so
  `pnpm setup:dev` is NOT needed.

  ```bash
  cd /Users/esawadhana/Projects/HumanBehavior/humanbehavior-v2
  docker compose up -d        # postgres, redis, clickhouse, kafka, minio
  pnpm install
  pnpm db:migrate

  # each in its own terminal:
  pnpm dev:server      # ingestion API on :8000 (also runs the analytics consumer)
  pnpm dev:archiver    # finalizes rrweb sessions into viewable replays
  pnpm dev:frontend    # dashboard on :3000
  pnpm dev:live-replay # :9200 (optional, for live replay viewing)
  ```

  ### 2. Run this site

  The dashboard uses port 3000, so run the portfolio on a different port:

  ```bash
  cd "/Users/esawadhana/Projects/Web Apps/Personal Portfolio"
  npm run dev -- -p 3001
  ```

  Open `http://localhost:3001`, click around, then view results in the dashboard at
  `http://localhost:3000` under the project the key belongs to.

  ---

  ## Getting an API key (local)

  The key is minted by your local stack, not handed out externally.

  1. Open `http://localhost:3000` and sign in with Google (this creates your
    `users` row — Auth.js with Google is the only provider).
  2. Bootstrap a project + key bound to your user:

  ```bash
  cd /Users/esawadhana/Projects/HumanBehavior/humanbehavior-v2
  SEED_PROJECT_NAME="Personal Portfolio" SEED_PROJECT_SLUG=portfolio \
    pnpm db:seed your.google.email@gmail.com --no-data
  ```

  It prints `api key: hb_dev_...`. Paste that into this repo's `.env.local` as
  `NEXT_PUBLIC_HB_API_KEY` and restart the dev server.

  ---

  ## Timing & gotchas

  - **Analytics vs. replays:** events/users/pageviews appear in the dashboard
    quickly (via the analytics consumer inside `dev:server`). The **session replay**
    is only finalized by `dev:archiver` after the session is idle
    (`SESSION_INACTIVE_MINUTES`, default ~20 min). For faster replay testing, lower
    that value in `ingestion-server/.env` and keep the archiver's value strictly
    higher, or use the live-replay view.
  - **Localhost capture:** ingestion only drops localhost traffic when a project's
    `settings.captureLocalhost === false`. New projects default to `{}`, so
    localhost is captured by default — just don't turn it off in onboarding.
  - **Port clash:** dashboard `:3000` vs. this site's `next dev` `:3000`. Run the
    site on another port (`-p 3001`). The SDK still posts to `:8000` regardless.
  - **Validating the key without a browser:** a non-401 response from the ingestion
    server means the key authenticated. Example smoke test:

  ```bash
  curl -s -X POST http://localhost:8000/api/ingestion/customEvent \
    -H "Content-Type: application/json" \
    -d '{"apiKey":"hb_dev_...","eventName":"smoke","sessionId":"s1","endUserId":"u1"}'
  # -> {"success":true}
  ```

  ---

  ## How a REAL (deployed) user would do this instead

  Once the SDK is published and the dashboard is hosted, none of the local build is
  needed. A customer:

  1. Signs up on the hosted dashboard, creates a project, copies the API key.
  2. Runs one command in their project root:

  ```bash
  npx humanbehavior-js YOUR_API_KEY
  ```

    The wizard auto-detects the framework, installs the SDK, and writes the init
    code — i.e. it automates exactly the manual steps in this doc. (The newer
    device-flow wizard goes further: you don't paste a key at all; it opens the
    browser, you approve, it pulls the key and an agent wires it in.)
  3. Deploys; sessions from real users stream into the hosted dashboard.

The local setup above produces the same end state that single command would — it
was done by hand only because we're running/developing HB itself rather than
consuming a deployed product.

---

## Issues we hit (and how they were resolved)

Roughly in the order they came up. Most friction came from running an
unfinished, undeployed product end-to-end on one machine — almost none of it was
about the portfolio itself (that part was ~20 lines).

### The starting command
- **Hardcoded path.** The original command pointed at a coworker's home dir
  (`/Users/amoghchaturvedi/Downloads/humanbehavior-v2`). Corrected to this
  machine's monorepo path.
- **Dashboard target.** It used `HB_DASHBOARD_URL=http://localhost:3000`, which
  also collides with the portfolio's own dev server port.

### The install wizard was a dead end (the big blocker)
- **Submodule not checked out.** `humanbehavior-js/` was an empty, uninitialized
  git submodule, so `dev:wizard` had nothing to run.
- **Pinned commit was broken.** After init, the submodule pointed at commit
  `ad78507`, which is **orphaned** (on no branch) and **incomplete** — missing
  most wizard source (`tools/`, `detection/`, `frameworks/`, ...). It can't build.
- **The real wizard isn't published anywhere.** No remote branch contained the
  complete device-flow wizard; it only exists in full on a coworker's machine.
  `@humanbehavior/wizard` also 404s on npm.
- **Conclusion:** the friend's command could never work from this checkout. We
  pivoted to building the SDK locally and wiring it in by hand.

### Building & installing the local SDK
- **Full monorepo build failed** on the broken wizard package. Fix: build only
  the SDK with `npx turbo build --filter=humanbehavior-js`.
- **`@humanbehavior/core` is external to the browser package**, so both tarballs
  must be installed — not just `humanbehavior-js`.
- **Broken subpath exports.** `humanbehavior-js/react` and `/core` resolve only
  inside the monorepo. Fix: import from the main `humanbehavior-js` entry.
- **CJS red herring.** A `require()` smoke check returned empty exports; that's a
  CJS quirk — the ESM build (what Next.js uses) exports everything fine.
- **Dev server wouldn't persist** when backgrounded via a subshell; had to run it
  as a proper managed background process.

### API key / "why a login if it's local?"
- There was no key to "paste" — with nothing deployed, the key is **minted by the
  local stack**, not handed out. It comes from `pnpm db:seed` after a Google
  sign-in creates your `users` row (Auth.js + Google is the only provider).
- The monorepo's `frontend/.env.local` already had Google OAuth + DB config, so
  `pnpm setup:dev` was unnecessary.

### Standing up the backend correctly
- The first service list (just `dev:server` + `dev:frontend`) would never show
  **replays**. Had to add **`dev:archiver`** (replays only finalize through it),
  plus the **~20-min idle timing** caveat and the **`captureLocalhost` default**
  (localhost is only dropped if explicitly set `false`).

### Dashboard showed zeros
- After plugging in the key, the dashboard read all zeros. ClickHouse actually
  had events; the confusion was a diagnostic query using a non-existent column
  (`event_type`). Resolved.

## Key takeaways
- The portfolio-side integration is tiny and stable: one client component, one
  layout line, two env vars, two deps.
- All the pain was environmental: an undeployed product, a WIP/orphaned wizard,
  an SDK that had to be built from source, and a full backend (Postgres,
  ClickHouse, Kafka, Redis, MinIO, ingestion, archiver, dashboard) to stand up
  and seed by hand.
- For a real, deployed user this collapses to: sign up → `npx humanbehavior-js
  YOUR_API_KEY` → deploy. The manual setup here reproduces that same end state.
  ```

