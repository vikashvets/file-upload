import {Typography} from "@mui/material";
import React, { ReactNode} from "react";

interface Props  {
    children: ReactNode,
    color?: string
}

function InputSubtitle({ children, color }: Props) {
    return (
        <Typography variant="body2" component="p" align="left" paddingLeft={1} fontSize={13} color={color || 'transparentBlack.light'}>
            {children}
        </Typography>
    )
}

export default InputSubtitle;
