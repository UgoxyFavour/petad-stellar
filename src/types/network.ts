export interface SDKConfig {
  network: 'testnet' | 'public';
  horizonUrl: string;
  masterSecretKey: string;
  networkPassphrase?: string;
  transactionTimeout?: number;
  maxFee?: number;
}

export interface KeypairResult {
  publicKey: string;
  secretKey: string;
}

export interface Signer {
  publicKey: string;
  weight: number;
}

export interface Thresholds {
  low: number;
  medium: number;
  high: number;
}

export interface AccountInfo {
  accountId: string;
  balance: string;
  signers: Signer[];
  thresholds: Thresholds;
  sequenceNumber: string;
  exists: boolean;
}

export interface BalanceInfo {
  accountId: string;
  balance: string;
  lastModifiedLedger: number;
}