import { BrowserRouter, Routes, Route } from "react-router";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { setUsersData } from "./features/user-management/userSlice";
import useApi from "./hooks/useApi/useApi";
import Loader from "./components/atoms/loader/Loader";

const HomePage = lazy(() => import("./pages/homepage/HomePage"));
const PostsPage = lazy(() => import("./pages/posts-page/PostsPage"));
const TasksPage = lazy(() => import("./pages/tasks-page/TasksPage"));

interface Address {
  city: string;
  street: string;
  suite: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  address: Address;
}

function App() {
  const { request } = useApi();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUsers() {
      const data = await request({
        endpoint: "users",
      });

      const filteredUserData = data.map((user: User) => {
        const {
          username,
          email,
          address: { city, street, suite },
          id,
        } = user;

        return { username, email, city, street, suite, id };
      });

      dispatch(setUsersData(filteredUserData));
    }

    fetchUsers();
  }, [request, dispatch]);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="posts/:id" element={<PostsPage />} />
          <Route path="tasks" element={<TasksPage />} />
        </Routes>
        </Suspense>
    </BrowserRouter>
  );
}

export default App;
