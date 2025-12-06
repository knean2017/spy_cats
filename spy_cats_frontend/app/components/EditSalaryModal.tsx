'use client';

import { useState, useEffect } from 'react';
import { Cat } from '../services/api';

interface EditSalaryModalProps {
  cat: Cat;
  onClose: () => void;
  onUpdate: (id: number, salary: number) => void;
}

export default function EditSalaryModal({ cat, onClose, onUpdate }: EditSalaryModalProps) {
  const [salary, setSalary] = useState(cat.salary.toString());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const salaryNum = parseFloat(salary);
    
    if (isNaN(salaryNum) || salaryNum < 0) {
      setError('Salary must be a positive number');
      return;
    }

    onUpdate(cat.id, salaryNum);
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleClickOutside}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 rounded-t-xl">
          <h2 className="text-xl font-bold text-white">Edit Salary for {cat.name}</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 py-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <div className="mb-6">
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
              New Salary
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 font-bold">
                $
              </span>
              <input
                type="number"
                id="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                min="0"
                step="0.01"
                className="w-full pl-8 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter new salary"
                autoFocus
              />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Current salary: <span className="font-bold">${cat.salary.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
            >
              Update Salary
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}