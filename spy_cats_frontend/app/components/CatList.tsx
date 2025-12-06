'use client';

import { useState, useEffect } from 'react';
import { Cat, apiService } from '../services/api';
import CatCard from './CatCard';
import CatForm from './CatForm';
import EditSalaryModal from './EditSalaryModal';

export default function CatList() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCat, setEditingCat] = useState<Cat | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAllCats();
      setCats(data);
    } catch (err) {
      setError('Failed to fetch cats');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCat = async (catData: Omit<Cat, 'id'>) => {
    try {
      await apiService.createCat(catData as any);
      setShowForm(false);
      fetchCats();
    } catch (err) {
      setError('Failed to create cat');
      console.error(err);
    }
  };

  const handleDeleteCat = async (id: number) => {
    try {
      await apiService.deleteCat(id);
      fetchCats();
    } catch (err) {
      setError('Failed to delete cat');
      console.error(err);
    }
  };

  const handleEditSalary = (cat: Cat) => {
    setEditingCat(cat);
    setShowEditModal(true);
  };

  const handleUpdateSalary = async (id: number, salary: number) => {
    try {
      await apiService.updateCat(id, { salary });
      setShowEditModal(false);
      setEditingCat(null);
      fetchCats();
    } catch (err) {
      setError('Failed to update salary');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading spy cats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-3">
            <span className="block">Spy Cats</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mt-2">
              Dashboard
            </span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Manage your elite team of spy cats
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            {showForm ? 'Cancel' : 'Add New Cat'}
          </button>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          </div>
        )}

        {showForm && (
          <div className="mb-12 transition-all duration-300 ease-in-out">
            <CatForm onSubmit={handleCreateCat} onCancel={() => setShowForm(false)} />
          </div>
        )}

        {cats.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg max-w-2xl mx-auto">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-blue-100">
              <svg className="h-12 w-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="mt-5 text-2xl font-bold text-gray-900">No spy cats found</h3>
            <p className="mt-2 text-gray-500">
              Get started by adding your first spy cat to the agency.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow transition duration-200"
              >
                Add Your First Cat
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cats.map((cat) => (
              <CatCard
                key={cat.id}
                cat={cat}
                onDelete={handleDeleteCat}
                onEditSalary={handleEditSalary}
              />
            ))}
          </div>
        )}

        {showEditModal && editingCat && (
          <EditSalaryModal
            cat={editingCat}
            onClose={() => {
              setShowEditModal(false);
              setEditingCat(null);
            }}
            onUpdate={handleUpdateSalary}
          />
        )}
      </div>
    </div>
  );
}