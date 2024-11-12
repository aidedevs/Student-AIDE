export const eventsData = [
  {
    id: "evnt1",
    title: "Student Research Exhibition",
    description:
      "Showcase of innovative research projects by students across various disciplines. An opportunity to network with professors and industry leaders.",
    category: "EVENT",
    location: "Conference Room",
    activity_date: new Date("2022-01-01T10:00:00"),
    created_at: new Date("2022-01-01T10:00:00"),
    organize_by: "SLM Department",
    image: require("./dummy/img1.png"),
  },
  {
    id: "evnt2",
    title: "Professional Development Workshop",
    description:
      "Learn valuable skills and techniques for success in your career. Offered by a faculty member.",
    category: "WORKSHOP",
    location: "Online",
    activity_date: new Date("2022-02-15T14:00:00"),
    created_at: new Date("2022-01-01T10:00:00"),
    organize_by: "Student Council",
    image: require("./dummy/img1.png"),
  },
  {
    id: "evnt3",
    title: "Student Council Meeting",
    description:
      "Discuss upcoming student initiatives, share ideas, and engage in discussions with faculty and staff.",
    category: "MEETING",
    location: "Conference Room",
    activity_date: new Date("2022-03-10T12:00:00"),
    created_at: new Date("2022-01-01T10:00:00"),
    organize_by: "Student Council",
    image: require("./dummy/img1.png"),
  },
];

export const newsData = [
  {
    id: "1",
    title: "Annual Career Fair for Graduating Students",
    description:
      "Top companies will be on campus to recruit final-year students. Don't miss this opportunity to network and explore career options.",
    created_at: new Date("2022-01-01T10:00:00"),
    image: require("./dummy/img1.png"),
  },
  {
    id: "2",
    title: "Workshops on Mental Health and Well-being",
    description:
      "Interactive workshops aimed at promoting mental health awareness and coping strategies for students. Free entry for all.",
    created_at: new Date("2022-01-01T10:00:00"),
    image: require("./dummy/img1.png"),
  },
  {
    id: "3",
    title: "Hackathon: Innovating for a Greener Tomorrow",
    description:
      "A 48-hour coding challenge for students passionate about creating tech solutions to environmental problems. Cash prizes for winning teams.",
    created_at: new Date("2022-01-01T10:00:00"),
    image: require("./dummy/img1.png"),
  },
  {
    id: "4",
    title: "Student Council Meeting",
    description:
      "Discuss upcoming student initiatives, share ideas, and engage in discussions with faculty and staff.",
    created_at: new Date("2022-01-01T10:00:00"),
    image: require("./images/students.jpg"),
  },
];

export const studentCenterData = [
  {
    id: "sc1",
    title: "Student Council",
    content:
      "A committee that meets regularly to discuss student issues, share ideas, and advocate for policies and initiatives.",
    image: require("./dummy/img2.png"),
    user: {
      name: "Codewave",
      img: require("./images/user.png"),
      course: "Computer Science",
    },
    created_at: new Date("2014-10-01T10:10:00"),
  },
  {
    id: "sc2",
    title: "The Science Behind Color Psychology: How Colors Affect Mood",
    content:
      "Colors can influence how we feel and act. From calming blues to energetic reds, businesses and designers use color psychology to evoke certain emotions in customers. Understanding how different colors affect mood can help in branding, marketing, and interior design.",
    image: require("./dummy/img3.png"),
    user: {
      name: "John Doe",
      img: require("./images/user.png"),
      course: "Computer Science",
    },
    created_at: new Date("2015-01-15T14:30:00"),
  },
  {
    id: "sc3",
    title: "The Rise of Electric Vehicles: What the Future Holds",
    content:
      "Electric vehicles (EVs) are becoming a key player in the automotive industry. With advancements in battery technology, lower costs, and government incentives, more people are making the switch. The future promises greener, more efficient transportation with EVs leading the way.",
    image: require("./dummy/img3.png"),
    user: {
      name: "Gift Asamoah",
      img: require("./images/user.png"),
      course: "Computer Science",
    },
    created_at: new Date("2016-02-20T12:00:00"),
  },
];

