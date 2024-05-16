import {Box, Button, Card} from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import React, {ChangeEvent} from "react";
import {styled} from "@mui/material/styles";
import InputSubtitle from "../inputSubtitle/InputSubtitle";

interface Props  {
    file: File | undefined,
    onFileChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function FileUpload({ file, onFileChange }: Props) {

    return (
        <Box>
            <Card>
                <Box padding={1.5} sx={{display: 'flex', alignItems: 'center'}}>
                    <InsertDriveFileIcon color={'disabled'}/>
                    <InputSubtitle>
                        {file?.name || 'No file selected'}
                    </InputSubtitle>
                </Box>
            </Card>
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button component={'label'} sx={{marginTop: '4px', padding: 0}}>
                Select file
                <VisuallyHiddenInput type="file" name={'file'} onChange={onFileChange}/>
            </Button>
            </Box>
        </Box>
    )
}

export default FileUpload;
