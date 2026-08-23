export type NavItem = {
  label: string;
  href: string;
  description: string;
};

export type NavGroup = {
  label: string;
  href: string;
  items: NavItem[];
};

export type HeroMetric = {
  label: string;
  value: string;
  note: string;
};

export type LinkCard = {
  title: string;
  href: string;
  eyebrow?: string;
  description: string;
  source?: string;
  miniLabel?: string;
};

export type PlayerJourneyStep = {
  label: string;
  href: string;
  description: string;
};

export type PlayerJourneyStage = {
  number: string;
  title: string;
  question: string;
  answer: string;
  href: string;
  links: PlayerJourneyStep[];
};

export type TierPreviewItem = {
  name: string;
  tier: "S" | "A" | "B" | "C";
  role: string;
  reason: string;
  confidence?: "Verified" | "Reported" | "Pending";
  bestFor?: string[];
  sourceNote?: string;
  teamNote?: string;
};

export type GameCode = {
  code: string;
  reward: string;
  status: "Verified" | "Unverified" | "Needs check";
  addedDate: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type EditorialSignal = {
  title: string;
  body: string;
  tone?: "caution" | "normal" | "trust" | string;
};

export type SiteConfig = {
  name: string;
  domain: string;
  gameName: string;
  description: string;
  valueProposition: string;
  shortDisclosure: string;
  lastUpdated: string;
  freshnessLabel: string;
  keywords: string[];
  navGroups: NavGroup[];
};

export type GameConfig = {
  name: string;
  slug: string;
  domain: string;
  theme: {
    primaryColor: string;
    accentColor: string;
    surfaceColor: string;
    style: string;
  };
  currency: {
    name: string;
    abbr: string;
  };
  features: {
    hasCalculator: boolean;
    hasTierList: boolean;
    hasCodesPage: boolean;
    hasBrainrotIndex: boolean;
    hasHandbook: boolean;
  };
  updateCadence: string;
  dataSources: {
    officialGameUrl: string;
    discord?: string;
    trello?: string;
  };
  ads: {
    publisher: string;
    usesRuntimeConfig: boolean;
  };
};
