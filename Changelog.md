# Changelog

## [Unreleased]

### Added
- `BuildParams` type: `sourceAccount`, `operations`, optional `memo`, `fee`, `timeoutSeconds` (`src/types/transaction.ts`)
- `Operation` union type: `PaymentOp | CreateAccountOp | SetOptionsOp | AccountMergeOp | ManageDataOp` (`src/types/transaction.ts`)
- `SubmitResult` type: `successful`, `hash`, `ledger`, `resultXdr` (`src/types/transaction.ts`)
- `TransactionStatus` type: `confirmed`, `confirmations`, `ledger`, `hash`, `successful` (`src/types/transaction.ts`)
- Re-exported all transaction types from `src/types/index.ts`

## [0.1.0] - 2026-03-23

### Added

- Initial project scaffold
- Logger class in src/utils/logger.ts with redaction, log levels, and JSON output
- Unit tests for logger redaction and log level filtering
- GitHub Actions CI workflow: lint, unit tests, build, security audit, npm publish on tag
  <!-- sdk-ci.yml -->
  <!-- also create develop  branch -->
