# Contributing to PetAd Chain SDK

## Quick rules

1. Every new public function needs unit tests covering: happy path, validation, error paths, idempotency, edge cases.
2. `npm run test:cov` must pass with lines ≥ 90%, branches ≥ 90%, functions ≥ 95% before opening a PR.
3. `npm run lint` and `npm run type-check` must be clean.
4. Update `CHANGELOG.md` under `## [Unreleased]` for every PR.
5. Never put a secret key in `src/` — CI will block the PR if it finds one.

## Running tests

```bash
npm test              # unit tests only
npm run test:cov      # with coverage report
npm run test:watch    # watch mode while developing
npm run test:integration  # testnet (needs .env with real keys)
```

## Releasing

```bash
# 1. Bump version in package.json
# 2. Move Unreleased entries in CHANGELOG.md to the new version
# 3. git commit -am "chore: release v1.x.x"
# 4. git tag v1.x.x
# 5. git push origin main --tags
# CI will publish to npm automatically.
```

## Secrets needed in GitHub repo settings

| Secret | Description |
|--------|-------------|
| `TESTNET_MASTER_SECRET_KEY` | Stellar testnet signing key (S...) |
| `TESTNET_MASTER_PUBLIC_KEY` | Matching public key (G...) |
| `NPM_TOKEN` | npm automation token |
| `BACKEND_DISPATCH_TOKEN` | PAT with repo scope on petad-backend |