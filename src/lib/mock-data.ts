export type AccountStatus = "connected" | "disconnected";
export type PostStatus = "scheduled" | "posted" | "failed";

export interface IGAccount {
  id: string;
  username: string;
  client: string;
  status: AccountStatus;
  scheduled: number;
  followers: string;
}

export interface ScheduledPost {
  id: string;
  account: string;
  caption: string;
  date: string; // ISO
  status: PostStatus;
  thumb: string;
}

export const accounts: IGAccount[] = [
  { id: "1", username: "@northwind.cafe", client: "Northwind Cafe", status: "connected", scheduled: 12, followers: "24.1k" },
  { id: "2", username: "@lumastudio", client: "Luma Studio", status: "connected", scheduled: 8, followers: "12.4k" },
  { id: "3", username: "@verde.fitness", client: "Verde Fitness", status: "connected", scheduled: 5, followers: "47.2k" },
  { id: "4", username: "@harbor.co", client: "Harbor Co.", status: "disconnected", scheduled: 0, followers: "3.1k" },
  { id: "5", username: "@solane.beauty", client: "Solane Beauty", status: "connected", scheduled: 21, followers: "88.6k" },
];

export const posts: ScheduledPost[] = [
  { id: "p1", account: "@northwind.cafe", caption: "Saturday brunch is calling ☕", date: "2026-05-03T10:00:00Z", status: "scheduled", thumb: "🥐" },
  { id: "p2", account: "@lumastudio", caption: "New collection drops Monday.", date: "2026-05-04T15:00:00Z", status: "scheduled", thumb: "📷" },
  { id: "p3", account: "@verde.fitness", caption: "10-min mobility flow inside →", date: "2026-04-30T08:00:00Z", status: "posted", thumb: "🏋️" },
  { id: "p4", account: "@solane.beauty", caption: "Glow routine for spring nights.", date: "2026-05-02T18:30:00Z", status: "scheduled", thumb: "✨" },
  { id: "p5", account: "@northwind.cafe", caption: "Limited: lavender oat latte.", date: "2026-04-29T09:00:00Z", status: "failed", thumb: "💜" },
  { id: "p6", account: "@solane.beauty", caption: "Behind the scenes of our new drop.", date: "2026-04-28T12:00:00Z", status: "posted", thumb: "🎬" },
];
