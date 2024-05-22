import {Route, Routes, BrowserRouter} from "react-router-dom";
import FileUploadHome from "./components/fileUploadHome/FileUploadHome"
import {Alert, Button, Snackbar} from "@mui/material";
import React, {useEffect, useState} from "react";
import configureWsClient from "./configureWsClient";
import {SnackbarConfig} from "./interfaces/SnackbarConfig";
import FileUploadForm from "./components/fileUploadForm/FileUploadForm";
import PageContainer from "./components/pageContainer/PageContainer";
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import muiTheme from "./utils/muiTheme";

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
            const content = <>
                {data}
                <Button
                    component={'label'}
                    onClick={() => { window.location.href = '/' } }
                    sx={{ padding: 0, color: 'common.white', textTransform: 'none', textDecoration: 'underline'}}>
                    Click to go to uploaded files
                </Button>
                </>
            setSnackbarOption({ snackbar: {open: true}, content, alert: {severity: 'success'} });
        })
    }, []);

    return (
      <>
              <ThemeProvider theme={muiTheme}>
              <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PageContainer><FileUploadHome setSnackbarOption={setSnackbarOption}/></PageContainer>} />
                    <Route path="/upload-file" element={<PageContainer><FileUploadForm setSnackbarOption={setSnackbarOption}/></PageContainer>} />
                </Routes>
              </BrowserRouter>
              <Snackbar
                  onClose={handleSnackbarClose}
                  autoHideDuration={5000}
                  {...snackbarOptions.snackbar}
              >
                  <Alert
                      onClose={handleSnackbarClose}
                      sx={{ width: '100%', maxWidth: '320px' }}
                      severity={'success'}
                      variant={'filled'}
                      {...snackbarOptions.alert}
                  >
                      {snackbarOptions.content}
                  </Alert>
              </Snackbar>
          </ThemeProvider>
      </>
  );
}

export default App;
