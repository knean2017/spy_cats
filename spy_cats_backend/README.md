# Spy Cat Agency - Backend

This is the backend API for the Spy Cat Agency management system, built with Django and Django REST Framework.

## Features

- Manage spy cats (CRUD operations)
- Validate cat breeds using TheCatAPI
- RESTful API endpoints

## Tech Stack

- [Django](https://www.djangoproject.com/) - Python web framework
- [Django REST Framework](https://www.django-rest-framework.org/) - Web API framework
- [SQLite](https://www.sqlite.org/) - Database (default)

## Getting Started

### Prerequisites

- Python 3.8 or higher
- pip package manager

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd the_Spy_Cat_Agency/spy_cats
   ```
3. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
4. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
5. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Database Setup

1. Apply migrations:
   ```bash
   python manage.py migrate
   ```

2. (Optional) Create a superuser for admin access:
   ```bash
   python manage.py createsuperuser
   ```

### Running the Application

To start the development server:

```bash
python manage.py runserver
```

The API will be available at http://localhost:8000

## API Endpoints

| Method | Endpoint        | Description           |
|--------|-----------------|-----------------------|
| GET    | /cats/          | Get all spy cats      |
| POST   | /cats/          | Create a new spy cat  |
| GET    | /cats/{id}/     | Get a specific cat    |
| PATCH  | /cats/{id}/     | Update a cat's salary |
| DELETE | /cats/{id}/     | Delete a spy cat      |

## Postman Collection

A Postman collection is available in the repository to test the API endpoints. Import the `PostmanCollection.json` file into Postman to get started.

## Project Structure

```
spy_cats/
  cats/           # Spy cats app
    models.py     # Cat model definition
    views.py      # API views
    serializers.py# Data serialization
    urls.py       # App URLs
  missions/       # Missions app (not implemented in frontend)
  manage.py       # Django management script
```

## GitHub Repository

To create a GitHub repository for this project:

1. Create a new repository on GitHub
2. Initialize git in your local project directory:
   ```bash
   cd the_Spy_Cat_Agency/spy_cats
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Connect your local repository to GitHub:
   ```bash
   git remote add origin https://github.com/your-username/spy-cat-agency-backend.git
   git branch -M main
   git push -u origin main
   ```