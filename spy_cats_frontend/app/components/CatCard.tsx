'use client';

import { Cat } from '../services/api';

interface CatCardProps {
  cat: Cat;
  onDelete: (id: number) => void;
  onEditSalary: (cat: Cat) => void;
}

export default function CatCard({ cat, onDelete, onEditSalary }: CatCardProps) {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this spy cat?')) {
      onDelete(cat.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{cat.name}</h2>
            <div className="flex items-center mt-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {cat.breed}
              </span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full px-3 py-1 text-sm font-bold text-white">
            ID: {cat.id}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <span className="text-gray-600 font-medium">Experience:</span>
            <span className="font-bold text-lg text-indigo-600">{cat.experience} years</span>
          </div>
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <span className="text-gray-600 font-medium">Salary:</span>
            <span className="font-bold text-lg text-green-600">${cat.salary.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          <button
            onClick={() => onEditSalary(cat)}
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-bold transition duration-200 shadow hover:shadow-md"
          >
            Edit Salary
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-2 px-4 rounded-lg text-sm font-bold transition duration-200 shadow hover:shadow-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}