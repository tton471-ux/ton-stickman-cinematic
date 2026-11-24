# TON Stickman Cinematic Studio

A shared local Core Engine host for the web interface and Windows desktop shell.

## First-release scope

- Local HTTP API bound to `127.0.0.1` only.
- Web workspace for creating B1–B4 project manifests, listing local projects, running Doctor, workflow inspection, validation, preview and render commands.
- Electron desktop shell uses the exact same server/API and runtime as the web workspace.
- Windows x64 NSIS installer bundles the pinned upstream Node runtime, its installed Node dependencies, approved upstream assets and FFmpeg/FFprobe.
- Projects are stored under `Documents/TonStickmanProjects`.

A1–A8 prompt workflows and B5–B7 code renderers are not enabled in this first application build. The application does not claim that a project is production-ready merely because a manifest was created.

## Requirements for running the web workspace from source

- Node.js 20+
- FFmpeg and FFprobe on PATH
- Runtime assets/submodule checked out

From this directory:

```bash
npm install
npm ci --prefix ../../skills/ton-stickman-cinematic/vendor/upstream
npm start
```

Open http://127.0.0.1:4177.

## Run desktop in development

```bash
npm install
npm ci --prefix ../../skills/ton-stickman-cinematic/vendor/upstream
npm run desktop
```

## Build Windows installer

Run on Windows x64. The CI workflow installs FFmpeg, materializes the pinned assets, installs the upstream dependencies, then builds the installer:

```bash
npm install
npm run dist:win
```

The installer is emitted under `dist/`.

## Security and limits

The API binds to loopback, blocks cross-origin POST requests, limits JSON request size, and only exposes an allowlist of runtime commands. Project paths are restricted to the local projects directory. Do not expose this server to a LAN or the public internet.

The Windows installer build is not considered complete until the CI artifact exists and a smoke test confirms the installed app launches, detects its bundled FFmpeg/runtime, and can complete a representative preview/render.

## Online web test deployment (Render)

This repository includes a Docker image and a Render Blueprint for a private online test instance.

1. Connect the repository to Render and create the service from the repository's `render.yaml`.
2. Set the prompted `TON_STUDIO_AUTH_USER` and `TON_STUDIO_AUTH_PASSWORD` values to unique credentials. Do not commit these values or share them in chat.
3. Keep the persistent disk mounted at `/var/data`; project files are stored under `/var/data/TonStickmanProjects`.
4. Wait for the service health check at `/healthz`, then open the generated HTTPS URL and sign in with the credentials configured in Render.

The public service binds to `0.0.0.0` only when both authentication variables are present. All UI and API routes require HTTP Basic Authentication; only the minimal container probe `/healthz` is public. The Render service uses HTTPS at the edge and a persistent disk for project files. Do not disable authentication or expose a local development server directly to the internet.

The first online release is a single-instance test workspace. Jobs are held in process memory, so a restart clears job history; project files remain on the persistent disk. Do not scale this service to multiple instances until job state and shared storage are moved to durable shared services.
