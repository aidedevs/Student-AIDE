import {
  internalMutation,
  mutation,
  query,
  QueryCtx,
} from "@/convex/_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const createUser = internalMutation({
  args: {
    userId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    username: v.union(v.string(), v.null()),
    img: v.optional(v.string()),
    phone_number: v.optional(v.string()),
    role: v.optional(v.string()),
    isApproved: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("users", {
      ...args,
      username: args.username || `${args.name}`,
      year: 0,
      isDataSharing: false,
    });
    return userId;
  },
});

export const getUserByUserId = query({
  args: {
    clerkId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.clerkId))
      .unique();

    if (!user?.img || user.img.startsWith("http")) {
      return user;
    }

    const url = await ctx.storage.getUrl(user.img as Id<"_storage">);

    return {
      ...user,
      img: url,
    };
  },
});

export const updateProfile = mutation({
  args: {
    _id: v.id("users"),
    name: v.optional(v.string()),
    img: v.optional(v.id("_storage")),
    phone_number: v.optional(v.string()),
    course: v.optional(v.string()),
    gender: v.optional(v.string()),
    year: v.optional(v.number()),
    pusToken: v.optional(v.string()),
    isDataSharing: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    await getCurrentUserOrThrow(ctx);

    return await ctx.db.patch(args?._id, args);
  },
});

export const generateUploadURL = mutation({
  handler: async (ctx) => {
    await getCurrentUserOrThrow(ctx);

    return await ctx.storage.generateUploadUrl();
  },
});

const getUserWithImageURL = async (ctx: QueryCtx, userId: Id<"users">) => {
  const user = await ctx.db.get(userId);

  if (!user?.img || user?.img.startsWith("http")) {
    return user;
  }

  const imgUrl = await ctx.storage.getUrl(user.img as Id<"_storage">);

  return { ...user, img: imgUrl };
};

export const getImageUrl = async (ctx: QueryCtx, url: string) => {
  if (!url || url.startsWith("http")) {
    return url;
  }

  const imgUrl = await ctx.storage.getUrl(url as Id<"_storage">);

  return imgUrl;
};

// IDENTITY CHECK
// https://docs.convex.dev/auth/database-auth#mutations-for-upserting-and-deleting-users

export const current = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  async handler(ctx, { clerkUserId }) {
    const user = await userByExternalId(ctx, clerkUserId);

    if (user !== null) {
      await ctx.db.delete(user._id);
    } else {
      console.warn(
        `Can't delete user, there is none for Clerk user ID: ${clerkUserId}`
      );
    }
  },
});

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("Can't get current user");
  return userRecord;
}

export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  return await userByExternalId(ctx, identity.subject);
}

async function userByExternalId(ctx: QueryCtx, externalId: string) {
  return await ctx.db
    .query("users")
    .withIndex("byUserId", (q) => q.eq("userId", externalId))
    .unique();
}
