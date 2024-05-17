import {Box, Breadcrumbs, Link, Typography} from "@mui/material";
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
        ":hover": {
            textDecoration: 'none',
            color: 'rgba(0, 0, 0, 0.8)',
            padding: '16px',
            transition: '0.3s',
        }
    }
}

function NavigationBar() {
    return (
        <Box sx={styles.navigationContainer}>
            <Box sx={styles.contentContainer}>

                <Typography variant="h4" component="p" paddingRight={4} fontFamily={'"Dancing Script", cursive'} fontWeight={800} color={'rgba(0, 0, 0, 0.8)'}>
                    CompressYourFiles
                </Typography>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link sx={styles.navigationLink} color="inherit" href="/" padding={1} underline={'none'}>
                        UPLOADED FILES
                    </Link>
                    <Link
                        sx={styles.navigationLink}
                        color="text.primary"
                        href="/upload-file"
                        aria-current="page"
                        padding={1}
                        underline={'none'}
                    >
                       UPLOAD NEW FILE
                    </Link>
                </Breadcrumbs>
            </Box>

        </Box>
    );
}

export default NavigationBar;
