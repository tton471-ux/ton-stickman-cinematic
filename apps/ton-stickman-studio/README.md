# TON Stickman Cinematic Studio

A shared local Core Engine host for the web interface and Windows desktop shell.

## Current scope

- Local HTTP API bound to `127.0.0.1` only.
- Web workspace for creating B1–B6 project manifests, listing local projects, running Doctor, workflow inspection, validation, preview and render commands.
- Electron desktop shell using the same server/API and the same upstream runtime.
- Projects are stored under `Documents/TonStickmanProjects`.

## Requirements

- Node.js 20+
- FFmpeg and FFprobe on PATH
- Runtime dependencies and approved fonts/assets from the upstream runtime bundle
- Windows desktop packaging requires Windows x64 build tooling (or a Windows CI runner).

## Run the web workspace

From this directory:

```bash
npm install
npm start
```

Open http://127.0.0.1:4177.

## Run desktop in development

```bash
npm install
npm run desktop
```

## Build Windows installer

Run on Windows x64:

```bash
npm install
npm run dist:win
```

The installer is emitted under `dist/`.

## Security and limits

The API binds to loopback, blocks cross-origin POST requests, limits JSON request size, and only exposes an allowlist of runtime commands. Project paths are restricted to the local projects directory. Do not expose this server to a LAN or the public internet.

This is the first application foundation, not a claim that every A1–A8 / B1–B7 production workflow is integrated. Actual render QA, runtime asset packaging, and Windows installer smoke tests remain required.
