# Upstream source inventory

Snapshot: `kaomei/stickman-video-director@9431d3707bde52ba8eb17f31886b0892c763eeba`

- Upstream repository tree: 2,082 blob entries at inspection time.
- Skill root: `skills/directing-stickman-videos/`.
- Model Engine styles: A1–A8.
- Code Engine styles: B1–B7.
- Upstream skill contains dedicated style references, shared references, scripts, tests, fixtures, manifests and binary assets.
- The repository also contains large example videos/GIFs and an optional bundled audio library. These are classified as optional media packs, not automatically required runtime dependencies.
- Upstream root package manifest: Node.js >=20; dependencies `@napi-rs/canvas@0.1.100` and `sharp@0.35.5`; scripts `test` and `doctor`. The package lock must be imported with the matching package manifest and path layout.

## Import status

| Category | Status |
|---|---|
| Style registry A1–A8 / B1–B7 | Added to TON integration branch |
| Upstream Skill source | Existing partial reference only; full snapshot import pending |
| Style/reference Markdown | Existing partial set; complete import pending |
| Scripts and tests | Not yet imported as a coherent source set |
| Binary style references and fonts | Not imported |
| Large showcase media | Not imported; optional pack review pending |
| Audio library | Kept separate; license and size review pending |
| Runtime install/test | Not run in a local compatible environment |

This inventory is a starting point, not a claim that the upstream source has already been fully mirrored.
