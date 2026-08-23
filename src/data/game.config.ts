import type { GameConfig } from "@/types/site";

export const gameConfig: GameConfig = {
  name: "My Grass Farm",
  slug: "my-grass-farm",
  domain: "https://my-grass-farm.wiki",
  theme: {
    primaryColor: "#16A34A",     // fresh grass green
    accentColor: "#FACC15",      // hay gold accent
    surfaceColor: "#08110B",
    style: "roblox-seo-hub"
  },
  currency: {
    name: "Cash",               // tycoon currency: hay → cash
    abbr: ""
  },
  features: {
    hasCalculator: false,
    hasTierList: true,           // blades are the tycoon optimise layer (best blades page)
    hasCodesPage: true,
    hasBrainrotIndex: false,
    hasHandbook: true
  },
  updateCadence: "official Roblox publish + YouTube search sweep",
  dataSources: {
    officialGameUrl: "https://www.roblox.com/games/98073123711869/My-Grass-Farm",
    discord: "#",
    trello: "#"
  },
  ads: {
    publisher: "Adsterra",
    usesRuntimeConfig: true
  }
};
