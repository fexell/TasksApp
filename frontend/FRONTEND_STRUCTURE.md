# Frontend Structure - Tasks App

## Overview
Complete frontend implementation for the main Tasks application with authenticated and unauthenticated views.

## New Files Created

### 1. **Main Page** - `src/app/(main)/page.js`
- Main entry point for the application
- Handles authentication state checking
- Renders either `MainContent` (logged in) or `LoggedOutView` (logged out)
- Shows loading state while checking authentication
- Tracks last visited page for navigation purposes

**Key Features:**
- Uses `useAuthStore` to check if user is authenticated
- Listens for auth:expired events to handle session timeouts
- Displays loading spinner while `isInitialized` is false

### 2. **Custom Hook** - `src/hooks/useTasks.js`
Manages all task-related API operations with full CRUD functionality.

**Functions:**
- `fetchTasks()` - Fetch all user tasks
- `createTask(taskData)` - Create new task
- `updateTask(taskId, taskData)` - Update existing task
- `deleteTask(taskId)` - Delete a task
- `toggleTask(taskId, isCompleted)` - Toggle task completion status

**State Management:**
- `tasks` - Array of all tasks
- `isLoading` - Loading state during fetch
- `error` - Error message if fetch fails

### 3. **Main Components** - `src/components/Main/`

#### `MainContent.jsx`
The main container for logged-in users.
- Displays header with greeting
- Shows any errors that occurred
- Renders the create task form
- Renders the tasks list
- Uses `useTasks` hook for data management

#### `CreateTaskForm.jsx`
Form component for creating new tasks.

**Features:**
- Text input for task title (required)
- Textarea for task description (optional)
- Form validation
- Error display
- Toast notifications for success/failure
- Uses `TextField` and `SubmitButton` from existing UI components

#### `TasksList.jsx`
Container component that displays all tasks.

**Features:**
- Loading state with spinner
- Empty state when no tasks exist
- Task count display
- Renders individual `TaskItem` components for each task

#### `TaskItem.jsx`
Individual task row component.

**Features:**
- Toggle completion status with checkbox icon
- Delete button with confirmation
- Shows task title and description
- Shows creation date
- Displays different styling for completed tasks
- Loading states during operations

#### `LoggedOutView.jsx`
Welcome page for unauthenticated users.

**Features:**
- Prominent call-to-action buttons (Sign In / Sign Up)
- Feature list highlighting app benefits
- Icon and welcoming message
- Links to authentication pages

## Data Flow

```
Page (checks auth)
├── If authenticated → MainContent
│   ├── useTasks hook (fetches all tasks)
│   ├── CreateTaskForm
│   │   └── Calls useTasks.createTask()
│   └── TasksList
│       └── TaskItem (for each task)
│           ├── toggleTask()
│           └── deleteTask()
└── If not authenticated → LoggedOutView
    └── Links to /auth/login and /auth/signup
```

## Integration with Existing Code

### Used Components
- `TextField` - From `src/components/UI/TextField.jsx`
- `SubmitButton` - From `src/components/UI/SubmitButton.jsx`
- `FormError` - From `src/components/Utils/FormError.jsx`

### Used Hooks
- `useAuthStore` - Authentication state management
- `useTrackLastPage` - Track navigation history

### Used API
- API client from `src/lib/api.js`
- Handles CSRF tokens, auth refresh, and error formatting automatically

### Styling
- Uses existing Tailwind CSS configuration
- Primary color: `--primary-color` (#ffba00 - amber)
- Dark theme: neutrals with dark backgrounds
- Consistent with Header and other app components

## API Endpoints Used

The `useTasks` hook assumes these endpoints:
```
GET    /tasks              - List all user tasks
POST   /tasks              - Create new task
PUT    /tasks/{taskId}     - Update task
DELETE /tasks/{taskId}     - Delete task
```

Each endpoint should handle:
- Authentication (via session cookie)
- CSRF token validation
- JSON request/response bodies
- Error responses with proper error messages

## Task Object Structure

Expected structure from backend:
```javascript
{
  id: string,                // Unique identifier
  title: string,             // Task title (required)
  description: string | null, // Optional description
  isCompleted: boolean,      // Completion status
  createdAt: string,         // ISO date string (optional for display)
  updatedAt: string          // ISO date string (optional)
}
```

## Features Implemented

✅ **Authentication-based rendering**
- Shows different UI based on login status
- Smooth loading states

✅ **Task Management**
- Create tasks with title and optional description
- View all user tasks
- Mark tasks as complete/incomplete
- Delete tasks with confirmation
- Real-time UI updates

✅ **Error Handling**
- Form validation
- API error messages
- Toast notifications
- Error boundary display

✅ **Loading States**
- Page-level loading spinner
- Form submission loading state
- Individual task action loading states
- List loading skeleton

✅ **User Experience**
- Confirmation dialogs for destructive actions
- Success/error toast notifications
- Disabled states during operations
- Responsive design
- Keyboard accessibility

## Next Steps

If you want to extend this further:

1. **Add filtering/sorting**: Update `TasksList` to show filters
2. **Add categories/tags**: Extend task object and components
3. **Add due dates**: Add date picker to form
4. **Add editing**: Create edit mode for existing tasks
5. **Add search**: Add search functionality
6. **Add pagination**: For large task lists
7. **Add offline sync**: Use IndexedDB for offline support

## Testing Considerations

When testing locally, make sure:
1. Backend `/tasks` endpoints are implemented
2. User authentication is working
3. CSRF protection is configured
4. API returns proper error responses

Start by testing the flow:
1. Visit `/` while not logged in → should see `LoggedOutView`
2. Login → should redirect to `/` and see `MainContent`
3. Create task → should appear in list
4. Toggle task → should update UI
5. Delete task → should show confirmation and remove
