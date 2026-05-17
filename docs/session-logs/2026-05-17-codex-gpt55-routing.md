# 2026-05-17 Codex GPT-5.5 Routing Update

## Scope

- Codex-hosted gstack skill generation now emits `MODEL_OVERLAY: gpt-5.5`.
- Haiku-level Codex work routes to `gpt-5.4-mini` because `gpt-5.5-mini` is not accepted by the local Codex account.
- Benchmark helpers default to the Codex/GPT provider path instead of Claude when the host is Codex.

## Validation

- Regenerated Codex skill docs and reinstalled the Codex host skills with `./setup --host codex`.
- Verified installed Codex skills under `~/.codex/skills/gstack*` contain GPT overlays and no `MODEL_OVERLAY: claude`.
- `gstack-model-benchmark --dry-run` defaults to provider `gpt`; judge dry-run reports `Codex gpt-5.5`.
