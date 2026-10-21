export type ProjectListItem = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  stats: { label: string; value: string }[];
  links: { label: string; url: string }[];
  hasStudy?: boolean;
};

export const projects: ProjectListItem[] = [
  {
    slug: "systivia",
    title: "Systivia: Identity-Led Habits",
    summary: "An identity-based habit tracking app that flips the script. Instead of chasing streaks and checking boxes, you start with who you want to become, and let your habits follow.",
    tags: ["mobile-app", "react-native", "expo", "habit-tracker"],
    stats: [
      { label: "Platform", value: "Android" },
      { label: "Stack", value: "React Native - Expo" },
    ],
    links: [
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.systivia.habits" },
      { label: "Website", url: "https://systivia.com" },
    ],
    hasStudy: true,
  },
  {
    slug: "systivia-circle",
    title: "Systivia Circle",
    summary: "A community for people who are building habits by focusing on who they want to become - Join to make real friends, find accountability partners, swap ideas, and see how others structure their tracking",
    tags: ["community", "discord", "accountability"],
    stats: [
      { label: "Platform", value: "Discord" },
      { label: "Focus", value: "Habit building" },
    ],
    links: [{ label: "Join Discord", url: "https://systivia.com/dis" }],
    hasStudy: false,
  },
];
