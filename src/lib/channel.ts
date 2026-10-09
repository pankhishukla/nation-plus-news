/** Channel content from the Nation Plus News company profile. */

export const team = [
  {
    name: "Vashishth Shukla",
    role: "Editor-in-Chief",
    photo: { src: "/images/vashishth-shukla.jpg", width: 960, height: 958 },
    summary:
      "A broadcast journalist with over 30 years in electronic and broadcast media, across every kind of news channel operation — political news, events, special shows, podcasts and crime shows — designing and managing input and output workflows.",
    points: [
      "Has worked with news agencies including UNI and PTI, and was with Aaj Tak for more than 15 years.",
      "A keen understanding of the news media industry and a strategic vision for how news channels work.",
      "Skilled in managing special shows, elections, political events and government event coverage and distribution.",
    ],
  },
  {
    name: "Bhushan Patel",
    role: "CEO",
    photo: { src: "/images/bhushan-patel.jpg", width: 800, height: 1000 },
    summary:
      "Over 20 years of experience in electronic and broadcast media system integration, news planning and revenue stream management.",
    points: [
      "A keen understanding of market dynamics and strategic vision.",
      "Skilled in managing diverse media activities, including event planning, marketing, branding and media planning.",
      "Consistently steers organisations towards growth and success.",
    ],
  },
];

export const coverage = [
  { slug: "news-politics", title: "News & Politics", text: "Local, national and international coverage with in-depth political analysis." },
  { slug: "business-startups", title: "Business & Startups", text: "Tracking innovation, entrepreneurship and economic developments." },
  { slug: "youth-women", title: "Youth & Women", text: "Special features highlighting emerging voices and perspectives." },
  { slug: "science-technology", title: "Science & Technology", text: "The latest breakthroughs, innovations and tech trends shaping tomorrow." },
  { slug: "entertainment-sports", title: "Entertainment & Sports", text: "Cultural events and sporting achievements." },
];

export const workflow = [
  { title: "Discovery", text: "Identify audience and regional needs" },
  { title: "Integration", text: "Adopt AI tools for newsroom workflows" },
  { title: "Production", text: "Generate timely, localised content" },
  { title: "Distribution", text: "Publish across digital and social channels" },
  { title: "Optimise", text: "Use analytics to refine strategy" },
];

export const vision = [
  { title: "Technology-driven foundation", text: "Every operational layer designed with automation, AI integration and scalability at its core." },
  { title: "Reduced manual dependency", text: "Intelligent systems optimise newsroom workflows, so teams can focus on editorial excellence." },
  { title: "Future-ready infrastructure", text: "Built to adapt, scale and evolve with emerging technologies and a changing media landscape." },
];

export const edges = [
  { title: "AI-first architecture", text: "Amongst Gujarat's first media organisations with artificial intelligence deeply integrated across operations." },
  { title: "Cloud-native infrastructure", text: "Scalable, resilient systems built for flexibility and growth, without legacy constraints." },
  { title: "Automation excellence", text: "Less manual work lets editorial teams focus on content quality and innovation." },
  { title: "Operational efficiency", text: "Technology-driven workflows ensure speed, accuracy and consistency at scale." },
];

export const infrastructure = [
  { title: "Cloud-based architecture", text: "Cloud-powered workflows deliver flexibility, scalability and seamless distribution across all platforms." },
  { title: "Redundant transmission", text: "Multiple uninterrupted optical-fibre links and high-availability systems keep downtime to a minimum." },
  { title: "Secure & resilient", text: "Redundant data handling, secure transmission protocols and reliable content delivery." },
];

export type Show = { name: string; about: string; image?: string };

/** Key shows, with their thumbnails. */
export const keyShows: Show[] = [
  {
    name: "Podcast with Vashishth",
    about: "A talk-based programme with engaging conversations, inspiring stories and fresh perspectives on the topics that matter to today's audience.",
    image: "/images/shows/podcast.jpg",
  },
  {
    name: "Top 10",
    about: "Real-life crime cases, investigative stories and crime awareness — engaging narratives that promote public safety.",
    image: "/images/shows/top-10.jpg",
  },
  {
    name: "Live Debate",
    about: "A women's special programme that inspires, empowers and celebrates every woman's journey through meaningful conversations and stories.",
    image: "/images/shows/live-debate.jpg",
  },
];

