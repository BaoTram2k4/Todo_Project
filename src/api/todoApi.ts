import axios from "axios";
import type { Todo } from "../features/todos/todoTypes";

export const getMockTodos = async (): Promise<Todo[]> => {
  const res = await axios.get("/mocks/mockTodos.json");
  return res.data;
};
