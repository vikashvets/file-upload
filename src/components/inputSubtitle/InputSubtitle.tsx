import {Typography} from "@mui/material";
import React, { ReactNode} from "react";

interface Props  {
    children: ReactNode
}

function InputSubtitle({ children }: Props) {
    return (
        <Typography variant="body2" component="p" align="left" paddingLeft={1} fontSize={13} color={'rgba(0, 0, 0, 0.6)'}>
            {children}
        </Typography>
    )
}

export default InputSubtitle;
