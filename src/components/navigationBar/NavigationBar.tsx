import {Box, Breadcrumbs, Link, Typography, useMediaQuery} from "@mui/material";
import React from "react";

const styles={
    navigationContainer: {
        position: 'fixed',
        minHeight: '80px',
        width: '100%',
        top:0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 10,
        //border: '1px solid rgba(0, 0, 0, 0.8)',
        display: 'flex',
    },
    contentContainer: {
        display: 'flex',
        padding: '0 32px',
        width: '100%',
        alignItems: 'center',
    },
    navigationLink: {
        transition: '0.3s',
        padding: 1,
        color: 'rgba(0, 0, 0, 0.7)',
        ":hover": {
            textDecoration: 'none',
            color: 'rgba(0, 0, 0, 0.8)',
            padding: '16px',
            transition: '0.3s',
        }
    }
}

function NavigationBar() {
    const mobileView = useMediaQuery('(max-width: 767px)');

    const navigation =  <Breadcrumbs aria-label="breadcrumb" separator={'|'}>
        <Link sx={styles.navigationLink} href="/upload-file" underline={'none'}
        >
            UPLOAD NEW FILE
        </Link>
        <Link sx={styles.navigationLink} href="/" underline={'none'}>
            UPLOADED FILES
        </Link>
    </Breadcrumbs>

    return (
        <Box sx={styles.navigationContainer}>
            <Box sx={styles.contentContainer}>
                <Link color="inherit" href="/" underline={'none'}>
                    <Typography variant="h4" component="p" paddingRight={4} fontFamily={'"Dancing Script", cursive'} fontWeight={800} color={'rgba(0, 0, 0, 0.8)'}>
                        CompressYourFiles
                    </Typography>
                   {mobileView && navigation }   {/* TODO: add collapse for mobile view*/ }
                </Link>
                {!mobileView && navigation}
            </Box>

        </Box>
    );
}

export default NavigationBar;
