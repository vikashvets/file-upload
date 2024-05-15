import {Route, Routes, BrowserRouter} from "react-router-dom";
import FileUploadHome from "./components/fileUploadHome/FileUploadHome"
import {Snackbar} from "@mui/material";
import {useState} from "react";

function App() {
    const [snackbarOptions, setSnackbarOption] = useState({});

    return (
      <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<FileUploadHome setSnackbarOption={setSnackbarOption}/>} />
            </Routes>
          </BrowserRouter>
          <Snackbar
              onClose={() => { setSnackbarOption({ ...snackbarOptions, open: false }); }}
              autoHideDuration={5000}
              {...snackbarOptions}
          />
      </>
  );
}

export default App;
