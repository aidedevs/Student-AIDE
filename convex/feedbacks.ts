import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";
import { Id } from "./_generated/dataModel";

export const sendFeedback = mutation({
  args: {
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    feedback: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    const request = await ctx.db.insert("feedbacks", {
      userId: user?._id as Id<"users">,
      ...args,
    });
  },
});
