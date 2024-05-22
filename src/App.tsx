import {Route, Routes, BrowserRouter} from "react-router-dom";
import FileUploadHome from "./components/fileUploadHome/FileUploadHome"
import {Alert, Button, Snackbar} from "@mui/material";
import React, {useEffect, useState} from "react";
import configureWsClient from "./configureWsClient";
import {SnackbarConfig} from "./interfaces/SnackbarConfig";
import FileUploadForm from "./components/fileUploadForm/FileUploadForm";
import PageContainer from "./components/pageContainer/PageContainer";
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        secondary: {
            main: '#a5e8ef',
        },
        // @ts-ignore
        custom: {
            transparentWhite: {
                main: 'rgba(255, 255, 255, 0.7)'
            },
            transparentBlack: {
                main: 'rgba(0, 0, 0, 0.7)',
                light: 'rgba(0, 0, 0, 0.6)',
                dark: 'rgba(0, 0, 0, 0.8)'
            },
            border: {
                main: 'rgba(0, 0, 0, 0.2)',
                // light: 'rgba(0, 0, 0, 0.1)',
                // dark: 'rgba(0, 0, 0, 0.3)'
            }
        }
    },
});


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
              <ThemeProvider theme={theme}>
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