export const achievementData = [
  {
    id: "sc1",
    title: "Hackathon  Champion",
    content:
      "A committee that meets regularly to discuss student issues, share ideas, and advocate for policies and initiatives.",
    image: require("./images/user.png"),
    user: {
      name: "Codewave",
      img: require("./images/user.png"),
      course: "Computer Science",
    },
    created_at: new Date("2014-10-01T10:10:00"),
  },
  {
    id: "sc2",
    title: "Best Student of the Month (October)",
    content:
      "Colors can influence how we feel and act. From calming blues to energetic reds, businesses and designers use color psychology to evoke certain emotions in customers. Understanding how different colors affect mood can help in branding, marketing, and interior design.",
    image: require("./images/user.png"),
    user: {
      name: "John Doe",
      img: require("./images/user.png"),
      course: "Computer Science",
    },
    created_at: new Date("2015-01-15T14:30:00"),
  },
  {
    id: "sc3",
    title: "All time best graduating student",
    content:
      "Electric vehicles (EVs) are becoming a key player in the automotive industry. With advancements in battery technology, lower costs, and government incentives, more people are making the switch. The future promises greener, more efficient transportation with EVs leading the way.",
    image: require("./dummy/img3.png"),
    user: {
      name: "Gift Asamoah",
      img: require("./images/user.png"),
      course: "Computer Science",
    },
    created_at: new Date("2016-02-20T12:00:00"),
  },
];
// https://chatgpt.com/c/ca845f22-4cf8-4846-a153-189d9cbca3aa
export const taskData = [
  {
    id: "task1",
    title: "Navigation issue in the milestone",
    description:
      "This is a low priority task  in the milestone and will be executed when the milestone is updated to the latest version of the project ",
    completed: false,
    due_date: new Date("2022-10-31"),
    created_at: new Date("2024-10-31"),
    priority: "low",
    subTasks: [
      {
        id: "subtask1",
        title: "Review code",
        description: "Review the code for potential bugs",
        completed: true,
        due_date: new Date("2024-11-14"),
        created_at: new Date("2024-10-31"),
      },
      {
        id: "subtask2",
        title: "Check for syntax errors",
        description: "Check for any syntax errors in the code",
        completed: false,
        due_date: new Date("2022-10-31"),
        created_at: new Date("2024-10-31"),
      },
      {
        id: "subtask3",
        title: "Fix bugs",
        description: "Fix the bugs in the code",
        completed: false,
        due_date: new Date("2024-12-31"),
        created_at: new Date("2024-10-31"),
      },
    ],
  },
  {
    id: "task2",
    title: "Design a new logo",
    description: "This is a medium priority task",
    completed: false,
    due_date: new Date("2022-11-30"),
    created_at: new Date("2024-10-31"),
    priority: "medium",
    subTasks: [],
  },
  {
    id: "task3",
    title: "Write a report",
    description: "This is a high priority task",
    completed: false,
    due_date: new Date("2022-12-31"),
    created_at: new Date("2024-10-31"),
    priority: "high",
    subTasks: [
      {
        id: "subtask1",
        title: "Create the report structure",
        description:
          "Create the report structure with sections and subsections",
        completed: false,
        due_date: new Date("2022-12-31"),
        created_at: new Date("2024-10-31"),
      },
      {
        id: "subtask2",
        title: "Write the main content",
        description:
          "Write the main content of the report, including data analysis, findings, and conclusions",
        completed: false,
        due_date: new Date("2022-12-31"),
        created_at: new Date("2024-10-31"),
      },
    ],
  },
  {
    id: "task4",
    title: "Review the presentation",
    description: "This is a low priority task",
    completed: false,
    due_date: new Date("2022-11-05"),
    created_at: new Date("2024-10-31"),
    priority: "low",
    subTasks: [],
  },
];

interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  type: "class" | "exam" | "holiday" | "assignment";
  description?: string;
}

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
