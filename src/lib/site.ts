export const site = {
  name: "Nation Plus News",
  tagline: "Thinking Beyond",
  url: "https://www.nationplusnews.co.in",
  description:
    "Nation Plus News is a hyperlocal news channel from Vadodara, watched across Central Gujarat — a platform for citizen-centric issues and their solutions.",
  editor: "Vashishth Shukla",
  youtubeChannelId: process.env.YOUTUBE_CHANNEL_ID || "UC1XZgFkx1petzD4pCRvxALQ",
  youtubeHandle: "nationplusnewschannel",
  instagramUsername: process.env.INSTAGRAM_USERNAME || "nationplusnews_",
};

export const links = {
  youtube: `https://www.youtube.com/@${site.youtubeHandle}`,
  youtubeSubscribe: `https://www.youtube.com/@${site.youtubeHandle}?sub_confirmation=1`,
  instagram: `https://www.instagram.com/${site.instagramUsername}/`,
};
