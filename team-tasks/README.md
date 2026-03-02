# React + TypeScript + Vite

# Team Tasks - Frontend Implementation

## Tech Stack
- **Framework:** React + TypeScript + Vite
- **Data Fetching:** TanStack Query (React Query)
- **State Management:** React Context (Auth) & Zustand (Filters)
- **Styling:** Tailwind CSS v4

## How it maps to Company Guidelines

### Project Structure
Follows the **Feature-First** organization:
- `src/features/auth`: Handles login and team member management.
- `src/features/tasks`: Handles the task list, cards, and modal logic.
- `src/features/dashboard`: Handles high-level statistics.
- `src/shared`: Reusable components (Button, States) and layouts.

### React Architecture
- **Separation of Concerns:** UI is separated from logic via custom hooks (`useTasksQuery`, `useTaskMutations`).
- **Container/Presentational Pattern:** Pages handle data fetching, while small components (TaskCard) handle rendering.

### State Management Strategy
- **Server State:** All remote data is managed by TanStack Query with cache invalidation for instant UI updates.
- **Global UI State:** Auth information is stored in React Context for global availability.
- **Complex UI State:** Task filters use Zustand for cross-navigation persistence.

### Styling & Design
- **Responsive:** Layout works on mobile and desktop.
- **Dark Mode:** Implemented using Tailwind's `dark` class and persisted in LocalStorage.