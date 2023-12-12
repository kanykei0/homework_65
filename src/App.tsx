import { Route, Routes } from "react-router-dom";
import Toolbar from "./components/Toolbar/Toolbar";
import AdminPage from "./containers/Admin/AdminPage";
import Page from "./containers/Page/Page";

function App() {
  return (
    <>
      <header>
        <Toolbar />
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/pages/:id" element={<Page />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="*"
            element={
              <div className="d-flex justify-content-center mt-5 pt-5">
                <h1>Not Found!</h1>
              </div>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
