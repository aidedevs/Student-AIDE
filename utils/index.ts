import * as SecureStore from "expo-secure-store";

export const saveToSecureStorage = async () => {
  return SecureStore.setItemAsync("appLaunched", "true");
};

export const getFromSecureStorage = async () => {
  try {
    const item = await SecureStore.getItemAsync("appLaunched");
    if (item) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    await SecureStore.deleteItemAsync("appLaunched");
    return undefined;
  }
};

export const getFormattedDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "short",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
export const getFormattedFullDate = (dateValue: Date | string): string => {
  const date = new Date(Number(dateValue));

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
export const getFormattedDateByMDY = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export function formatDateTime(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

interface TaskProps {
  completed: boolean;
  subTasks: {
    _id?: string | number;
    title?: string;
    completed?: boolean;
  }[];
}
export function calculateProgress(task: TaskProps) {
  const { subTasks, completed } = task;

  if (subTasks.length > 0) {
    const completedSubtasks = subTasks.filter(
      (subtask) => subtask.completed
    ).length;
    return Math.round((completedSubtasks / subTasks.length) * 100);
  } else {
    return completed ? 100 : 0;
  }
}

export function checkDueTaskDate(dueDate: Date): number {
  const today = new Date();

  const differenceInTime = dueDate?.getTime() - today?.getTime();

  const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

  return differenceInDays;
}

export const getFormattedDateByMY = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
