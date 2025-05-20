import React from "react";
import AddTask from "./components/AddTask";
import TodoList from "./features/todos/TodoList";

const App: React.FC = () => {
  return (
<div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-center items-center">
  <h1 className="text-center text-3xl font-bold mb-6 text-black">Ứng dụng Todo List</h1>
  <div className="w-full max-w-lg">
    <AddTask />
    <TodoList />
  </div>
</div>

  );
};

export default App;
