# TON STICKMAN CINEMATIC

A user-owned project for producing cinematic 2D stickman videos with Claude.

## Goals

- Support Claude Code installation from this public repository.
- Provide a separate, size-limited package for Claude Web skill upload.
- Preserve the selected visual styles: A2, A3, A7, and A8.
- Keep large optional audio libraries separate from the core installation.
- Keep source assets, references, and scripts organized and documented.

## Project status

**Bootstrap repository created.** The original upstream skill and its dependencies have not yet been copied into this repository. The next step is to audit the source files, license notices, required references, and runtime dependencies before importing or adapting anything.

## Planned layout

```text
.
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   └── ton-stickman-cinematic/
│       ├── SKILL.md
│       ├── references/
│       ├── scripts/
│       └── assets/
├── installers/
│   ├── claude-code/
│   └── claude-web/
├── tools/
├── README.md
├── INSTALL.md
└── LICENSE
```

## Installation targets

- **Claude Code:** install the plugin/skill from this repository.
- **Claude Web:** upload a generated skill ZIP or plugin archive that complies with the current upload limits.

The Web package will be built separately and checked for archive size, file count, manifest structure, and required skill files.

## Important

Do not upload API keys, private credentials, personal recordings, or large optional audio collections to this public repository. Confirm the license and redistribution rights of every imported asset before publishing it.
