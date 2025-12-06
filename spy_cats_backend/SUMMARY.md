# Spy Cat Agency - Full Stack Application

This project implements a full-stack CRUD application for managing spy cats in the Spy Cat Agency.

## Project Structure

The project consists of two main parts:

1. **Backend** (`the_Spy_Cat_Agency/spy_cats`): Django REST API
2. **Frontend** (`the_Spy_Cat_Agency/spy_cats_frontend`): Next.js dashboard

## Backend Features

- Django REST Framework API for managing spy cats
- SQLite database for data persistence
- Validation of cat breeds using TheCatAPI
- CORS configuration for frontend integration
- RESTful endpoints for CRUD operations

### API Endpoints

| Method | Endpoint        | Description           |
|--------|-----------------|-----------------------|
| GET    | /cats/          | Get all spy cats      |
| POST   | /cats/          | Create a new spy cat  |
| GET    | /cats/{id}/     | Get a specific cat    |
| PATCH  | /cats/{id}/     | Update a cat's salary |
| DELETE | /cats/{id}/     | Delete a spy cat      |

## Frontend Features

- Next.js dashboard with TypeScript
- Tailwind CSS for styling
- Responsive design
- CRUD operations for spy cats
- Form validation
- Error handling

### UI Components

1. **CatList** - Main dashboard showing all spy cats
2. **CatCard** - Individual cat display with actions
3. **CatForm** - Form for creating new spy cats
4. **EditSalaryModal** - Modal for updating cat salaries

## How to Run

### Backend

1. Navigate to the backend directory:
   ```bash
   cd the_Spy_Cat_Agency/spy_cats
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Apply migrations:
   ```bash
   python manage.py migrate
   ```

4. Start the server:
   ```bash
   python manage.py runserver
   ```

The backend will be available at http://localhost:8000

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd the_Spy_Cat_Agency/spy_cats_frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at http://localhost:3000

## Postman Collection

A Postman collection is included in the backend directory (`PostmanCollection.json`) for testing the API endpoints.

## Technologies Used

### Backend
- Python
- Django
- Django REST Framework
- SQLite
- requests (for TheCatAPI integration)

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- React

## Project Requirements Fulfilled

✅ Spy Cats Management:
- Ability to create a spy cat in the system
- Ability to remove spy cats from the system
- Ability to update spy cats' information (Salary)
- Ability to list spy cats
- Ability to get a single spy cat

✅ Frontend Dashboard:
- List of all spy cats
- Form to add a new spy cat
- Edit option to update a cat's Salary
- Delete option to remove a spy cat

✅ Technical Requirements:
- Used Django for backend
- Used Next.js for frontend
- Used TailwindCSS for UI
- Handles API errors gracefully
- Clean, functional UI with clear API integration

## Notes

- The frontend communicates with the backend via CORS-enabled API calls
- Breed validation is implemented using TheCatAPI
- Salary validation ensures positive values
- Experience validation ensures positive values
- All CRUD operations are fully functional