/** Every programme on the schedule. */
export const programmes: Show[] = [
  ...keyShows,
  { name: "Bulletin", about: "The day's news, every evening at 8:00 PM." },
  { name: "N+Story", about: "In-depth stories from Gujarat and beyond." },
  { name: "Gujarati Special", about: "Programming made for Gujarati audiences." },
  { name: "Zindagi 360°", about: "Exploring human behaviour and everyday life." },
  { name: "Kal Badlega Jab Yuva Badhega", about: "Youth growth — careers, ideas and young achievers." },
  { name: "Swastha Raho", about: "Health and wellness." },
  { name: "The Heritage Stories", about: "Stories of heritage, history and tradition." },
  { name: "The Cosmic Code", about: "Astrology and numerology." },
  { name: "Colours of Culture", about: "Festivals and cultural celebrations." },
  { name: "Trending Viral", about: "What's trending and viral right now." },
  { name: "Special Show", about: "Special programming on the issues of the day." },
  { name: "Bhakti Sadhna", about: "Devotional programming." },
  { name: "Bhajan", about: "Devotional music to start the day." },
];

/**
 * Weekday "fix point chart": [start time (24h, IST), programme]. Each slot is 30 minutes;
 * the day starts at 6:30 AM.
 */
export const schedule: [string, string][] = [
  ["06:30", "Bhajan"],
  ["07:00", "Trending Viral"],
  ["07:30", "Bhakti Sadhna"],
  ["08:00", "Gujarati Special"],
  ["08:30", "Zindagi 360°"],
  ["09:00", "Special Show"],
  ["09:30", "Kal Badlega Jab Yuva Badhega"],
  ["10:00", "Swastha Raho"],
  ["10:30", "Viral"],
  ["11:00", "The Heritage Stories"],
  ["11:30", "The Cosmic Code"],
  ["12:00", "Colours of Culture"],
  ["12:30", "N+Story"],
  ["13:00", "Top 10"],
  ["13:30", "Podcast with Vashishth"],
  ["14:00", "Live Debate"],
  ["14:30", "Recorded Show"],
  ["15:00", "Special Show"],
  ["15:30", "Gujarati Special"],
  ["16:00", "Zindagi 360°"],
  ["16:30", "Special Show"],
  ["17:00", "Kal Badlega Jab Yuva Badhega"],
  ["17:30", "Swastha Raho"],
  ["18:00", "Viral"],
  ["18:30", "The Heritage Stories"],
  ["19:00", "The Cosmic Code"],
  ["19:30", "Colours of Culture"],
  ["20:00", "Bulletin"],
  ["20:30", "N+Story"],
  ["21:00", "Top 10"],
  ["21:30", "Podcast with Vashishth"],
  ["22:00", "Live Debate"],
  ["22:30", "Recorded Show"],
  ["23:00", "Special Show"],
  ["23:30", "Gujarati Special"],
  ["00:00", "Zindagi 360°"],
  ["00:30", "Special Show"],
  ["01:00", "Kal Badlega Jab Yuva Badhega"],
  ["01:30", "Swastha Raho"],
  ["02:00", "Viral"],
  ["02:30", "The Heritage Stories"],
  ["03:00", "The Cosmic Code"],
  ["03:30", "Colours of Culture"],
  ["04:00", "N+Story"],
  ["04:30", "Recorded Show"],
  ["05:00", "Special Show"],
  ["05:30", "Bhakti Sadhna"],
  ["06:00", "Bhakti Sadhna"],
];

/** "13:30" → "1:30 PM". */
export function formatSlot(time: string) {
  const [h, m] = time.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

/** Index of the slot airing at the given IST minute of the day. */
export function slotAt(minuteOfDay: number) {
  const i = Math.floor(minuteOfDay / 30);
  // Slot 0 in the list is 06:30, i.e. half-hour index 13 of the day.
  return (i - 13 + schedule.length) % schedule.length;
}

export const platforms = [
  "Dailyhunt",
  "Rang OTT",
  "i2i TV",
  "Akaba TV",
  "Rock TV",
  "Joy TV",
  "Yupp TV",
  "Zenga TV",
  "PlayboxTV",
  "World TV",
];

export const devices = ["Android TV", "Apple TV", "Roku TV", "Sony TV", "Amazon Fire TV", "LG TV", "Samsung TV"];
