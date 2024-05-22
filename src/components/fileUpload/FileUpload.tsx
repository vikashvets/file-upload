import {Box, Button} from "@mui/material";
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
            <Box marginBottom={1} border={'1px solid'} borderRadius={1} borderColor={'custom.border.main'}>
                <Box padding={2} display={'flex'} alignItems={'center'}>
                    <InsertDriveFileIcon color={'disabled'}/>
                    <InputSubtitle color={'palette.common.black'}>
                        {file?.name || 'No file selected'}
                    </InputSubtitle>
                </Box>
            </Box>
            <InputSubtitle>
                Select file to compress. Currently system supports all image formats.
            </InputSubtitle>
            <Box display={'flex'} justifyContent={'flex-end'}>
            <Button component={'label'} sx={{marginTop: '4px', padding: 0, color: 'custom.transparentBlack.dark'}}>
                Select file
                <VisuallyHiddenInput type="file" name={'file'} onChange={onFileChange}/>
            </Button>
            </Box>
        </Box>
    )
}

export default FileUpload;
