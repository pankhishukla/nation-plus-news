export const site = {
  name: "Nation Plus News",
  tagline: "Thinking Beyond",
  url: "https://www.nationplusnews.co.in",
  description:
    "Nation Plus News is a technology-first news channel from Vadodara, Gujarat — credible journalism on TV, OTT, web and social media.",
  company: "Anjaneya Media Network",
  editor: "Vashishth Shukla",
  youtubeChannelId: process.env.YOUTUBE_CHANNEL_ID || "UC1XZgFkx1petzD4pCRvxALQ",
  youtubeHandle: "nationplusnewschannel",
  instagramUsername: process.env.INSTAGRAM_USERNAME || "nationplusnews_",
  phone: "+91 98795 98918",
  email: "nationplusnewschannel@gmail.com",
  address: ["907–912, 9th Floor, Sunrise Heights", "Sun Pharma Road", "Vadodara, Gujarat 390012"],
};

export const links = {
  youtube: `https://www.youtube.com/@${site.youtubeHandle}`,
  youtubeSubscribe: `https://www.youtube.com/@${site.youtubeHandle}?sub_confirmation=1`,
  instagram: `https://www.instagram.com/${site.instagramUsername}/`,
  facebook: "https://www.facebook.com/NationplusNews",
  x: "https://x.com/NationPlusNews_",
  phone: `tel:${site.phone.replace(/\s/g, "")}`,
  email: `mailto:${site.email}`,
  map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Sunrise Heights, Sun Pharma Road, Vadodara 390012`)}`,
};

export const socials = [
  { label: "YouTube", handle: "Nation Plus News", href: links.youtube },
  { label: "Instagram", handle: "@nationplusnews_", href: links.instagram },
  { label: "Facebook", handle: "@NationplusNews", href: links.facebook },
  { label: "X (Twitter)", handle: "@NationPlusNews_", href: links.x },
];
