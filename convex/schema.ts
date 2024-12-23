import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const User = {
  userId: v.string(),
  email: v.string(),
  name: v.optional(v.string()),
  username: v.union(v.string(), v.null()),
  img: v.optional(v.string()),
  gender: v.optional(v.string()),
  role: v.optional(v.string()),
  phone_number: v.optional(v.string()),
  school: v.optional(v.string()),
  department: v.optional(v.string()),
  course: v.optional(v.string()),
  year: v.optional(v.number()),
  date_of_birth: v.optional(v.string()),
  hobbies: v.optional(v.string()),
  isApproved: v.optional(v.boolean()),
  pushToken: v.optional(v.string()),
  savedPost: v.optional(v.array(v.id("studentCenters"))),
  isDataSharing: v.optional(v.boolean()),
};

export const News = {
  userId: v.id("users"),
  title: v.string(),
  content: v.string(),
  images: v.optional(v.array(v.string())),
};

// for article, poems, achievements
export const StudentCenter = {
  userId: v.id("users"),
  title: v.optional(v.string()),
  content: v.optional(v.string()),
  image: v.optional(v.string()),
  category: v.optional(v.string()),
  likeCount: v.number(),
  likes: v.optional(v.array(v.string())),
};

export const Activities = {
  userId: v.id("users"),
  title: v.optional(v.string()),
  description: v.optional(v.string()),
  category: v.optional(v.string()),
  location: v.optional(v.string()),
  activity_date: v.optional(v.string()),
  organized_by: v.optional(v.string()),
  image: v.optional(v.string()),
};

export const Tasks = {
  userId: v.id("users"),
  title: v.optional(v.string()),
  description: v.optional(v.string()),
  due_date: v.optional(v.string()),
  completed: v.boolean(),
  priority: v.optional(v.string()),
  subTasks: v.optional(v.array(v.string())),
};

export const SubTasks = {
  taskId: v.id("tasks"),
  title: v.optional(v.string()),
  description: v.optional(v.string()),
  due_date: v.optional(v.string()),
  completed: v.boolean(),
};

export const AcademicCalendar = {
  userId: v.id("users"),
  date: v.optional(v.number()),
  event: v.optional(v.string()),
  description: v.optional(v.string()),
  type: v.optional(v.string()),
  isCurrent: v.optional(v.boolean()),
};

export const Schools = {
  name: v.optional(v.string()),
  departments: v.optional(v.array(v.string())),
};

export const Resources = {
  userId: v.id("users"),
  title: v.optional(v.string()),
  description: v.optional(v.string()),
  category: v.optional(v.string()),
  file_type: v.optional(v.string()),
  file: v.optional(v.string()),
};

export const Complaints = {
  userId: v.id("users"),
  title: v.optional(v.string()),
  description: v.optional(v.string()),
  category: v.optional(v.string()),
  status: v.optional(v.string()),
  response: v.optional(v.string()),
};

export const FAQs = {
  question: v.optional(v.string()),
  answer: v.optional(v.string()),
  category: v.optional(v.string()),
};

export const Notifications = {
  toUser: v.optional(v.id("users")),
  message: v.optional(v.string()),
  noti_type: v.optional(v.string()),
  isRead: v.optional(v.array(v.id("users"))),
  status: v.optional(v.string()),
};

export const Feedbacks = {
  userId: v.id("users"),
  name: v.optional(v.string()),
  email: v.optional(v.string()),
  feedback: v.optional(v.string()),
};

export const Writers = {
  userId: v.id("users"),
  semester: v.optional(v.string()),
  address: v.optional(v.string()),
  cgpa: v.optional(v.string()),
  note: v.optional(v.string()),
  status: v.optional(v.string()),
  actionBy: v.optional(v.id("users")),
  actionReasons: v.optional(v.string()),
  actionDate: v.optional(v.string()),
};

export default defineSchema({
  users: defineTable(User).index("byUserId", ["userId"]),
  news: defineTable(News),
  studentCenters: defineTable(StudentCenter).searchIndex("searchPost", {
    searchField: "title",
  }),
  activities: defineTable(Activities),
  tasks: defineTable(Tasks).index("byDueDate", ["due_date"]),
  subTasks: defineTable(SubTasks).index("byDueDate", ["due_date"]),
  academicCalendar: defineTable(AcademicCalendar).index("byDate", ["date"]),
  schools: defineTable(Schools),
  resources: defineTable(Resources),
  complaints: defineTable(Complaints),
  faqs: defineTable(FAQs),
  notifications: defineTable(Notifications),
  writers: defineTable(Writers),
  feedbacks: defineTable(Feedbacks),
});
