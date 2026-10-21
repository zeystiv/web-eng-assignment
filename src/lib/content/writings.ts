export type WritingPlatform =
  | "systivia"
  | "medium"
  | "substack"
  | "case-study";

export type WritingContent = {
  /** Slug of the original CMS entry — kept for stable identifiers. */
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  platform: WritingPlatform;
  /** Absolute URL for external platforms, site-relative path for case studies. */
  url: string;
  summary?: string;
  tags: string[];
};

/**
 * Every writing, hardcoded.
 *
 * This used to be a Keystatic collection (`content/writings/*.yaml`); the data
 * is now baked straight into the app so the site has no CMS and no backend.
 */
export const writings: WritingContent[] = [
  {
    slug: "being-autistic-my-journey-towards-being-proud-of-myself",
    title: "Being Autistic - My Journey Towards Being Proud Of Myself",
    date: "2022-11-02",
    platform: "medium",
    url: "https://medium.com/@zeystiv/being-autistic-my-journey-towards-being-proud-of-myself-2e8ebb45bc34",
    tags: [
      "self-improvement",
      "personal-development",
      "self-development",
      "autism",
      "autism-spectrum-disorder",
    ],
  },
  {
    slug: "how-i-learned-to-code-from-the-age-of-12",
    title: "My Journey To Coding From The Age Of 12",
    date: "2022-07-26",
    platform: "medium",
    url: "https://medium.com/@zeystiv/how-i-learned-to-code-from-the-age-of-12-c4967d116760",
    tags: ["careers", "web-development", "journey", "programming", "coding"],
  },
  {
    slug: "you-need-to-create-systems-not-just-goals",
    title: "You Need To Create Systems, Not Just Goals",
    date: "2025-05-19",
    platform: "medium",
    url: "https://medium.com/@zeystiv/you-need-to-create-systems-not-just-goals-1349bd653e2e",
    tags: ["goals", "system", "career", "life-goals", "life"],
  },
  {
    slug: "the-broken-path-to-healing-ones-self",
    title: "The Broken Path To Healing One's Self",
    date: "2025-08-02",
    platform: "medium",
    url: "https://medium.com/@zeystiv/the-broken-path-to-healing-ones-self-0788f565665f",
    tags: ["mental-health", "emotions", "healing"],
  },
  {
    slug: "everything-seems-perfect-until-it-wasnt",
    title: "Everything Seems Perfect Until It Wasn't",
    date: "2026-01-03",
    platform: "substack",
    url: "https://zeystiv.substack.com/p/everything-seems-perfect-until-it",
    tags: [],
  },
  {
    slug: "confronting-my-inner-monsters-face-to-face",
    title: "Confronting My Inner Monsters Face To Face",
    date: "2026-08-17",
    platform: "medium",
    url: "https://medium.com/@zeystiv/confronting-my-inner-monsters-face-to-face-239460c10482",
    tags: ["regret", "emotions", "healing", "anxiety"],
  },
  {
    slug: "the-emotional-cost-of-doom-scrolling",
    title: "The Emotional Cost Of Doom Scrolling",
    date: "2026-08-19",
    platform: "medium",
    url: "https://medium.com/@zeystiv/the-emotional-cost-of-doom-scrolling-c479ef82575e",
    tags: ["mindfulness", "anxiety", "depression", "emotions", "scrolling"],
  },
  {
    slug: "identity-based-habits",
    title: "You Don't Build Habits, You Build Identity",
    date: "2026-09-08",
    platform: "systivia",
    url: "https://systivia.com/blog/identity-based-habits",
    tags: ["identity", "building-habits", "habit-formation"],
  },
  {
    slug: "systivia-case-study",
    title: "Mobile App - Systivia: Identity-Led Habits",
    date: "2026-09-12",
    platform: "case-study",
    url: "/lab/systivia",
    tags: [],
  },
  {
    slug: "while-waiting-for-you",
    title: "While Waiting For You",
    date: "2026-09-25",
    platform: "medium",
    url: "https://medium.com/@zeystiv/while-waiting-for-you-1673f5685df1",
    tags: ["poetry", "love", "romance", "relationships"],
  },
  {
    slug: "dopamine-detox-for-habits",
    title: "An Effective Way To Build Habits Using Dopamine Detox",
    date: "2026-10-05",
    platform: "systivia",
    url: "https://systivia.com/blog/dopamine-detox-for-habits",
    summary:
      "You need to be bored to be more intentional with your life for building habits.",
    tags: [],
  },
  {
    slug: "the-weight-of-uncertainty",
    title: "For Those Who Feel Too Much",
    date: "2026-10-09",
    platform: "substack",
    url: "https://zeystiv.substack.com/p/the-weight-of-uncertainty",
    summary:
      "The life is uncertain but still worthy of living, so it’s okay to live with no gurantee.",
    tags: [],
  },
];
