import {Route, Routes, BrowserRouter} from "react-router-dom";
import FileUploadHome from "./components/fileUploadHome/FileUploadHome"

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FileUploadHome />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
