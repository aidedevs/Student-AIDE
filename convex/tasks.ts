import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";
import { Id } from "./_generated/dataModel";
import { paginationOptsValidator } from "convex/server";

export const addNewTask = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    due_date: v.optional(v.string()),
    priority: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    const task = await ctx.db.insert("tasks", {
      ...args,
      userId: user?._id as Id<"users">,
      completed: false,
    });

    return task;
  },
});

export const addNewSubTask = mutation({
  args: {
    taskId: v.id("tasks"),
    title: v.string(),
    description: v.optional(v.string()),
    due_date: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await getCurrentUserOrThrow(ctx);

    const task = await ctx.db.insert("subTasks", {
      ...args,
      completed: false,
    });

    return task;
  },
});

// const updatedTask = async (ctx: QueryCtx, taskId: Id<"tasks">, subTaskId: Id<"subTasks">) => {
//  const task = await ctx.db.get(taskId)

//   return await ctx.db.patch(task._id, {
//     subTas: [subTaskId]
//   });
// }
// [

export const getUserTasks = query({
  args: { paginationOpts: paginationOptsValidator },

  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    const tasks = await ctx.db
      .query("tasks")
      .withIndex("byDueDate")
      .filter((q) => q.eq(q.field("userId"), user?._id))
      .order("asc")
      .paginate(args.paginationOpts);

    const tasksWithSunTasks = await Promise.all(
      tasks.page.map(async (task) => {
        const subTasks = await getSubTasks(ctx, task._id);

        return {
          ...task,
          subTasks,
        };
      })
    );

    return { ...tasks, page: tasksWithSunTasks };
  },
});

export const getTaskById = query({
  args: {
    taskId: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.taskId);

    if (!task) return null;

    const subTasks = await getSubTasks(ctx, task?._id);

    return {
      ...task,
      subTasks: subTasks || [],
    };
  },
});

export const getSubTasks = async (ctx: QueryCtx, taskId: Id<"tasks">) => {
  const subTasks = await ctx.db
    .query("subTasks")
    .withIndex("byDueDate")
    .filter((q) => q.eq(q.field("taskId"), taskId))
    .order("asc")
    .collect();
  return subTasks;
};

export const getUserOngoingTasks = query({
  args: {},

  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    const tasks = await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("userId"), user?._id))
      .order("desc")
      .take(5);

    const tasksWithSunTasks = await Promise.all(
      tasks.map(async (task) => {
        const subTasks = await getSubTasks(ctx, task._id);

        return {
          ...task,
          subTasks,
        };
      })
    );

    return tasksWithSunTasks;
  },
});
