import {createTheme} from "@mui/material/styles";

export default createTheme({
    palette: {
        secondary: {
            main: '#a5e8ef',
        },
        transparentWhite: {
            main: 'rgba(255, 255, 255, 0.7)',
        },
        transparentBlack: {
            main: 'rgba(0, 0, 0, 0.7)',
            light: 'rgba(0, 0, 0, 0.6)',
            dark: 'rgba(0, 0, 0, 0.8)',
        },
        border: {
            main: 'rgba(0, 0, 0, 0.2)',
        }
    },
});