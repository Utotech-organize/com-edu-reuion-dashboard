import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  return (
    <div className="dashboard">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
