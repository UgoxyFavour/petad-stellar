export interface CreateEscrowParams {
  adopterPublicKey: string;
  ownerPublicKey: string;
  depositAmount: string;
  adoptionFee?: string;
  unlockDate?: Date;
  metadata?: { adoptionId: string; petId: string };
}

import { Signer, Thresholds } from './network';

export interface EscrowAccount {
  accountId: string;
  transactionHash: string;
  signers: Signer[];
  thresholds: Thresholds;
  unlockDate?: Date;
}

export enum EscrowStatus {
  CREATED   = 'CREATED',
  FUNDED    = 'FUNDED',
  DISPUTED  = 'DISPUTED',
  SETTLING  = 'SETTLING',
  SETTLED   = 'SETTLED',
  NOT_FOUND = 'NOT_FOUND',
}
