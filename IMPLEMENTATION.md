## ✅ Tech Stack Chosen

- **Frontend Framework**: Next.js 13 (App Router)
- **Styling**: Tailwind CSS
- **Backend**: API Routes with Next.js (Node.js under the hood)
- **Database**: MongoDB (accessed via Mongoose)
- **HTTP Requests**: Axios
- **State Management**: React Context API

## 🚀 How to Run the Application

### 1. **Clone the Repository**
```bash
git clone https://github.com/Anirudhmadhavkulkarni9094/marrow-assignment.git
cd marrow-assignment
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Environment Setup**
Create a `.env.local` file and add your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
```

### 4. **Run the Application**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 💡 Assumptions & Design Decisions

- **User Matching**: Tasks are assigned by matching the `assignedTo` field with the user's name. This could be replaced with user IDs for better consistency.
- **Task Management Only**: The project focuses on user and task management. **Note-taking functionality was not implemented**.
- **No Authentication**: To keep the app simple, authentication/authorization was not added.
- **Minimal UI/UX Enhancements**: The design uses Tailwind CSS for quick responsiveness and clarity.

## ✨ Features Implemented

- ✅ Fetch and display users
- ✅ Create new tasks via API
- ✅ List tasks and filter them by selected user
- ✅ Delete tasks by ID
- ✅ Centralized state via React Context API
- ✅ MongoDB integration with Mongoose
- ✅ Responsive UI using Tailwind CSS

## 🧪 Not Implemented

- ❌ Note-taking feature
- ❌ Task editing/updating
- ❌ Authentication and protected routes
- ❌ File uploads or advanced user settings

## 🚧 Potential Improvements

- Add task editing and completion status
- Use user IDs for task assignment
- Add authentication (e.g., NextAuth.js)
- Handle API errors with toast notifications
- Improve performance with pagination or infinite scroll
