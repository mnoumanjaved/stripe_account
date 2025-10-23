
import { Brief, AgencyType } from './types';

export const INITIAL_BRIEF: Brief = {
  brandProduct: '',
  coreChallenge: '',
  targetAudience: '',
  brandTone: '',
  marketContext: '',
  agencyType: AgencyType.CREATIVE,
};

export const LOADING_MESSAGES: string[] = [
  'Challenging assumptions...',
  'Igniting sparks...',
  'Deconstructing the brief...',
  'Connecting disparate thoughts...',
  'Provoking new angles...',
  'Searching for the unexpected...',
  'Unlocking potential...',
];
