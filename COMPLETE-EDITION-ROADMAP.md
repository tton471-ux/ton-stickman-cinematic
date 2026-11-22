# TON STICKMAN CINEMATIC — Complete Edition Integration

## Objective

Expand the existing TON-owned Claude plugin from its initial five selected directions to a complete style library aligned with the upstream project's A1–A8 Model Engine and B1–B7 Code Engine. Keep A2, A3, A7, A8 and B1 marked as the user's preferred styles; do not remove or silently change their existing project rules.

## Verified upstream snapshot

- Repository: https://github.com/kaomei/stickman-video-director
- Branch inspected: `main`
- Commit inspected: `9431d3707bde52ba8eb17f31886b0892c763eeba`
- License: MIT; retain the full upstream license and copyright notice.
- Git tree reported 2,082 blob files across the whole repository. This includes large binary showcases and the optional audio library; it is not a target to blindly copy into the Claude plugin.
- Upstream skill root: `skills/directing-stickman-videos/`
- Upstream contains A1–A8 and B1–B7. The exact style names and family IDs are recorded in `style-registry.json`.

## Architecture

1. **TON Core** — project setup, story/character bible, storyboard, prompt package, audio/timeline planning, continuity, QA and project checkpoints.
2. **Style Library** — independent A1–A8 and B1–B7 guides, acceptance contracts, manifests and style-specific assets. Keep the upstream style identifiers and dedicated rules.
3. **Runtime Engine** — local scripts, tests, package manifests, fonts and FFmpeg integration. Runtime must declare its actual supported commands and platform requirements.
4. **Optional Media Packs** — audio libraries and large showcase videos are separate optional downloads, not mandatory plugin payload.

## Import rules

- Preserve all existing TON-authored files and user-approved style locks.
- Import upstream text files with source path, upstream commit and SHA recorded.
- Import scripts, tests and package lockfiles as a coherent dependency set; do not cherry-pick a single entry script without its imports.
- Preserve upstream directory layout under a clearly named vendor/source subtree where possible; adapt only TON integration entry points and document every adaptation.
- Do not import binaries through text APIs or replace them with placeholders. Use a verified binary-capable Git workflow for images, fonts, audio and video.
- Review every media/font/audio license independently; MIT source-code licensing does not automatically establish redistribution rights for every bundled asset.
- Keep private media, credentials, API keys, local renders and user project outputs out of the public repository.
- Do not claim any style or runtime is production-ready until its required files are present and its tests and actual render review pass.

## Phased execution

### Phase 0 — Safe integration branch
Create and work on `complete-edition-integration`; keep `main` unchanged until the branch is reviewed.

### Phase 1 — Complete style registry and source map
Record all 15 style routes (A1–A8, B1–B7), upstream snapshot commit, source directories, required references, assets, scripts, tests and status.

### Phase 2 — Text source import
Import the upstream Skill instructions, all style/reference Markdown, source scripts, test files, fixtures, package.json, package-lock.json and required text manifests. Keep vendor source distinct from TON-authored integration files.

### Phase 3 — Binary asset import
Use a binary-capable Git workflow to add only the assets required by the full style library. Track large showcases and optional audio libraries separately. Verify checksums and individual licenses.

### Phase 4 — Runtime integration
Create a documented runtime layout and launcher. Verify Node version, Python requirements (where applicable), FFmpeg/FFprobe, fonts and native dependencies on supported operating systems. Do not assume Claude Web can run local code.

### Phase 5 — Validation
Run the upstream test suite in a compatible environment, then add TON integration tests. Validate each style independently, test one representative output per style, inspect actual video/audio, and publish a per-style readiness matrix.

### Phase 6 — Release
Update plugin metadata and user documentation, package the Claude plugin, and merge the integration branch only after checks pass.

## Current verified progress

- Existing public repository inspected: 42 tracked files at the inspected snapshot.
- Existing plugin and marketplace manifests are present under `.claude-plugin/`.
- Upstream tree inspected and snapshot commit recorded.
- Integration branch created.
- Complete A1–A8 / B1–B7 style registry added.
- Full source/runtime/assets import, binary import and runtime testing are NOT yet complete.

## Next concrete actions

1. Inventory all upstream files by category and style ownership.
2. Import text references and source scripts/tests with provenance.
3. Prepare a separate binary import plan for images, fonts, audio and videos.
4. Validate package and runtime paths before changing the active Claude plugin release.
