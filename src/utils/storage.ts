import { Goal } from "../types/goal";

const KEY = "syfe_goals";

export const loadGoals = (): Goal[] =>
  JSON.parse(localStorage.getItem(KEY) || "[]");

export const saveGoals = (goals: Goal[]) =>
  localStorage.setItem(KEY, JSON.stringify(goals));
