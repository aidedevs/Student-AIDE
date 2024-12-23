import { paginationOptsValidator } from "convex/server";
import { query } from "./_generated/server";
import { getImageUrl } from "./users";
import { getPostCreator, getPostImage } from "./studentCenter";
import { Id } from "./_generated/dataModel";
import { v } from "convex/values";

export const getEvent = query({
  args: { paginationOpts: paginationOptsValidator },

  handler: async (ctx, args) => {
    const events = await ctx.db
      .query("activities")
      .order("desc")
      .paginate(args.paginationOpts);

    const newsWithImage = await Promise.all(
      events.page.map(async (item) => {
        const images = await getImageUrl(ctx, item?.image!);

        return {
          ...item,
          image: images,
        };
      })
    );

    return { ...events, page: newsWithImage };
  },
});

export const getEventById = query({
  args: {
    eventId: v.id("activities"),
  },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.eventId);
    if (!event) return null;

    const creator = await getPostCreator(ctx, event?.userId! as Id<"users">);
    const image = await getPostImage(ctx, event.image);

    return {
      ...event,
      image: image,
      creator,
    };
  },
});
