# Collab-Board

This project is a modern, fully client-side task management board, built on the principles of a Kanban board, similar to tools like Trello or Jira. It is designed to support basic collaborative team work and is implemented using modern React technologies.

# Project Overview

The project is an interactive whiteboard with the ability to drag and drop tasks between columns.

# Key Futures:

  # 1. Kanban Board:
  
     Tasks are organized into columns (To Do, In Progress, Done) and can be moved between them using drag-and-drop functionality.

  # 2. Task Management:
     
      Creation, deletion, and detailed viewing/editing of tasks.
     
      Tasks include Priority (Low, Medium, High), which is visually indicated by color.
     
      Support for Tags (Labels) for quick categorization (Design, Dev, Bug, etc.) with automatic color assignment.
  
  # 3. User Experience:
     
      Simple authentication using Name and Email to create a user profile.
     
      Theme Switching: Supports both light and dark modes.

  # 4. Team Collaboration (Workspaces/Groups):
     
      Groups logic has been implemented, allowing users to create separate workspaces (e.g., General Team, Marketing Team) and switch between them via the sidebar.
     
      The user profile, including Email, is displayed in the sidebar.

  # 5. Persistence:

      All application data (tasks, groups, user profile) are saved in the browser's local storage, ensuring they persist even after a page reload.


# Used Technologies and Libraries

  | Category         | Library                 | Purpose                 |
| ---------------- | -------------------------- | -------------------------- |
| Core Framework               | **React (with TypeScript)**                  | Building the user interface
| State Management          | **Zustand**       | A lightweight and fast library for global state management (used for storing tasks, groups, and the user profile)
| Data Persistence | **zustand/middleware/persist**                | Middleware for Zustand that enables automatic saving and restoration of data from localStorage.
| Routing    | React Router DOM | Managing navigation and routing between application pages (/login, /board, /chat)
| Drag and Drop       | Sonner                        | Used for displaying attractive, non-blocking toast notifications (e.g., upon task creation or deletion)
| Form Management    | React Hook Form and Zod | Managing form state and enabling schema-based, strict data validation (e.g., for the task creation modal)
| Icons            | React Icons               | Utilizing popular icon sets (such as Font Awesome) for various UI elements (e.g., moon/sun, trash, plus sign)
| Unique IDs            | uuid               | Generating unique identifiers for every task and group


![alt text](https://github.com/Cauteros974/collab-board/blob/main/src/assets/images/1.png)
