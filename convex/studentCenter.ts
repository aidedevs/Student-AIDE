import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";
import { Id } from "./_generated/dataModel";
import { paginationOptsValidator } from "convex/server";

export const createNewPost = mutation({
  args: {
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    image: v.optional(v.id("_storage")),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    return await ctx.db.insert("studentCenters", {
      ...args,
      userId: user._id as Id<"users">,
      likeCount: 0,
    });
  },
});

export const getPosts = query({
  args: {
    paginationOpts: paginationOptsValidator,
    userId: v.optional(v.string()),
    category: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    let posts;

    if (args.userId) {
      posts = await ctx.db
        .query("studentCenters")
        .filter((q) => q.eq(q.field("userId"), args.userId))
        .order("desc")
        .paginate(args.paginationOpts);
    } else {
      posts = await ctx.db
        .query("studentCenters")
        .filter((q) => q.eq(q.field("category"), args.category))
        .order("desc")
        .paginate(args.paginationOpts);
    }

    const postWithImage = await Promise.all(
      posts.page.map(async (post) => {
        const creator = await getPostCreator(ctx, post.userId);
        const image = await getPostImage(ctx, post.image);

        return {
          ...post,
          image: image,
          creator,
        };
      })
    );

    return {
      ...posts,
      page: postWithImage,
    };
  },
});

// export const getSavedPosts = query({
//   args: {
//     paginationOpts: paginationOptsValidator,
//     userId: v.optional(v.string()),
//     category: v.optional(v.string()),
//   },

//   handler: async (ctx, args) => {
//     // let posts;
//     const user = await getCurrentUserOrThrow(ctx);

//     if (!user || !user.savedPost || user.savedPost.length === 0) {
//       return [];
//     }

//     const posts = await ctx.db
//       .query("studentCenters")
//       .filter((q) => )
//       // .filter((q) => q.eq(q.field("_id"), q.))
//       .order("desc")
//       .paginate(args.paginationOpts);

//     const postWithImage = await Promise.all(
//       posts.page.map(async (post) => {
//         const creator = await getPostCreator(ctx, post.userId);
//         const image = await getPostImage(ctx, post.image);

//         return {
//           ...post,
//           image: image,
//           creator,
//         };
//       })
//     );

//     return {
//       ...posts,
//       page: postWithImage,
//     };
//   },
// });

// export const likePost = mutation({
//   args: {
//     postId: v.id("studentCenters"),
//   },
//   handler: async (ctx, args) => {
//     await getCurrentUserOrThrow(ctx);

//     const post = await ctx.db.get(args.postId);

//     await ctx.db.patch(args.postId, {
//       likeCount: (post?.likeCount || 0) + 1,
//     });
//   },
// });

export const likePost = mutation({
  args: { postId: v.id("studentCenters") },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    const post = await ctx.db.get(args.postId);

    const userIndex = post?.likes?.indexOf(user?._id) ?? -1;

    if (userIndex === -1) {
      await ctx.db.patch(args.postId, {
        likes: [...(post?.likes || []), user?._id],
        likeCount: (post?.likeCount || 0) + 1,
      });
    } else {
      const updatedLikes = post?.likes?.filter(
        (id: string) => id !== user?._id
      );
      await ctx.db.patch(args.postId, {
        likes: updatedLikes,
        likeCount: (post?.likeCount || 0) - 1,
      });
    }
  },
});

export const searchPosts = query({
  args: {
    search: v.string(),
  },
  handler: async (ctx, args) => {
    const posts = await ctx.db
      .query("studentCenters")
      .withSearchIndex("searchPost", (q) => q.search("title", args.search))
      .collect();

    const postsWithImage = await Promise.all(
      posts.map(async (post) => {
        if (!post?.image || post.image.startsWith("http")) {
          post.image;
          return post;
        }
        const creator = await getPostCreator(ctx, post.userId);
        const image = await getPostImage(ctx, post.image);
        post.image = image!;

        return { ...post, creator };
      })
    );

    return postsWithImage;
  },
});

export const savePost = mutation({
  args: { postId: v.id("studentCenters") },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    const postIndex = user?.savedPost?.indexOf(args.postId) ?? -1;

    if (postIndex === -1) {
      await ctx.db.patch(user?._id, {
        savedPost: [...(user?.savedPost || []), args.postId],
      });
    } else {
      const updatedSavedPost = user?.savedPost?.filter(
        (id: string) => id !== args.postId
      );
      await ctx.db.patch(user?._id, {
        savedPost: updatedSavedPost,
      });
    }
  },
});

export const deletePostById = mutation({
  args: { postId: v.id("studentCenters") },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    const post = await ctx.db.get(args.postId);

    if (post?.image) {
      await ctx.storage.delete(post.image as Id<"_storage">);
    }
    return await ctx.db.delete(args.postId);
  },
});

export const getPostById = query({
  args: {
    postId: v.id("studentCenters"),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);
    if (!post) return null;

    const creator = await getPostCreator(ctx, post.userId);
    const image = await getPostImage(ctx, post.image);

    return {
      ...post,
      image: image,
      creator,
    };
  },
});

export const getPostCreator = async (ctx: QueryCtx, userId: Id<"users">) => {
  const user = await ctx.db.get(userId);

  if (!user?.img || user.img.startsWith("http")) {
    return user;
  }

  const url = await ctx.storage.getUrl(user.img as Id<"_storage">);

  return {
    ...user,
    img: url,
  };
};

export const getPostImage = async (
  ctx: QueryCtx,
  imgUrl: string | undefined
) => {
  if (!imgUrl || imgUrl.startsWith("http")) return null;

  const url = await ctx.storage.getUrl(imgUrl as Id<"_storage">);

  return url;
};
