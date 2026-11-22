# Upstream source inventory

Pinned upstream snapshot: `kaomei/stickman-video-director@9431d3707bde52ba8eb17f31886b0892c763eeba`.

## Verified upstream source counts

- Whole repository: 2,082 blob files.
- Skill root: 1,932 blob files.
- References: 75 files.
- Scripts: 57 files.
- Tests, fixtures and helpers: 70 files.
- Skill assets: 1,698 files (includes images, fonts, videos, GIFs and optional audio collections).

## TON integration status on `complete-edition-integration`

| Category | Status | Details |
|---|---|---|
| Style registry | Imported | A1–A8 and B1–B7, preferred styles retained |
| Style reference documents | Imported | 75/75 reference Markdown files |
| Upstream Skill instructions | Imported | Pinned source copy under vendor/upstream/SKILL.md |
| Runtime scripts | Imported | 57/57 text scripts under vendor/upstream/scripts |
| Runtime package manifests | Imported | package.json and package-lock.json |
| Tests, fixtures and helpers | Imported | 70/70 under vendor/upstream/tests |
| Full upstream source/assets | Linked | Pinned Git submodule at vendor/upstream-source |
| CI validation workflow | Added | Node 22, Python 3.12, FFmpeg, npm test and Python unittest |
| Runtime execution | Not yet verified | Requires successful CI/local execution |
| Claude plugin release on main | Pending | Integration branch has not been merged |

## Binary assets and submodule

The GitHub text-file integration cannot safely transfer binary files. To preserve all upstream images, videos, GIFs, fonts, and other binary assets without corrupting them, the exact upstream repository commit is pinned as a Git submodule at `vendor/upstream-source`. Always clone with `--recurse-submodules` or run `git submodule update --init --recursive`.

The submodule provides the complete upstream repository snapshot; the vendored text runtime and reference files provide the files directly used by the TON integration branch. Individual media/font/audio redistribution rights still require separate review. MIT source licensing does not automatically license every media asset.

## Runtime validation

The full upstream scripts and test sources are now present, but they have not yet been executed in a compatible local runtime in this chat. Use the workflow `.github/workflows/complete-edition-runtime.yml` or follow `skills/ton-stickman-cinematic/vendor/upstream/README.md`. Do not label a style production-ready until its CI checks and representative rendered output pass.
