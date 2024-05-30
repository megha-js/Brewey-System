import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  Landing,
  Auth,
  Error,
  ProtectedRoute,
  SharedLayout,
  Breweries,
  BreweryInfo,
} from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Breweries />} />
          <Route path="breweryInfo/:breweryId" element={<BreweryInfo />}></Route>
        </Route>

        <Route path="/landing" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
    </Router>
  );
}

export default App;
