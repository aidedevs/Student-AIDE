import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { query, QueryCtx } from "./_generated/server";
import { getPostImage } from "./studentCenter";

export const getResources = query({
  args: {
    paginationOpts: paginationOptsValidator,
    category: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    let data;

    if (args.category) {
      data = await ctx.db
        .query("resources")
        .filter((q) => q.eq(q.field("category"), args.category))
        .order("desc")
        .paginate(args.paginationOpts);
    } else {
      data = await ctx.db
        .query("resources")
        //   .filter((q) => q.eq(q.field("category"), args.category))
        .order("desc")
        .paginate(args.paginationOpts);
    }

    const postWithImage = await Promise.all(
      data.page.map(async (el) => {
        const asset = await getPostImage(ctx, el.file);

        return {
          ...el,
          file: asset,
        };
      })
    );

    return {
      ...data,
      page: postWithImage,
    };
  },
});
