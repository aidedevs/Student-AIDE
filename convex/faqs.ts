import { paginationOptsValidator } from "convex/server";
import { query } from "./_generated/server";

export const getFAQs = query({
  args: {},
  //   args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const data = await ctx.db.query("faqs").order("desc").collect();
    //   .paginate(args.paginationOpts);

    return data;
  },
});
