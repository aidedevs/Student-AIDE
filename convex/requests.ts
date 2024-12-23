import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";
import { Id } from "./_generated/dataModel";

export const addRequest = mutation({
  args: {
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    const request = await ctx.db.insert("complaints", {
      userId: user?._id as Id<"users">,
      ...args,
      status: "Pending",
    });
  },
});

export const getRequests = query({
  args: {},
  //   args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const data = await ctx.db.query("complaints").order("desc").collect();
    //   .paginate(args.paginationOpts);

    return data;
  },
});
