import {Box} from "@mui/material";
import React, { ReactNode} from "react";

interface Props  {
    children: ReactNode,
    color?: string
}

const styles={
    navigationContainer: {
        position: 'fixed',
        minHeight: '80px',
        width: '100%',
        top:0,
        backgroundColor: '#c6eff3',
        zIndex: 10,
        border: '2px solid'
    }
}

function NavigationBar() {
    return (
        <Box sx={styles.navigationContainer}>

        </Box>
    )
}

export default NavigationBar;
