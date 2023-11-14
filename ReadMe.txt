## Prerequisites

- Node.js (https://nodejs.org/)
- Go (https://golang.org/) - v 1.21.3

## Installation

1. Unzip the folder and open the "Medical-Clinic-21c" folder with visual studio

2. Open a terminal and navigate to the frontend directory:

   cd frontend


3. Install dependencies:
   npm install / npm i


4. Start the development server:
   npm run dev

5. Open another terminal and navigate to the backend directory:
   cd backend


6. Install Go packages:
   go mod tidy


4. Run the Go server:
   go run main.go


   If the backend server is not running at `http://localhost:4000`, open api.js file in Medical-Clinic-21c/frontend/src/api and change the baseUrl value to the current server url.

