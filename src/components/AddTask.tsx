import React, { useState } from "react";
import { useAppDispatch } from "../hook";
import { addTodo } from "../features/todos/todoSlice";
import { FiPlus } from "react-icons/fi";

const AddTask: React.FC = () => {
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    if (!input.trim()) return;
    dispatch(addTodo(input));
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="flex gap-3 mb-6 max-w-lg mx-auto px-4">
      <input
        type="text"
        value={input}
        placeholder="Nhập công việc..."
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow border border-pink-400 rounded-md p-3 text-lg text-black bg-white placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
      />
      <button
        onClick={handleAdd}
        className="bg-pink-500 hover:bg-pink-600 transition text-white px-6 rounded-md flex items-center justify-center"
        aria-label="Thêm công việc"
      >
        <FiPlus size={24} />
      </button>
    </div>
  );
};

export default AddTask;
