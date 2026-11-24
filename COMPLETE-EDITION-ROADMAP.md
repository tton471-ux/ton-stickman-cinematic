# TON STICKMAN CINEMATIC — Complete Edition Integration

## Objective

Expand TON's Claude plugin to the complete upstream style library: A1–A8 Model Engine and B1–B7 Code Engine, while preserving TON's preferred styles A2, A3, A7, A8 and B1.

## Pinned upstream source

- Repository: https://github.com/kaomei/stickman-video-director
- Branch inspected: main
- Commit: `9431d3707bde52ba8eb17f31886b0892c763eeba`
- License: MIT; retain the full upstream license and notices.
- Snapshot counts: 2,082 repository blobs; 75 references; 57 scripts; 70 tests/fixtures/helpers; 1,698 Skill assets.

## Completed in this integration branch

- Complete style registry for A1–A8 and B1–B7.
- TON Skill updated to recognize the complete style library and preserve preferred styles.
- All 75 upstream reference Markdown files copied into the TON Skill reference directory.
- Upstream Skill instructions copied to `vendor/upstream/SKILL.md`.
- All 57 upstream text runtime scripts copied to `vendor/upstream/scripts/`.
- Upstream `package.json` and `package-lock.json` copied as a matching pair.
- All 70 upstream tests, fixtures and helpers copied to `vendor/upstream/tests/`.
- Full upstream repository pinned as Git submodule at `vendor/upstream-source`, providing original binary assets and source files without lossy text conversion.
- Runtime setup documentation and a GitHub Actions validation workflow added.
- All changes isolated on `complete-edition-integration`; `main` remains unchanged.

## Remaining release gates

1. Run GitHub Actions and resolve any missing paths, dependencies or platform-specific test failures.
2. Verify submodule checkout and the runtime's asset/reference path expectations.
3. Review individual redistribution rights for bundled fonts, audio, images and sample videos.
4. Run `node scripts/autopilot.mjs doctor` and the complete test suite on a supported local machine.
5. Generate and visually/audio review at least one representative output for every A and B style.
6. Open/review and merge the integration branch only after release gates pass.
7. Re-sync Claude marketplace/plugin and verify the installed skill exposes all styles.

## Honest readiness statement

The complete text source/runtime/test set and the pinned upstream asset source are now present in the integration branch. This does **not** yet prove the runtime is operational: CI/local tests and actual video renders remain release gates. The Claude Web/desktop Skill can guide production and provide prompts, but local rendering requires a compatible local environment.
