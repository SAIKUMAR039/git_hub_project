# GitHub Project Search and Bookmark Frontend

## Overview

This is the frontend for the GitHub Project Search and Bookmark application. It allows users to search for GitHub repositories, bookmark their favorite repositories, and manage their bookmarks. The application also includes user authentication for a personalized experience.

## Features

- **User Authentication**: Signup and login functionality with JWT-based authentication.
- **Search GitHub Repositories**: Search for repositories using the GitHub API and display results.
- **Bookmark Management**: Add, view, and delete bookmarks for repositories.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend Framework**: React.js
- **State Management**: Context API or Redux
- **Styling**: Tailwind CSS or Material-UI
- **HTTP Client**: Axios
- **Routing**: React Router

## Pages

1. **Home Page**: Welcome message and navigation links.
2. **Authentication Pages**: Signup and login forms.
3. **Search Page**: Search bar and results display.
4. **Bookmarks Page**: List of saved bookmarks with delete functionality.

## API Endpoints

- **Authentication**:
  - `POST /api/auth/signup`: User signup.
  - `POST /api/auth/login`: User login.
- **Search**:
  - `GET /api/search?query=<search_term>`: Search for repositories.
- **Bookmarks**:
  - `POST /api/bookmarks`: Add a bookmark.
  - `GET /api/bookmarks`: Fetch bookmarks.
  - `DELETE /api/bookmarks/:repoId`: Delete a bookmark.

## Setup Instructions

1. Clone the repository.
2. Navigate to the `frontend` directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Environment Variables

Create a `.env` file in the `frontend` directory and add the following:

```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

## Additional Notes

- Ensure the backend is running before starting the frontend.
- Use environment variables to store sensitive data like API base URLs.
- Implement error handling and loading states for API calls.
- Add basic form validation for authentication inputs.
