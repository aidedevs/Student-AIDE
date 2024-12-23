import { paginationOptsValidator } from "convex/server";
import { query } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const getAcademicCalendar = query({
  args: { paginationOpts: paginationOptsValidator },

  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    const data = await ctx.db
      .query("academicCalendar")
      .withIndex("byDate")
      .filter((q) => q.gte(q.field("date"), today.getTime()))
      .order("asc")
      .paginate(args.paginationOpts);

    return data;
  },
});
