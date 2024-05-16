import {Route, Routes, BrowserRouter} from "react-router-dom";
import FileUploadHome from "./components/fileUploadHome/FileUploadHome"
import {Alert, Snackbar} from "@mui/material";
import {useEffect, useState} from "react";
import configureWsClient from "./configureWsClient";
import {SnackbarConfig} from "./interfaces/SnackbarConfig";

function App() {
    const [snackbarOptions, setSnackbarOption] = useState<SnackbarConfig>({
        snackbar: {
            open: false,
            autoHideDuration: 5000,
        },
        alert: {
            severity: 'success',
            variant: 'filled',
        },
        content: '',
    });

    const handleSnackbarClose = () => { setSnackbarOption({
        ...snackbarOptions,
        snackbar: { ...snackbarOptions.snackbar, open: false }});
    };

    useEffect(() => {
        configureWsClient( (data) => {
            console.log(data);
            setSnackbarOption({ snackbar: {open: true}, content: data, alert: {severity: 'success'} });
        })
    }, []);

    return (
      <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<FileUploadHome setSnackbarOption={setSnackbarOption}/>} />
            </Routes>
          </BrowserRouter>
          <Snackbar
              onClose={handleSnackbarClose}
              autoHideDuration={5000}
              {...snackbarOptions.snackbar}
          >
              <Alert
                  onClose={handleSnackbarClose}
                  sx={{ width: '100%' }}
                  severity={'success'}
                  variant={'filled'}
                  {...snackbarOptions.alert}
              >
                  {snackbarOptions.content}
              </Alert>
          </Snackbar>
      </>
  );
}

export default App;
