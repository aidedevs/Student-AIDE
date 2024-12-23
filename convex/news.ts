import { paginationOptsValidator } from "convex/server";
import { Id } from "./_generated/dataModel";
import { mutation, query, QueryCtx } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";
import { getPostImage } from "./studentCenter";
import { v } from "convex/values";

export const getNews = query({
  args: { paginationOpts: paginationOptsValidator },

  handler: async (ctx, args) => {
    const news = await ctx.db
      .query("news")
      .order("desc")
      .paginate(args.paginationOpts);

    const newsWithImage = await Promise.all(
      news.page.map(async (item) => {
        const images = await getImageUrls(ctx, item?.images!);

        return {
          ...item,
          images: images,
        };
      })
    );

    return { ...news, page: newsWithImage };
  },
});

export const getNewsById = query({
  args: {
    id: v.id("news"),
  },
  handler: async (ctx, args) => {
    const data = await ctx.db.get(args.id);
    if (!data) return null;

    //   const creator = await getPostCreator(ctx, event?.userId! as Id<"users">);
    const images = await getImageUrls(ctx, data?.images);

    return {
      ...data,
      images: images,
    };
  },
});
const getImageUrls = async (ctx: QueryCtx, images: string[] | undefined) => {
  if (!images || images.length === 0) {
    return [];
  }

  const urlPromises = images.map((file) =>
    ctx.storage.getUrl(file as Id<"_storage">)
  );

  const results = await Promise.allSettled(urlPromises);
  return results
    .filter(
      (result): result is PromiseFulfilledResult<string> =>
        result.status === "fulfilled"
    )
    .map((result) => result.value);
};

export const generateUploadUrl = mutation(async (ctx) => {
  await getCurrentUserOrThrow(ctx);

  return await ctx.storage.generateUploadUrl();
});
