# London Underground Information App

This is a simple full-stack web application that provides information about London Underground lines, including their status and details about specific stops on a line.

## Features

- Display the status of London Underground lines.
- Retrieve details about specific stops on a London Underground line.

## Technologies Used

- Frontend:
  - React
  - TypeScript

- Backend:
  - Node.js
  - Express
  - Axios

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd london-underground-app
```

2. Install dependencies for both frontend and backend:

```bash
# Navigate to frontend directory
cd london-underground-frontend
npm install

# Navigate to backend directory
cd ../london-underground-backend
npm install
```

## Configuration

1. Backend Server Configuration:

   - The backend server uses environment variables for configuration. Create a `.env` file in the `london-underground-backend` directory and specify the following variables:

     ```
     PORT=5000
     ```

2. Frontend Server Configuration:

   - If necessary, update the server URL in the `App.tsx` file in the `london-underground-frontend` directory to match the backend server's URL.

## Usage

1. Start the backend server:

```bash
# Navigate to backend directory
cd london-underground-backend

# Start the server
npm start
```

2. Start the frontend development server:

```bash
# Navigate to frontend directory
cd ../london-underground-frontend

# Start the server
npm start
```

3. Access the application in your browser at `http://localhost:3000`.

## API Endpoints

- `/api/lineStatus`: GET request to retrieve the status of London Underground lines.
- `/api/lineStop/:lineId/:stopId`: GET request to retrieve details about a specific stop on a London Underground line.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
