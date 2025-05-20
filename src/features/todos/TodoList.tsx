import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import TaskItem from "../../components/TaskItem";
import { getMockTodos } from "../../api/todoApi";
import { setTodos } from "./todoSlice"

const TodoList: React.FC = () => {
  const todos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false)
  useEffect( () => {
    const localData = localStorage.getItem("todos")
    if (localData) {
      dispatch(setTodos(JSON.parse(localData)))
      setLoading(false)
    } else {
      const fetchTodos = async () => {
        setLoading(true);
        const data = await getMockTodos();
        dispatch(setTodos(data))
        setLoading(false)
      }
      fetchTodos()
    }
  },[dispatch])
  if (!todos.length)
    return (
      <p className="text-center mt-20 text-gray-400 text-xl select-none">
        Chưa có công việc nào
      </p>
    );

  if (loading) return <p>Loading ...</p>
  return (
    <div className="min-h-screen flex flex-col justify-start p-2 items-center bg-gradient-to-tr from-pink-50 via-white to-pink-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden">
        <h1 className="text-center text-3xl font-extrabold text-pink-600 py-6 tracking-wide select-none">
          Todo List
        </h1>
        {todos.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
