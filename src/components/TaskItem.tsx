import React, { useState } from "react";
import type { Todo } from "../features/todos/todoTypes";
import { useAppDispatch } from "../hook";
import { toggleTodo, deleteTodo, updateTodo } from "../features/todos/todoSlice";
import { FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";

interface TaskItemProps {
  task: Todo;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editInput, setEditInput] = useState(task.title);

  const handleSave = () => {
    if (!editInput.trim()) return;
    dispatch(updateTodo({ id: task.id, title: editInput }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditInput(task.title);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-300">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => dispatch(toggleTodo(task.id))}
          className="w-5 h-5 cursor-pointer accent-pink-500 bg-white"
        />
        {isEditing ? (
          <input
            type="text"
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            className="border bg-white text-black border-pink-400 rounded-md p-2 text-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            autoFocus
          />
        ) : (
          <span
            className={`text-lg transition-all duration-300 ${
              task.completed
                ? "line-through text-gray-400 italic select-none"
                : "text-gray-800"
            }`}
          >
            {task.title}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="text-green-600 hover:text-green-800 transition"
              aria-label="Lưu chỉnh sửa"
            >
              <FiCheck size={22} />
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700 transition"
              aria-label="Huỷ chỉnh sửa"
            >
              <FiX size={22} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-yellow-500 hover:text-yellow-700 transition"
              aria-label="Chỉnh sửa công việc"
            >
              <FiEdit size={22} />
            </button>
            <button
              onClick={() => dispatch(deleteTodo(task.id))}
              className="text-red-500 hover:text-red-700 transition"
              aria-label="Xoá công việc"
            >
              <FiTrash2 size={22} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
