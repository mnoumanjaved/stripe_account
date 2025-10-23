
export enum Stage {
  BRIEF = 'BRIEF',
  ENGINE = 'ENGINE',
  BOARD = 'BOARD',
  WORKSHOP = 'WORKSHOP',
}

export enum AgencyType {
  CREATIVE = 'Creative',
  MEDIA = 'Media',
  PR = 'PR',
  EXPERIENTIAL = 'Experiential',
}

export interface Brief {
  brandProduct: string;
  coreChallenge: string;
  targetAudience: string;
  brandTone: string;
  marketContext: string;
  agencyType: AgencyType;
}

export interface Cluster {
  title: string;
  prompts: string[];
}

export interface ApiResponse {
  clusters: Cluster[];
}

export interface Trigger {
  id: string;
  prompt: string;
  clusterTitle: string;
}

export interface ShortlistedTrigger extends Trigger {
  ideas: string;
}
