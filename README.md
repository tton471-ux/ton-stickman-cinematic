# TON STICKMAN CINEMATIC

A user-owned Claude skill/plugin project for cinematic 2D stickman production.

## Selected visual directions

- **A2** — Modern Beanie Zeke (Modern Studio Tech / Cinematic Story)
- **A3** — Prehistoric Hand-Drawn / Dark Comedy
- **A7** — Rubber Hose Animation
- **A8** — Studio Ghibli-inspired hand-drawn animation direction
- **B1** — Minimal Line Art / hand-drawn stickman (local code-rendered workflow)

## Current repository contents

- Main skill instructions and upstream reference notes.
- Curated production guides for all five selected directions.
- A7 prompt-lock and workflow manifests.
- B1 approval/evidence manifests.
- Runtime dependency declaration and upstream MIT license notice.

## Build status

**Core documentation and selected-style manifests are imported. Runtime packaging and installation validation are still in progress.** This repository is not yet a verified one-click installation.

The upstream B1 runtime requires Node.js 20+, FFmpeg/FFprobe, `@napi-rs/canvas`, `sharp`, and licensed font/reference assets. Some original media assets are binary files and cannot be imported through the current text-only GitHub editing route. The build process must include and verify those assets before B1 can be called fully operational.

## Installation targets

1. Claude Code plugin/skill installed from this repository.
2. A separate compact ZIP for Claude Web skill upload.

The Claude Web ZIP must be checked for file count, archive size, manifest structure, and required references before release.

## License and third-party material

The upstream project license is preserved at [licenses/UPSTREAM-MIT-LICENSE.txt](licenses/UPSTREAM-MIT-LICENSE.txt). This does not automatically grant redistribution rights to every bundled media file, font, sample video, or third-party audio asset. Keep optional audio libraries and user-provided media out of public releases unless their individual rights are verified.

## Repository

https://github.com/tton471-ux/ton-stickman-cinematic
