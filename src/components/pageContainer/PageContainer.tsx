import {Box} from "@mui/material";
import React, { ReactNode} from "react";
import Background from "../../assets/bg10.avif";
import NavigationBar from "../navigationBar/NavigationBar";

interface Props  {
    children: ReactNode,
}
const styles = {
    container: {
        display: 'flex',
        width: '100%',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        flexFlow: 'column',
    },
    contentContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexFlow: 'column',
        paddingTop: '80px',
        width: '100%',
    },
};

function PageContainer({ children }: Props) {
    return (
        <Box sx={styles.container}>
            <NavigationBar/>
            <Box paddingTop={10} margin={0} sx={styles.contentContainer}>
            {children}
            </Box>
        </Box>
    )
}

export default PageContainer;
