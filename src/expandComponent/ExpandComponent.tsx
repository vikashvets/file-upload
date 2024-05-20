import {Box, Collapse, IconButton} from "@mui/material";
import {ReactNode, useState} from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface Props  {
    children: ReactNode,
    beforeCollapseContent?: ReactNode
}

function ExpandComponent({ children, beforeCollapseContent }: Props) {
    const [open, setOpen] = useState(false);

    return (
            <Box sx={{display: 'flex', flexFlow: 'column', justifyContent: 'flex-end', width: '100%'}}>
                <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                    {beforeCollapseContent}
                <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
            >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
                </Box>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {children}
                </Collapse>
            </Box>)
}

export default ExpandComponent;
