import { Resource } from "@/app/(protected)/(modal)/resource";

interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  type: "class" | "exam" | "holiday" | "assignment";
  description?: string;
}

[
  {
    date: 1731628800000,
    event: "Midterm Exam",
    type: "exam",
    description: "Mathematics Midterm Examination",
    userId: "j57ekz614mry3h5wzyxvk6cnt574jhbj",
  },
  {
    date: 1731715200000,
    event: "Physics Lab",
    type: "class",
    description: "Laboratory Session 3",
    userId: "j57ekz614mry3h5wzyxvk6cnt574jhbj",
  },
  {
    date: 1731801600000,
    event: "Project Presentation",
    type: "class",
    description: "Project Presentation",
    userId: "j57ekz614mry3h5wzyxvk6cnt574jhbj",
  },
  {
    date: 1731888000000,
    event: "Homework Assignment",
    type: "assignment",
    description: "Homework 3",
    userId: "j57ekz614mry3h5wzyxvk6cnt574jhbj",
  },
  {
    date: 1732492800000,
    event: "Midterm Exam",
    type: "exam",
    description: "Chemistry Midterm Examination",
    userId: "j57ekz614mry3h5wzyxvk6cnt574jhbj",
  },
  {
    date: 1732147200000,
    event: "Holiday",
    type: "holiday",
    description: "Christmas",
    userId: "j57ekz614mry3h5wzyxvk6cnt574jhbj",
  },
  {
    date: 1731628800000,
    event: "Midterm Exam",
    type: "exam",
    description: "Mathematics Midterm Examination",
    userId: "j57ekz614mry3h5wzyxvk6cnt574jhbj",
  },
  {
    date: 1731715200000,
    event: "Physics Lab",
    type: "class",
    description: "Laboratory Session 3",
    userId: "j57ekz614mry3h5wzyxvk6cnt574jhbj",
  },
  {
    date: 1731801600000,
    event: "Project Presentation",
    type: "class",
    description: "Project Presentation",
    userId: "j57ekz614mry3h5wzyxvk6cnt574jhbj",
  },
  {
    date: 1731888000000,
    event: "Homework Assignment",
    type: "assignment",
    description: "Homework 3",
    userId: "j57ekz614mry3h5wzyxvk6cnt574jhbj",
  },
  {
    date: 1732492800000,
    event: "Midterm Exam",
    type: "exam",
    description: "Chemistry Midterm Examination",
    userId: "j57ekz614mry3h5wzyxvk6cnt574jhbj",
  },
  {
    date: 1732147200000,
    event: "Holiday",
    type: "holiday",
    description: "Christmas",
    userId: "j57ekz614mry3h5wzyxvk6cnt574jhbj",
  },
];

export const sampleEvents: CalendarEvent[] = [
  {
    id: "1",
    date: new Date("2024-11-15"),
    title: "Midterm Exam",
    type: "exam",
    description: "Mathematics Midterm Examination",
  },
  {
    id: "2",
    date: new Date("2024-11-16"),
    title: "Physics Lab",
    type: "class",
    description: "Laboratory Session 3",
  },
  {
    id: "3",
    date: new Date("2024-11-17"),
    title: "Project Presentation",
    type: "class",
    description: "Project Presentation",
  },
  {
    id: "4",
    date: new Date("2024-11-18"),
    title: "Homework Assignment",
    type: "assignment",
    description: "Homework 3",
  },
  {
    id: "6",
    date: new Date("2024-11-25"),
    title: "Midterm Exam",
    type: "exam",
    description: "Chemistry Midterm Examination",
  },
  {
    id: "5",
    date: new Date("2024-11-22"),
    title: "Holiday",
    type: "holiday",
    description: "Christmas",
  },
];

export const sampleNotifications = [
  {
    id: "1",
    message: "Your assignment has been graded",
    noti_type: "success",
    isRead: false,
    created_at: new Date("2024-11-12T10:30:00"),
  },
  {
    id: "2",
    message: "Upcoming exam reminder",
    noti_type: "warning",
    isRead: false,
    created_at: new Date("2024-11-12T09:15:00"),
  },
  {
    id: "3",
    message: "Your report is due",
    noti_type: "danger",
    isRead: false,
    created_at: new Date("2024-11-11T12:45:00"),
  },
  {
    id: "4",
    message: "Your presentation is due",
    noti_type: "info",
    isRead: true,
    created_at: new Date("2024-11-10T15:00:00"),
  },
  {
    id: "5",
    message: "New assignment has been posted",
    noti_type: "success",
    isRead: false,
    created_at: new Date("2024-11-09T11:30:00"),
  },
];

export const sampleResources = [
  {
    id: "1",
    title: "Introduction to React Native",
    description:
      "Lecture notes covering the basics of React Native development",
    category: "lecture",
    file_type: "pdf",
    link: "https://example.com/lecture1.pdf",
    created_at: new Date("2024-11-12"),
  },
  {
    id: "2",
    title: "Assignment 1: UI Development",
    description: "Create a simple mobile app interface using React Native",
    category: "assignment",
    file_type: "docx",
    link: "https://example.com/assignment1.docx",
    created_at: new Date("2024-11-11"),
  },
  {
    id: "3",
    title: "Project Proposal",
    description: "Write a proposal for your project",
    category: "other",
    file_type: "docx",
    link: "https://example.com/proposal.docx",
    created_at: new Date("2024-11-10"),
  },
  {
    id: "4",
    title: "Cheat Sheet: React Native Components",
    description:
      "A comprehensive guide to using various React Native components",
    category: "lab",
    file_type: "pptx",
    link: "https://example.com/cheatsheet.pdf",
    created_at: new Date("2024-11-09"),
  },
  {
    id: "5",
    title: "Course Schedule",
    description: "View the course schedule",
    category: "exam",
    file_type: "xlsx",
    link: "https://example.com/schedule.pdf",
    created_at: new Date("2024-11-08"),
  },
  {
    id: "6",
    title: "Project Presentation Slides",
    description: "Download the project presentation slides",
    category: "lecture",
    file_type: "txt",
    link: "https://example.com/presentation.pptx",
    created_at: new Date("2024-11-07"),
  },
  {
    id: "7",
    title: "Sample Code",
    description: "View sample code for the project",
    category: "assignment",
    file_type: "zip",
    link: "https://example.com/code.zip",
    created_at: new Date("2024-11-06"),
  },
];
