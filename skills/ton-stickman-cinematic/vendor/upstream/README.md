# Vendored upstream runtime

This directory mirrors the upstream text runtime at the pinned snapshot recorded in `UPSTREAM-SNAPSHOT.json`.

## Contents

- `SKILL.md`: upstream routing and production instructions.
- `package.json` / `package-lock.json`: exact upstream Node dependency lock.
- `scripts/`: 57 upstream runtime scripts.
- `tests/`: 70 upstream tests, fixtures and test helpers.
- `../upstream-source`: pinned Git submodule containing the complete upstream repository, including binary assets, fonts, sample media and files that cannot be represented through the text-only GitHub file API.

## Local setup

Clone with submodules:

```bash
git clone --recurse-submodules https://github.com/tton471-ux/ton-stickman-cinematic.git
cd ton-stickman-cinematic
git checkout complete-edition-integration
git submodule update --init --recursive
cd skills/ton-stickman-cinematic/vendor/upstream
npm ci
node scripts/autopilot.mjs doctor
npm test
python -m unittest discover -s tests -p '*_test.py'
```

Requirements are defined by the upstream source. Use Node.js 20+ (CI uses Node 22), Python 3 where required, FFmpeg/FFprobe, native build prerequisites for `@napi-rs/canvas`, and the style-specific fonts/assets/providers.

## Important

The upstream test suite has been copied from the pinned source revision, but it has **not yet been executed in this chat environment**. The GitHub Actions workflow `.github/workflows/complete-edition-runtime.yml` runs the tests in a compatible Ubuntu environment. Treat CI results as authoritative; fix missing submodule asset paths or environment-specific failures before marking runtime operational.

Claude Web/Claude Desktop can read the Skill instructions and prompts, but cannot itself execute this local renderer. Runtime commands run on a compatible local machine or CI runner.
