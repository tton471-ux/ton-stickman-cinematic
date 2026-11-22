# Installation

## Claude Web / Claude Desktop

1. Open **Customize → Plugins**.
2. Choose **Add → Add marketplace**.
3. Enter this public GitHub repository: `tton471-ux/ton-stickman-cinematic`.
4. Find **ton-stickman-cinematic** in the marketplace and choose **Add**.

Claude's plugin marketplace supports adding a Git repository directly. The plugin's skills then become available in Claude chat and other supported Claude surfaces.

## Claude Code (terminal)

Run these commands inside Claude Code:

```text
/plugin marketplace add tton471-ux/ton-stickman-cinematic
/plugin install ton-stickman-cinematic@ton-stickman-cinematic-marketplace
```

If using the CLI outside a Claude Code session:

```bash
claude plugin marketplace add tton471-ux/ton-stickman-cinematic
claude plugin install ton-stickman-cinematic@ton-stickman-cinematic-marketplace
```

## Important runtime note

The plugin/skill provides production directions and reference documentation. The optional B1 local code-rendering engine is a separate installation layer and is **not yet bundled or verified** in this repository. It requires Node.js 20+, FFmpeg/FFprobe, `@napi-rs/canvas`, `sharp`, and its complete licensed font/reference asset set. Do not interpret a successful plugin installation as proof that the B1 renderer is ready.

## Claude Web skill ZIP

A separate ZIP is not required for the marketplace installation route above. A compact standalone skill ZIP may be added later if a direct Skills upload route is needed.

## Safety and licensing

Review the repository before installing. Do not upload API keys, private credentials, personal recordings, or large optional audio collections. Upstream MIT license text is preserved at `licenses/UPSTREAM-MIT-LICENSE.txt`; individual sample media, fonts and audio assets retain their own licensing requirements.
