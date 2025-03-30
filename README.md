# GitHub Fetcher Backend

This project consists of two parts: a frontend application and a backend application. Together, they provide a platform to fetch, sort, and like GitHub repositories, with a focus on displaying repository data sorted by the most stars in descending order.

---

## **Backend**

### Features

- **Fetch Repositories**: Retrieve top-rated GitHub repositories sorted by stars.
- **Sorting and Pagination**: Support for sorting repositories by stars and fetching paginated data.
- **Favorites Management**: Endpoints to save and filter favorite repositories.

### Getting Started

#### Prerequisites

- Node.js (v16 or higher) installed on your machine.
- npm (Node Package Manager).
- A GitHub Classic Token with access to the necessary APIs. Generate one [here](https://github.com/settings/tokens).

#### Environment Setup

1. Create a `.env` file in the root directory:

   ```
   GITHUB_TOKEN=your_github_token
   PORT=5001
   MONGODB_URI=your_mongodb_uri
   ```

2. Replace `your_github_token` with your GitHub Classic Token.

#### Installation

1. Clone the backend repository:

   ```bash
   git clone https://github.com/OptimaLPro/GitHub-Fetcher-Backend.git
   cd GitHub-Fetcher-Backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

#### Running the Application

Start the development server:

```bash
npm run dev
```

The backend application will run at `http://localhost:5001`.

---

## Endpoints

### Base URL

`http://localhost:5001`

### Link to Frontend repository
  ```
  https://github.com/OptimaLPro/GitHub-Fetcher
  ```
