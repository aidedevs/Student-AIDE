import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const joinWriters = mutation({
  args: {
    userId: v.id("users"),
    semester: v.optional(v.string()),
    address: v.optional(v.string()),
    cgpa: v.optional(v.string()),
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    const result = await ctx.db.insert("writers", {
      ...args,
      status: "Pending",
    });

    return result;
  },
});

export const getApplicationById = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const data = await ctx.db
      .query("writers")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .unique();

    return data;
  },
});
