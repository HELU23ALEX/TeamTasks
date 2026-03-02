# ADR-0001: Use Zustand for Task Filters

## Status
Accepted

## Context
The "Team Tasks" app requires task filters (status, search, assignee) to persist across the Tasks section. These filters are used by the Sidebar, the FilterBar, and the TaskList.

## Decision
We will use **Zustand** to manage this complex UI state instead of React Context or Prop Drilling.

## Consequences
- **Pros:** Better performance (no unnecessary re-renders of the whole tree), simpler API, and follows the "Complex Business State Strategy" in company guidelines.
- **Cons:** Adds a small external dependency.



# ADR-0001: Use Zustand for Task Filters

## Status
Accepted

## Context
The "Team Tasks" application requires complex filtering (search, status, assignee) that must persist while the user navigates between the Dashboard and the Task List. Using standard React `useState` would cause filters to reset on every navigation.

## Decision
We decided to use **Zustand** to manage the task filter state. 

## Rationale
1. **Persistence:** State is stored outside the component tree, ensuring it survives navigation.
2. **Performance:** Zustand allows components to subscribe to specific pieces of state, preventing unnecessary re-renders of the entire app.
3. **Alignment:** This follows the company's "State Management Strategy" which recommends Zustand for complex, high-frequency UI state.

## Consequences
- **Pros:** Decouples logic from UI; easier to implement "Clear All" functionality; clean API.
- **Cons:** Adds a small library dependency.