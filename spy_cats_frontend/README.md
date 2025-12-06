# Spy Cats Dashboard - Frontend

This is the frontend application for the Spy Cat Agency management system, built with Next.js.

## Features

- View all spy cats in the agency
- Add new spy cats with their details
- Edit a spy cat's salary
- Delete spy cats from the system

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React](https://reactjs.org/) - UI library

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd spy_cats_frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:3000

### Building for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## API Integration

The frontend communicates with the Django backend API running on `http://localhost:8000`. Make sure the backend server is running for the frontend to work properly.

**Note:** For the frontend to communicate with the backend, CORS must be configured properly. The Django backend should have django-cors-headers installed and configured.

## Project Structure

```
app/
  components/     # Reusable UI components
  services/       # API service layer
  page.tsx        # Main page component
  layout.tsx      # Root layout component
```

## Components

- `CatList` - Main dashboard component that displays all cats and handles CRUD operations
- `CatCard` - Individual cat display card with edit/delete actions
- `CatForm` - Form for creating new spy cats
- `EditSalaryModal` - Modal for updating a cat's salary

## API Service

The `apiService` handles all communication with the backend API:
- `getAllCats()` - Fetch all spy cats
- `getCatById(id)` - Fetch a specific cat by ID
- `createCat(data)` - Create a new spy cat
- `updateCat(id, data)` - Update a cat's information
- `deleteCat(id)` - Delete a spy cat

## GitHub Repository

To create a GitHub repository for this project:

1. Create a new repository on GitHub
2. Initialize git in your local project directory:
   ```bash
   cd spy_cats_frontend
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Connect your local repository to GitHub:
   ```bash
   git remote add origin https://github.com/your-username/spy-cat-agency-frontend.git
   git branch -M main
   git push -u origin main
   ```