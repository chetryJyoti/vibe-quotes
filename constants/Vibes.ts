import { Vibe } from "@/types";

export const VIBES: Vibe[] = [
  {
    id: "motivational",
    name: "Motivational",
    emoji: "🚀",
    color: "#FF6B6B",
    isPro: false, // Free vibe
  },
  {
    id: "feelGood",
    name: "Feel Good",
    emoji: "😊",
    color: "#4ECDC4",
    isPro: false, // Free vibe
  },
  {
    id: "emotional",
    name: "Emotional",
    emoji: "💝",
    color: "#45B7D1",
    isPro: true, // Pro only
  },
  {
    id: "calm",
    name: "Calm",
    emoji: "🧘",
    color: "#96CEB4",
    isPro: true, // Pro only
  },
];

export const FREE_VIBES = VIBES.filter((vibe) => !vibe.isPro);
export const PRO_VIBES = VIBES.filter((vibe) => vibe.isPro);
