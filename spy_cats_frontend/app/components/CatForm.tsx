'use client';

import { useState, useEffect } from 'react';
import { CreateCatData } from '../services/api';

interface CatFormProps {
  onSubmit: (catData: CreateCatData) => void;
  onCancel: () => void;
}

export default function CatForm({ onSubmit, onCancel }: CatFormProps) {
  const [name, setName] = useState('');
  const [experience, setExperience] = useState('');
  const [breed, setBreed] = useState('');
  const [salary, setSalary] = useState('');
  const [breeds, setBreeds] = useState<string[]>([]);
  const [loadingBreeds, setLoadingBreeds] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch cat breeds from TheCatAPI
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        setLoadingBreeds(true);
        const response = await fetch('https://api.thecatapi.com/v1/breeds');
        const data = await response.json();
        const breedNames = data.map((breed: any) => breed.name);
        setBreeds(breedNames);
      } catch (err) {
        console.error('Failed to fetch breeds:', err);
        // Fallback breeds if API fails
        setBreeds(['Siamese', 'Persian', 'Maine Coon', 'British Shorthair', 'Bengal', 'Sphynx', 'Ragdoll', 'Scottish Fold']);
      } finally {
        setLoadingBreeds(false);
      }
    };

    fetchBreeds();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !experience || !breed || !salary) {
      setError('All fields are required');
      return;
    }

    const experienceNum = parseInt(experience);
    const salaryNum = parseFloat(salary);

    if (isNaN(experienceNum) || experienceNum < 0) {
      setError('Experience must be a positive number');
      return;
    }

    if (isNaN(salaryNum) || salaryNum < 0) {
      setError('Salary must be a positive number');
      return;
    }

    onSubmit({
      name,
      experience: experienceNum,
      breed,
      salary: salaryNum,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Spy Cat</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter cat's name"
            />
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
              Years of Experience *
            </label>
            <input
              type="number"
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter years of experience"
            />
          </div>

          <div>
            <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-1">
              Breed *
            </label>
            {loadingBreeds ? (
              <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500">
                Loading breeds...
              </div>
            ) : (
              <select
                id="breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none bg-white"
              >
                <option value="">Select a breed</option>
                {breeds.map((breedOption) => (
                  <option key={breedOption} value={breedOption}>
                    {breedOption}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
              Salary *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                $
              </span>
              <input
                type="number"
                id="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                min="0"
                step="0.01"
                className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter salary"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 pt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Add Cat
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}