# Installation

## Status

The repository is under active packaging work. Do not treat the current main branch as a verified one-click installation yet.

## Claude Code

The intended distribution is a Claude Code plugin containing:
- `.claude-plugin/plugin.json`
- `skills/ton-stickman-cinematic/SKILL.md`
- the selected-style reference documents

The B1 local renderer is a separate runtime layer. It requires Node.js 20+, FFmpeg/FFprobe, `@napi-rs/canvas`, `sharp`, and the complete licensed font/reference asset set. A plugin manifest alone does not install those system dependencies.

## Claude Web

A dedicated compact ZIP will be provided after the skill package passes:
- required file and reference checks
- archive-size and file-count checks
- manifest/ZIP structure validation
- selected-style dependency checks

## Important

Do not upload API keys, private credentials, personal recordings, or large optional audio collections to this public repository. Do not redistribute sample videos, fonts, or audio unless their individual licenses permit it.
