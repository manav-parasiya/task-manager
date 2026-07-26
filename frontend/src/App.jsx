import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateTask from './features/task-manager/task-listing/components/CreateSingleTask';
import EditSingleTask from './features/task-manager/task-listing/components/EditSingleTask';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/create-task', element: <CreateTask /> },
      { path: '/edit-task/:id', element: <EditSingleTask /> },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;