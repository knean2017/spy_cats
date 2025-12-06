const API_BASE_URL = 'http://localhost:8000'; // Django runs on port 8000 by default

export interface Cat {
  id: number;
  name: string;
  experience: number;
  breed: string;
  salary: number;
}

export interface CreateCatData {
  name: string;
  experience: number;
  breed: string;
  salary: number;
}

export interface UpdateCatData {
  salary: number;
}

class ApiService {
  async getAllCats(): Promise<Cat[]> {
    const response = await fetch(`${API_BASE_URL}/cats/`);
    if (!response.ok) {
      throw new Error('Failed to fetch cats');
    }
    const data = await response.json();
    return data;
  }

  async getCatById(id: number): Promise<Cat> {
    const response = await fetch(`${API_BASE_URL}/cats/${id}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch cat');
    }
    const data = await response.json();
    return data.cat;
  }

  async createCat(catData: CreateCatData): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/cats/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(catData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to create cat');
    }
  }

  async updateCat(id: number, updateData: UpdateCatData): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/cats/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to update cat');
    }
  }

  async deleteCat(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/cats/${id}/`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to delete cat');
    }
  }
}

export const apiService = new ApiService();